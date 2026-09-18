import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendBookingApprovedEmail,
  sendBookingPendingReviewEmail,
  sendOwnerNewBookingEmail,
  sendOwnerRequiresApprovalEmail,
} from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    const emailToUse = "saadalmikhlafi53@gmail.com";
    
    // Find or create customer
    let customer = await prisma.customer.findFirst({ where: { email: emailToUse } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: { firstName: "Saad", lastName: "Al-Mikhlafi", email: emailToUse, phone: "123456789" }
      });
    }

    const scenarios = [
      { name: "Test 1: Normal", dist: 5, amount: 200 },
      { name: "Test 2: Long Dist, Low Amt", dist: 35, amount: 400 },
      { name: "Test 3: Long Dist, High Amt", dist: 40, amount: 800 },
      { name: "Test 4: High Guests", dist: 10, amount: 600 },
      { name: "Test 5: Weekend", dist: 12, amount: 225 },
    ];

    let results = [];

    for (const sc of scenarios) {
      const bookingNumber = `TEST-${Math.floor(100000 + Math.random() * 900000)}`;
      
      let bookingStatus = "APPROVED";
      let pendingReason = "";
      if (sc.amount < 500 && sc.dist > 30) {
        bookingStatus = "PENDING";
        pendingReason = `Low value booking ($${sc.amount}) with long distance (${sc.dist} miles).`;
      }

      const booking = await prisma.booking.create({
        data: {
          bookingNumber,
          customerId: customer.id,
          status: bookingStatus,
          eventDate: new Date(),
          startTime: "12:00",
          durationMins: 60,
          address: "Test Street",
          city: "Boston",
          zip: "02151",
          guests: 50,
          eventType: sc.name,
          notes: "Test booking for emails",
          totalAmount: sc.amount,
        },
      });

      // Send to Customer
      if (bookingStatus === "APPROVED") {
        await sendBookingApprovedEmail(emailToUse, "Saad", bookingNumber, "", sc.amount.toString(), booking.id);
      } else {
        await sendBookingPendingReviewEmail(emailToUse, "Saad", bookingNumber, pendingReason, booking.id);
      }

      // Send to Owner
      const fullBooking = await prisma.booking.findUnique({
        where: { id: booking.id },
        include: { customer: true, package: true, quote: true, stops: true },
      });
      if (fullBooking) {
        if (bookingStatus === "PENDING") {
          await sendOwnerRequiresApprovalEmail(fullBooking);
        } else {
          await sendOwnerNewBookingEmail(fullBooking);
        }
      }

      results.push({ name: sc.name, status: bookingStatus, number: bookingNumber });
    }

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
