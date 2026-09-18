import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendPushNotification } from "@/lib/services/pushNotify";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const updates = await req.json();

    const booking = await prisma.booking.findUnique({ 
      where: { id },
      include: { customer: true }
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.customerId !== (session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Allow editing for PENDING, PENDING_REVIEW, PENDING_PAYMENT, CONFIRMED
    const allowedStatuses = ["PENDING", "PENDING_REVIEW", "PENDING_PAYMENT", "CONFIRMED"];
    if (!allowedStatuses.includes(booking.status)) {
      return NextResponse.json({ error: "This booking cannot be edited at this stage." }, { status: 400 });
    }

    // Check 48 hour rule
    const now = new Date();
    const eventTime = new Date(booking.eventDate.getTime());
    const hoursUntilEvent = (eventTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilEvent < 48) {
      return NextResponse.json({ error: "Bookings cannot be edited less than 48 hours before the event." }, { status: 400 });
    }

    // Allowed fields for customer edit
    const allowedFields = ["eventDate", "startTime", "notes"];
    const dataToUpdate: any = {};
    
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        if (field === "eventDate") {
          dataToUpdate[field] = new Date(updates[field]);
        } else {
          dataToUpdate[field] = updates[field];
        }
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ success: false, error: "No valid fields to update" }, { status: 400 });
    }

    // Recalculate price if date changed to/from weekend?
    // Not explicitly required to calculate in backend now, but could flag for review
    if (dataToUpdate.eventDate && new Date(dataToUpdate.eventDate).getDay() !== booking.eventDate.getDay()) {
      dataToUpdate.status = "PENDING_REVIEW"; // Re-evaluate pricing by admin
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: dataToUpdate
    });

    await prisma.auditLog.create({
      data: {
        entityType: "BOOKING",
        entityId: id,
        bookingId: id,
        action: "EDITED_BY_CUSTOMER",
        metadataJson: JSON.stringify(dataToUpdate),
        actorId: (session.user as any).id
      }
    });

    // Notify admins
    await sendPushNotification({
      title: `Booking Edited by Customer`,
      body: `${booking.customer.firstName} updated their booking #${booking.bookingNumber}.`,
      url: `/admin/bookings/${booking.id}`
    });

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error("Booking edit error:", error);
    return NextResponse.json({ success: false, error: "Failed to update booking details" }, { status: 500 });
  }
}
