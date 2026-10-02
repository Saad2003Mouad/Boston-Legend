import { NextRequest } from "next/server";
import { BUSINESS_CONFIG } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// @ts-ignore
import zipcodes from "zipcodes";
import {
  sendBookingApprovedEmail,
  sendBookingPendingEmail,
  sendBookingPendingReviewEmail,
  sendOwnerNewBookingEmail,
  sendOwnerRequiresApprovalEmail,
} from "@/lib/email";
import { routingProvider, BASE_LOCATION } from "@/lib/maps";

declare global {
  var cachedPackages: any[] | undefined;
  var lastCacheTime: number | undefined;
}

async function calculateDistance(zip: string): Promise<number> {
  const lookup = zipcodes.lookup(zip);
  if (!lookup) throw new Error("Invalid ZIP code");

  try {
    const distanceMiles = await routingProvider.getDrivingDistanceMiles(
      BASE_LOCATION.lat, BASE_LOCATION.lng, lookup.latitude, lookup.longitude
    );
    return Math.round(distanceMiles * 10) / 10;
  } catch (e) {
    console.warn("Routing fallback", e);
    return Math.round(zipcodes.distance("02108", zip) * 10) / 10;
  }
}

const DISTANCE_TOOL = {
  type: "function" as const,
  function: {
    name: "calculateDistance",
    description: "Calculate the exact driving distance in miles from our garage to the event ZIP code. Use this to determine travel fees.",
    parameters: {
      type: "object",
      properties: {
        zip: { type: "string", description: "The 5-digit ZIP code of the event" }
      },
      required: ["zip"],
    },
  },
};

const BOOKING_TOOL = {
  type: "function" as const,
  function: {
    name: "createBookingRequest",
    description: "Create a new booking request when the customer has provided all required details AND they are logged in.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Customer's full name" },
        email: { type: "string", description: "Customer's email address" },
        phone: { type: "string", description: "Customer's phone number" },
        eventDate: { type: "string", description: "Event date in YYYY-MM-DD format" },
        startTime: { type: "string", description: "Event start time in 24-hour format, e.g. '14:00'" },
        eventType: { type: "string", description: "Type of event" },
        packageId: { type: "string", description: "Package ID from the list" },
        address: { type: "string", description: "Event street address" },
        city: { type: "string", description: "Event city" },
        zip: { type: "string", description: "Event ZIP code" },
        guests: { type: "number", description: "Estimated number of guests" },
      },
      required: ["name", "email", "phone", "eventDate", "startTime", "eventType", "packageId", "address", "city", "zip", "guests"],
    },
  },
};

