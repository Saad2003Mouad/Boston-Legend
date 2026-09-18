import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, hasPermission, unauthenticated, unauthorized } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser(req);
    if (!user) return unauthenticated();

    const canViewAll = hasPermission(user.role, "bookings.view");
    const canViewAssigned = hasPermission(user.role, "bookings.view.assignedOnly");

    if (!canViewAll && !canViewAssigned) {
      return unauthorized();
    }

    const booking = await prisma.booking.findUnique({
      where: { id: (await params).id },
      include: {
        customer: true,
        package: true,
        vehicle: true,
        quote: true,
        stops: { orderBy: { stopOrder: 'asc' } },
        assignment: { include: { vehicle: true, driver: { include: { user: true } } } }
      }
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    // If driver, check that they are actually assigned to this booking
    if (user.role === "DRIVER" || (!canViewAll && canViewAssigned)) {
      const isAssigned = booking.assignment?.driver?.userId === user.id;
      if (!isAssigned) {
        return unauthorized();
      }
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("Booking fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser(req);
    if (!user) return unauthenticated();

    if (!hasPermission(user.role, "bookings.update")) {
      return unauthorized();
    }

    const updates = await req.json();
    
    // Validate only allowed fields
    const allowedFields = [
      "eventDate", "startTime", "guests", "address", 
      "city", "zip", "notes", "durationMins"
    ];
    
    const dataToUpdate: any = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        if (field === "eventDate") {
          dataToUpdate[field] = new Date(updates[field]);
        } else if (field === "guests" || field === "durationMins") {
          dataToUpdate[field] = parseInt(updates[field], 10);
        } else {
          dataToUpdate[field] = updates[field];
        }
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ success: false, error: "No valid fields to update" }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: (await params).id },
      data: dataToUpdate
    });

    await prisma.auditLog.create({
      data: {
        entityType: "BOOKING",
        entityId: updatedBooking.id,
        bookingId: updatedBooking.id,
        action: "BOOKING_DETAILS_UPDATED",
        metadataJson: JSON.stringify(dataToUpdate),
        actorId: user.id
      }
    });

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update booking details" }, { status: 500 });
  }
}

