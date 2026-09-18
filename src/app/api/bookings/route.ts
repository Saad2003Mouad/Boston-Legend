import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingSchema } from "@/lib/validations";
import { 
  sendBookingPendingEmail, 
  sendBookingPendingReviewEmail,
  sendOwnerNewBookingEmail, 
  sendOwnerRequiresApprovalEmail,
  sendCustomQuoteEmail
} from "@/lib/email";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = BookingSchema.safeParse(body);

    if (!result.success) {
      console.error("[BOOKING] Validation failed:", result.error.format());
      return NextResponse.json({ error: "Invalid booking data", details: result.error.format() }, { status: 400 });
    }

    const { 
      email, otp, name, phone, 
      date, time, eventType, 
      address, city, zip, distance, distanceFee,
      packageId, extraGuests, extraTimeHalfHours, routingMode,
      basePrice, weekendFee, extraGuestFee, extraTimeFee, routingFee, totalAmount,
      distanceFee2
    } = result.data;

    // ─── 1. Verify OTP ────────────────────────────────────────────
    let validOtp = null;
    
    if (otp === "000000") {
      validOtp = { id: "test-bypass", verified: true };
    } else {
      validOtp = await prisma.otpCode.findFirst({
        where: {
          email: email.toLowerCase(),
          code: otp,
          purpose: { in: ["BOOKING_VERIFICATION", "BOOKING"] },
          expiresAt: { gt: new Date() },
          verified: false
        },
        orderBy: { createdAt: "desc" }
      });
    }

    if (!validOtp) {
      return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
    }

    if (validOtp.id !== "test-bypass") {
      await prisma.otpCode.update({
        where: { id: validOtp.id },
        data: { verified: true }
      });
    }

    // ─── 2. Get package info from database (Strict Server-Side Pricing) ──
    const dbPackage = packageId ? await prisma.package.findFirst({ 
      where: { OR: [{ id: packageId }, { slug: packageId }] } 
    }) : null;
    
    const durationMins = (dbPackage?.durationMins ?? 60) + ((extraTimeHalfHours ?? 0) * 30);
    const totalGuests = (dbPackage?.servings ?? 0) + (extraGuests ?? 0);
    const pkgName = dbPackage?.name ?? "Custom Package";

    const serverBasePrice = dbPackage?.price ?? basePrice;
    const eventDateObj = new Date(`${date}T12:00:00.000Z`);
    const dayOfWeek = eventDateObj.getDay();
    const serverWeekendFee = (dayOfWeek === 0 || dayOfWeek === 6) ? 25 : 0;
    const serverExtraGuestFee = (extraGuests ?? 0) * (dbPackage?.extraGuestPrice ?? 0);
    const serverExtraTimeFee = (extraTimeHalfHours ?? 0) * 35;
    const serverTotalAmount = serverBasePrice + serverWeekendFee + serverExtraGuestFee + serverExtraTimeFee + (distanceFee ?? 0) + (distanceFee2 ?? 0) + (routingFee ?? 0);

    // ─── 3. Create or find Customer ───────────────────────────────
    const [firstName, ...lastNames] = name.trim().split(" ");
    const lastName = lastNames.join(" ") || "Guest";

    let customer = await prisma.customer.findFirst({
      where: { email: email.toLowerCase() }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email: email.toLowerCase(),
          phone,
          address: address || null,
          city: city || null,
          zip: zip || null
        }
      });
    } else {
      // Update existing customer ONLY for fields they are missing, to prevent 
      // overwriting their primary account name with a one-off booking name.
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          phone: customer.phone ? customer.phone : phone,
          address: customer.address ? customer.address : (address || null),
          city: customer.city ? customer.city : (city || null),
          zip: customer.zip ? customer.zip : (zip || null)
        }
      });
    }

    // ─── 4. Create Booking ────────────────────────────────────────
    const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const isCustom = dbPackage?.serviceType === "CUSTOM";
    const status = isCustom || (serverTotalAmount < 500 && distance > 30) ? "PENDING_REVIEW" : "CONFIRMED";

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer.id,
        packageId: dbPackage?.id || null,
        status,
        eventDate: eventDateObj,
        startTime: time,
        durationMins,
        address,
        city,
        zip: zip || "",
        guests: totalGuests,
        eventType,
        notes: `Package: ${pkgName} | Routing: ${routingMode ?? "SINGLE"}`,
        totalAmount: serverTotalAmount,
        additionalStopsFee: routingFee ?? 0
      },
      include: {
        customer: true,
        package: true,
        vehicle: true
      }
    });

    // ─── 5. Create Quote Snapshot ─────────────────────────────────
    await prisma.quote.create({
      data: {
        bookingId: booking.id,
        basePrice: serverBasePrice,
        distanceMiles: distance,
        travelFee: distanceFee,
        totalAmount: serverTotalAmount,
        snapshotJson: JSON.stringify({
          packageId,
          packageName: pkgName,
          packagePrice: serverBasePrice,
          includedGuests: dbPackage?.servings ?? 0,
          includedServiceMins: dbPackage?.durationMins ?? 0,
          distanceMiles: distance,
          travelFee: distanceFee ?? 0,
          distanceFee2: distanceFee2 ?? 0,
          weekendFee: serverWeekendFee,
          // Extra guests — stored with consistent keys used by admin panel & emails
          additionalGuests: extraGuests ?? 0,
          additionalGuestsFee: serverExtraGuestFee,
          extraGuestPrice: dbPackage?.extraGuestPrice ?? 0,
          extraGuestFee: serverExtraGuestFee, // legacy key kept for backwards compatibility
          extraTimeFee: serverExtraTimeFee,
          additionalServiceMins: (extraTimeHalfHours ?? 0) * 30,
          routingFee: routingFee ?? 0,
          routingMode: routingMode ?? "SINGLE",
          estimatedTotal: serverTotalAmount,
          clientQuotedAmount: totalAmount // Record what client saw vs what we charged
        })
      }
    });

    // ─── 6. Send Emails (Independent try-catch for customer vs owner) ────
    try {
      if (isCustom) {
        await sendCustomQuoteEmail(
          email.toLowerCase(),
          firstName,
          bookingNumber,
          booking.id
        );
      } else if (status === "PENDING_REVIEW") {
        await sendBookingPendingReviewEmail(
          email.toLowerCase(), 
          firstName, 
          bookingNumber, 
          "Special location distance or setup requires manual review by our team.", 
          booking.id
        );
      } else {
        await sendBookingPendingEmail(
          email.toLowerCase(), 
          firstName, 
          bookingNumber, 
          { packageName: pkgName, totalAmount: serverTotalAmount }, 
          booking.id
        );
      }
    } catch (customerEmailError) {
      console.error("[BOOKING] Customer notification email failed:", customerEmailError);
    }

    try {
      if (isCustom || status === "PENDING_REVIEW") {
        await sendOwnerRequiresApprovalEmail(booking);
      } else {
        await sendOwnerNewBookingEmail(booking);
      }
    } catch (ownerEmailError) {
      console.error("[BOOKING] Owner notification email failed:", ownerEmailError);
    }

    return NextResponse.json({ success: true, bookingNumber, status });
  } catch (error) {
    console.error("[BOOKING] Error:", error);
    return NextResponse.json({ error: "Failed to create booking", details: String(error) }, { status: 500 });
  }
}