async function handleBookingTool(args: any, sessionEmail: string): Promise<{ success: boolean; bookingNumber?: string; error?: string }> {
  try {
    const [firstName, ...lastNames] = args.name.split(" ");
    const lastName = lastNames.join(" ") || "Unknown";

    // Enforce matching email with session or at least valid formatting. Actually we just use sessionEmail to ensure security.
    const emailToUse = sessionEmail || args.email.toLowerCase();

    // Find or create customer
    let customer = await prisma.customer.findFirst({
      where: { email: emailToUse },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email: emailToUse,
          phone: args.phone || "",
          address: args.address || "",
          city: args.city || "",
          zip: args.zip || "",
        },
      });
    }

    const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

    // Check if packageId exists in DB
    let resolvedPackageId: string | null = null;
    let resolvedPackage: any = null;
    if (args.packageId && args.packageId !== "custom-event-package") {
      const pkg = await prisma.package.findFirst({
        where: { OR: [{ id: args.packageId }, { slug: args.packageId }] },
      });
      if (pkg) {
        resolvedPackageId = pkg.id;
        resolvedPackage = pkg;
      }
    }

    // Safely parse date and guests
    const dateStr = args.eventDate.includes('T') ? args.eventDate : `${args.eventDate}T00:00:00.000Z`;
    let parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) {
      // Fallback: If AI provided something unparseable, just use tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      parsedDate = tomorrow;
    }

    let parsedGuests = parseInt(args.guests);
    if (isNaN(parsedGuests)) parsedGuests = 50;

    // ─── Calculate distance and pricing ───
    let distanceMiles = 0;
    let travelFee = 0;
    const FREE_MILES = 10;
    const PER_MILE_RATE = 2.5;

    if (args.zip) {
      try {
        distanceMiles = await calculateDistance(args.zip);
        const billableMiles = Math.max(0, distanceMiles - FREE_MILES);
        travelFee = Math.round(billableMiles * PER_MILE_RATE * 100) / 100;
      } catch (e) {
        console.warn("Distance calculation failed for AI booking:", e);
      }
    }

    // Calculate base price from package
    const basePrice = resolvedPackage?.price || 0;
    const pkgServings = resolvedPackage?.servings || 50;
    const extraGuestPrice = resolvedPackage?.extraGuestPrice || resolvedPackage?.extraPiecePrice || 5;
    const extraGuests = Math.max(0, parsedGuests - pkgServings);
    const extraGuestsFee = extraGuests * extraGuestPrice;

    // Weekend surcharge
    const dayOfWeek = parsedDate.getDay();
    const weekendFee = (dayOfWeek === 0 || dayOfWeek === 6) ? 25 : 0;

    // Additional stops
    const additionalStopsCount = 0;
    const additionalStopsFee = 0;

    const totalAmount = basePrice + travelFee + extraGuestsFee + weekendFee + additionalStopsFee;

    // ─── AI Auto-Approval Logic ───
    // APPROVE unless totalAmount < $500 AND distance > 30 miles → then PENDING for human review
    let bookingStatus = "CONFIRMED";
    let pendingReason = "";
    if (totalAmount < 500 && distanceMiles > 30) {
      bookingStatus = "PENDING_REVIEW";
      pendingReason = `Low value booking ($${totalAmount.toFixed(2)}) with long distance (${distanceMiles.toFixed(1)} miles). Requires manual review.`;
    }

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer.id,
        packageId: resolvedPackageId,
        status: bookingStatus,
        eventDate: parsedDate,
        startTime: args.startTime || "12:00",
        durationMins: resolvedPackage?.durationMins || 60,
        address: args.address || "",
        city: args.city || "",
        zip: args.zip || "",
        guests: parsedGuests,
        eventType: args.eventType || "Event",
        notes: "Booked via AI Chat Assistant",
        totalAmount,
        additionalStops: additionalStopsCount,
        additionalStopsFee,
      },
    });

    // Create quote record for pricing snapshot
    if (totalAmount > 0) {
      try {
        await prisma.quote.create({
          data: {
            bookingId: booking.id,
            basePrice,
            distanceMiles,
            travelFee,
            overtimeFee: 0,
            totalAmount,
            snapshotJson: JSON.stringify({
              packagePrice: basePrice,
              distanceMiles,
              billableMiles: Math.max(0, distanceMiles - FREE_MILES),
              travelFee,
              includedGuests: pkgServings,
              additionalGuests: extraGuests,
              extraGuestPrice,
              additionalGuestsFee: extraGuestsFee,
              weekendFee,
              additionalStopsCount,
              additionalStopsFee,
              estimatedTotal: totalAmount,
            }),
          },
        });
      } catch (e) {
        console.warn("Failed to create quote record:", e);
      }
    }

    // ─── Send Emails ───
    const fullBooking = await prisma.booking.findUnique({
      where: { id: booking.id },
      include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: "asc" } } },
    });

    // Send to Customer
    if (bookingStatus === "CONFIRMED") {
      await sendBookingApprovedEmail(
        emailToUse,
        firstName,
        bookingNumber,
        "", // paymentUrl not applicable
        totalAmount.toFixed(2),
        booking.id
      ).catch(e => console.error("Failed to send approved email:", e));
    } else {
      await sendBookingPendingReviewEmail(
        emailToUse,
        firstName,
        bookingNumber,
        pendingReason,
        booking.id
      ).catch(e => console.error("Failed to send pending review email:", e));
    }

    // Send to Owner
    if (fullBooking) {
      if (bookingStatus === "PENDING_REVIEW") {
        await sendOwnerRequiresApprovalEmail(fullBooking).catch(e => console.error("Failed to send owner approval email:", e));
      } else {
        await sendOwnerNewBookingEmail(fullBooking).catch(e => console.error("Failed to send owner notification:", e));
      }
    }

    return { success: true, bookingNumber };
  } catch (error: any) {
    console.error("AI Booking Error:", error);
    return { success: false, error: error.message };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const session = await getServerSession(authOptions);
    
    let userState = "User Status: LOGGED OUT. The user is currently browsing as a guest.";
    
    if (session && session.user) {
      // Fetch full customer details to feed the AI
      const customer = await prisma.customer.findFirst({
        where: { email: session.user.email as string }
      });
      
      if (customer) {
        userState = `User Status: LOGGED IN.
User Profile (Use this information automatically, do NOT ask the user for it again):
- Name: ${customer.firstName} ${customer.lastName}
- Email: ${customer.email}
- Phone: ${customer.phone || 'Not provided'}
- Address: ${customer.address || 'Not provided'}
- City: ${customer.city || 'Not provided'}
- ZIP Code: ${customer.zip || 'Not provided'}
Role: ${(session.user as any).role}.`;
      } else {
        userState = `User Status: LOGGED IN. User Name: ${session.user.name}, Email: ${session.user.email}, Role: ${(session.user as any).role}. No detailed profile found.`;
      }
    }

    let activePackages: any[] = [];
    if (global.cachedPackages && global.lastCacheTime && Date.now() - global.lastCacheTime < 1000 * 60 * 60) {
      activePackages = global.cachedPackages;
    } else {
      try {
        activePackages = await prisma.package.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        });
        global.cachedPackages = activePackages;
        global.lastCacheTime = Date.now();
      } catch (e) {
        console.warn("Failed to fetch packages from DB for chat, using fallback empty array.");
      }
    }

    const packagesList = activePackages.map((pkg: any, index: number) => 
      `${index + 1}. **${pkg.name}** (ID: ${pkg.slug || pkg.id}) — $${pkg.price}. Up to ${pkg.servings} guests, ${pkg.durationMins} min service. ${pkg.description || ""}`
    ).join("\n");

    const SYSTEM_PROMPT = `You are the American Legend Ice Cream Truck AI Concierge — a helpful, warm, and professional assistant for ${BUSINESS_CONFIG.name}.

Your role is to help customers learn about our services, packages, and pricing, and to guide them toward booking an ice cream truck.

${userState}

## About Us
- Company: ${BUSINESS_CONFIG.name}
- Tagline: "${BUSINESS_CONFIG.tagline}"
- Location: ${BUSINESS_CONFIG.address.display}
- Contact: ${BUSINESS_CONFIG.contact.phone1}

## Our Packages (use these exact IDs when booking)
${packagesList}

## Complex Pricing Rules
- **Base Price**: From the package selected above.
- **Multiple Stops / Routine**: Sequential stops add $50 fee per extra stop. Simultaneous operations at multiple locations add $200.
- **Multiple Trucks**: If they request multiple vehicles (e.g. 2 trucks) or have >150 guests requiring multiple vehicles, add a $200 setup/dispatch fee per extra vehicle.
- **Travel Fee**: $2.00 per mile based on actual driving distance from our Boston dispatch location (ZIP 02108). There are no free miles — the fee applies from mile 1. You MUST use the calculateDistance tool to get the exact distance using their ZIP code.
- **Weekend Surcharge**: Events on Saturday or Sunday add $25.
- **Extra Service Time**: $35 per additional 30-minute block beyond the included time.
- **Extra Guests**: Each extra guest beyond the package limit is $5.

## Booking via Chat - CRITICAL RULES
1. If the User Status is LOGGED OUT: You CANNOT book for them. You must tell them: "To proceed with booking, please Sign In or Create an Account using the button at the top of the page." Do NOT call the createBookingRequest tool if they are logged out.
2. If the user is LOGGED IN and a User Profile is provided above, automatically use their Profile data (Name, Email, Phone, Address, City, ZIP) for the booking. Do NOT ask them to type it out if it is already provided.
3. NEVER call createBookingRequest unless you have ALL of the following information (either from their Profile or asked directly):
   - Their real full name, email, and phone number
   - A future event date (NOT a past date, NOT a placeholder like 2024-01-01)
   - A specific start time
   - Their event type
   - Which package they want (from the list above)
   - Their real event address, city, and ZIP code
   - Estimated number of guests
4. Do NOT assume or guess details not provided by the user or their profile. If any required detail is completely missing, ASK for it first.
5. Do NOT call createBookingRequest in response to greetings like "hello", "hi", "هلا", "مرحبا" or any message that does not contain booking details.
6. Only after collecting ALL details: summarize the booking (using their profile info where applicable), ask for their final confirmation, and THEN call the tool.

## Tone & Style
- **Personality**: You are extremely fun, cute, and lovable! You radiate joy, sweetness, and excitement because you love ice cream and parties!
- **Marketing & Persuasion Expert**: You are a master at sales and promotion. Use persuasive, enticing language to highlight the value of our packages. Create a sense of excitement and urgency, gently encouraging the customer to book without being aggressively pushy.
- **Engagement**: Use emojis naturally (🍦, 🎉, ✨, 🚚, 😋) to keep the conversation sweet and lively.
- **Concise & Direct**: Keep responses relatively concise but full of life. Don't write huge walls of text.
- **Language Matching**: Always match the user's language. If they speak Arabic, reply in friendly, welcoming, and persuasive Arabic (e.g. "أهلاً بك يا غالي! 🍦 حفلكم سيكون أسطورياً معنا...").
- **Vibe**: Be professional but highly approachable, like a lovable friend who also happens to be a great salesperson. Never sound like a rigid robot.`;

    let apiUrl = "";
    let apiKey = "";
    let apiModel = "";

    if (process.env.GOOGLE_AI_KEY) {
      apiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
      apiKey = process.env.GOOGLE_AI_KEY;
      apiModel = "gemini-1.5-flash";
    } else if (process.env.GROQ_API_KEY) {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      apiKey = process.env.GROQ_API_KEY;
      apiModel = "openai/gpt-oss-20b";
    } else if (process.env.OPENROUTER_API_KEY) {
      apiUrl = "https://openrouter.ai/api/v1/chat/completions";
      apiKey = process.env.OPENROUTER_API_KEY;
      apiModel = "openai/gpt-4o";
    } else if (process.env.OPENAI_API_KEY) {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      apiKey = process.env.OPENAI_API_KEY;
      apiModel = "gpt-4o-mini";
    } else {
      return new Response("No AI provider configured", { status: 503 });
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    let chatMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...messages];

    // Build request body
    const requestBody: any = {
      model: apiModel,
      messages: chatMessages,
      temperature: 0.5,
      max_tokens: 1000,
      tools: (session && session.user) ? [BOOKING_TOOL, DISTANCE_TOOL] : [DISTANCE_TOOL],
      tool_choice: "auto",
    };

    const aiRes = await fetch(apiUrl, { method: "POST", headers, body: JSON.stringify(requestBody) });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("AI API ERROR:", errText, "Status:", aiRes.status);
      return Response.json({ text: `Sorry, I am having trouble responding right now. Error ${aiRes.status}: ${errText.substring(0, 200)}` });
    }

    const data = await aiRes.json();
    const choice = data.choices?.[0];
    let message = choice?.message;

    if (!message) {
      return Response.json({ text: "I'm sorry, I couldn't generate a response. Please try again!" });
    }

    // Handle Tools Loop (1 depth max for distance)
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      
      // Handle Distance Calculation Tool
      if (toolCall.function?.name === "calculateDistance") {
        let zip = "";
        try {
          zip = JSON.parse(toolCall.function.arguments).zip;
        } catch { /* ignore */ }

        let distanceMiles = 0;
        if (zip) {
          try {
            distanceMiles = await calculateDistance(zip);
          } catch (e) { console.error("Distance tool error", e); }
        }

        chatMessages.push(message);
        chatMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: toolCall.function.name,
          content: JSON.stringify({ distanceMiles, freeMiles: 10, additionalMileCost: 2.50 })
        });

        // Call AI again with the distance result
        const aiRes2 = await fetch(apiUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({
            model: apiModel,
            messages: chatMessages,
            temperature: 0.5,
            tools: (session && session.user) ? [BOOKING_TOOL] : undefined, // Only booking tool allowed on second pass if logged in
          }),
        });

        const data2 = await aiRes2.json();
        message = data2.choices?.[0]?.message;
      }

      // Handle Booking Tool
      if (message?.tool_calls && message.tool_calls[0].function?.name === "createBookingRequest") {
        const finalToolCall = message.tool_calls[0];
        let args;
        try {
          args = JSON.parse(finalToolCall.function.arguments);
        } catch {
          return Response.json({ text: "I had trouble processing the booking details. Could you please repeat them?" });
        }

        if (!session || !session.user) {
          return Response.json({ text: "لإتمام الحجز، الرجاء تسجيل الدخول أو إنشاء حساب جديد من الزر أعلى الصفحة. To proceed with booking, please Sign In or Create an Account using the button at the top of the page." });
        }

        // ─── Server-side validation: reject hallucinated/placeholder data ───
        const fakeName = !args.name || args.name.toLowerCase().includes("john doe") || args.name.toLowerCase() === "unknown" || args.name.length < 3;
        const fakeDate = !args.eventDate || new Date(args.eventDate) < new Date();
        const fakeZip = !args.zip || args.zip.length < 5;
        const fakePhone = !args.phone || args.phone.length < 7;
        const fakePkg = !args.packageId;

        if (fakeName || fakeDate || fakeZip || fakePhone || fakePkg) {
          console.warn("[Chat] Rejected hallucinated booking args:", args);
          return Response.json({ text: "I need a few more details before I can create your booking. Could you please share your full name, event date, address (with ZIP code), phone number, and which package you'd like?" });
        }

        return Response.json({
          text: message.content || "Great! I've gathered all your booking details. Please review the summary below and confirm to complete your reservation! 🍦",
          bookingRequest: args,
          toolCallId: finalToolCall.id,
        });
      }
    }

    // Regular text response
    const reply = message?.content || "I'm here to help! Could you tell me more about what you're looking for?";
    return Response.json({ text: reply });
  } catch (error: any) {
    console.error("Chat API Internal Error:", error);
    return new Response(error.message || "An error occurred processing your request.", { status: 500 });
  }
}

// Endpoint for confirming a booking from the chat
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return Response.json({ error: "You must be logged in to confirm a booking." }, { status: 401 });
    }

    const { bookingData } = await req.json();
    
    if (!bookingData || !bookingData.name || !bookingData.email) {
      return Response.json({ error: "Missing booking data" }, { status: 400 });
    }

    const result = await handleBookingTool(bookingData, session.user.email);
    
    if (result.success) {
      return Response.json({ 
        success: true, 
        bookingNumber: result.bookingNumber,
        message: `Booking #${result.bookingNumber} has been created! Our team will review it and get back to you shortly.`
      });
    } else {
      return Response.json({ error: result.error || "Failed to create booking" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Booking Confirmation Error:", error);
    return Response.json({ error: "Failed to process booking confirmation" }, { status: 500 });
  }
}
