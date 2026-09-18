import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPushNotification } from "@/lib/services/pushNotify";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    // 24 hours from now
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    // Find bookings that are starting between now and 24 hours from now
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        eventDate: {
          gte: now,
          lte: tomorrow
        }
      },
      include: {
        customer: true,
        assignment: { include: { driver: { include: { user: true } } } }
      }
    });

    let reminderCount = 0;

    for (const b of upcomingBookings) {
      // Check if we already sent a reminder (we can use audit log to prevent duplicate reminders)
      const hasReminder = await prisma.auditLog.findFirst({
        where: { bookingId: b.id, action: "REMINDER_24H_SENT" }
      });

      if (!hasReminder) {
        // Send Push to Admin
        await sendPushNotification({
          title: `Upcoming Event: #${b.bookingNumber}`,
          body: `Event for ${b.customer.firstName} is in less than 24 hours.`,
          url: `/admin/bookings/${b.id}`
        }, ["OWNER", "ADMIN"]);

        // If driver assigned, send to driver too
        if (b.assignment?.driver?.user) {
          await sendPushNotification({
            title: `Your next gig: #${b.bookingNumber}`,
            body: `You are assigned to an event in less than 24 hours at ${b.city}.`,
            url: `/admin/bookings/${b.id}`
          }, [], [b.assignment.driver.user.id]);
        }

        await prisma.auditLog.create({
          data: {
            entityType: "BOOKING",
            entityId: b.id,
            bookingId: b.id,
            action: "REMINDER_24H_SENT",
            metadataJson: JSON.stringify({ sentAt: new Date().toISOString() })
          }
        });

        reminderCount++;
      }
    }

    return NextResponse.json({ success: true, processed: reminderCount });
  } catch (error) {
    console.error("Reminder cron error:", error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}
