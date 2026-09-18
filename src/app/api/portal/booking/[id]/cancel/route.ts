import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

import { sendPushNotification } from "@/lib/services/pushNotify";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const booking = await prisma.booking.findUnique({ 
    where: { id },
    include: { customer: true }
  });

  if (!booking) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  // Ensure customer owns this booking
  if (booking.customerId !== (session.user as any).id) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Allow cancellation for PENDING, PENDING_REVIEW, PENDING_PAYMENT, CONFIRMED
  const allowedStatuses = ["PENDING", "PENDING_REVIEW", "PENDING_PAYMENT", "CONFIRMED"];
  if (!allowedStatuses.includes(booking.status)) {
    return Response.json({ error: "This booking cannot be cancelled." }, { status: 400 });
  }

  // Check 48 hour rule
  const now = new Date();
  const eventTime = new Date(booking.eventDate.getTime());
  const hoursUntilEvent = (eventTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilEvent < 48) {
    return Response.json({ error: "Bookings cannot be cancelled less than 48 hours before the event." }, { status: 400 });
  }

  await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  
  await prisma.auditLog.create({
    data: {
      entityType: "BOOKING",
      entityId: id,
      bookingId: id,
      action: "CANCELLED_BY_CUSTOMER",
      metadataJson: JSON.stringify({ reason: "Customer initiated cancellation" }),
      actorId: (session.user as any).id
    }
  });

  // Notify admins
  await sendPushNotification({
    title: `Booking Cancelled by Customer`,
    body: `Booking #${booking.bookingNumber} was cancelled by ${booking.customer.firstName}.`,
    url: `/admin/bookings/${booking.id}`
  });

  return Response.json({ success: true });
}
