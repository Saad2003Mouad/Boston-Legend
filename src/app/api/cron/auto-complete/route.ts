import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Optional: Add a simple secret check to prevent abuse if called publicly
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Auto-complete: Any CONFIRMED booking where eventDate + duration has passed
    const confirmedBookings = await prisma.booking.findMany({
      where: { status: "CONFIRMED" },
      select: { id: true, eventDate: true, durationMins: true, bookingNumber: true }
    });

    const now = new Date();
    let completedCount = 0;

    for (const b of confirmedBookings) {
      const eventEndTime = new Date(b.eventDate.getTime() + (b.durationMins || 60) * 60 * 1000);
      if (eventEndTime < now) {
        // Mark as COMPLETED
        await prisma.booking.update({
          where: { id: b.id },
          data: { status: "COMPLETED" }
        });

        // Audit log
        await prisma.auditLog.create({
          data: {
            entityType: "BOOKING",
            entityId: b.id,
            bookingId: b.id,
            action: "AUTO_COMPLETED",
            metadataJson: JSON.stringify({ eventEndTime: eventEndTime.toISOString(), trigger: "CRON" })
          }
        });
        
        console.log(`[Auto-Complete] Booking ${b.bookingNumber} marked as COMPLETED.`);
        completedCount++;
      }
    }

    return NextResponse.json({ success: true, processed: completedCount });
  } catch (error) {
    console.error("Auto-complete cron error:", error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}
