import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendGoogleReviewRequestEmail } from "@/lib/email";
import { getSessionUser, hasPermission, unauthenticated, unauthorized } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser(req);
    if (!user) return unauthenticated();

    if (!hasPermission(user.role, "bookings.update")) {
      return unauthorized();
    }

    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        customer: true,
        package: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    if (!booking.customer?.email) {
      return NextResponse.json({ success: false, error: "Customer has no email address" }, { status: 400 });
    }

    // Send the review email
    const sent = await sendGoogleReviewRequestEmail({
      id: booking.id,
      bookingNumber: booking.bookingNumber,
      eventDate: booking.eventDate,
      eventType: booking.eventType,
      customer: {
        firstName: booking.customer.firstName,
        lastName: booking.customer.lastName,
        email: booking.customer.email,
      },
      package: booking.package ? { name: booking.package.name } : null,
    });

    if (!sent) {
      return NextResponse.json({
        success: false,
        error: "Failed to send review email. Please check SMTP settings.",
      }, { status: 500 });
    }

    // Log the action in AuditLog
    await prisma.auditLog.create({
      data: {
        entityType: "BOOKING",
        entityId: booking.id,
        bookingId: booking.id,
        action: "REVIEW_REQUEST_SENT_MANUALLY",
        metadataJson: JSON.stringify({
          sentAt: new Date().toISOString(),
          customerEmail: booking.customer.email,
          triggeredBy: user.email,
        }),
        actorId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Review request email successfully sent to ${booking.customer.email}`,
    });
  } catch (error: any) {
    console.error("Error sending review request email:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}
