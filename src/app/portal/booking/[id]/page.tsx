import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  Package,
  ArrowLeft,
  Phone,
  Mail,
  Truck,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Timer,
} from "lucide-react";
import CancelBookingButton from "./CancelBookingButton";
import EditBookingButton from "./EditBookingButton";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return { title: "Booking Details | American Legend Ice Cream Truck" };
}

export const dynamic = "force-dynamic";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || (session.user as any).role !== "CUSTOMER") {
    // Wait for params to resolve
    const { id } = await params;
    redirect(`/login?callbackUrl=/portal/booking/${id}`);
  }

  const { id } = await params;

  let booking: any = null;
  try {
    booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        package: true,
        quote: true,
        customer: true,
        stops: { orderBy: { stopOrder: "asc" } },
      },
    });
  } catch (error) {
    console.error("[PORTAL_BOOKING] Error fetching booking:", error);
  }

  if (!booking || booking.customerId !== (session.user as any).id) {
    notFound();
  }

  const isPast = new Date(booking.eventDate) < new Date();
  
  // Allow cancellation for PENDING, PENDING_REVIEW, PENDING_PAYMENT, CONFIRMED
  const allowedStatuses = ["PENDING", "PENDING_REVIEW", "PENDING_PAYMENT", "CONFIRMED"];
  const now = new Date();
  const eventTime = new Date(booking.eventDate.getTime());
  const hoursUntilEvent = (eventTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  const canEditOrCancel = allowedStatuses.includes(booking.status) && !isPast && hoursUntilEvent >= 48;

  // Parse quote snapshot for full pricing
  let breakdown: any = {};
  try {
    if (booking.quote?.snapshotJson) {
      breakdown = JSON.parse(booking.quote.snapshotJson);
    }
  } catch {}

  const pkg = booking.package;
  const basePrice = breakdown.packagePrice ?? booking.quote?.basePrice ?? 0;
  const distanceMiles = breakdown.distanceMiles ?? booking.quote?.distanceMiles ?? 0;
  const travelFee = breakdown.travelFee ?? booking.quote?.travelFee ?? 0;
  const extraGuestsFee = breakdown.extraGuestFee ?? 0;
  const extraTimeFee = breakdown.extraTimeFee ?? 0;
  const additionalStopsFee = breakdown.routingFee ?? booking.additionalStopsFee ?? 0;
  const weekendFee = breakdown.weekendFee ?? 0;
  const totalAmount = booking.totalAmount;

  const statusConfig: Record<string, { label: string; bg: string; text: string; icon: any; description: string }> = {
    APPROVED: {
      label: "Approved",
      bg: "bg-green-50 border-green-200",
      text: "text-green-700",
      icon: CheckCircle2,
      description: "Your booking has been confirmed! We're excited to serve at your event.",
    },
    PENDING: {
      label: "Pending Review",
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-700",
      icon: Timer,
      description: "Your booking is under review. We'll notify you once it's confirmed.",
    },
    REJECTED: {
      label: "Update Needed",
      bg: "bg-red-50 border-red-200",
      text: "text-red-700",
      icon: XCircle,
      description: "Your booking needs an adjustment. Please contact us for details.",
    },
    CANCELLED: {
      label: "Cancelled",
      bg: "bg-gray-100 border-gray-200",
      text: "text-gray-500",
      icon: AlertCircle,
      description: "This booking has been cancelled.",
    },
  };
  const sc = statusConfig[booking.status] || statusConfig.PENDING;
  const StatusIcon = sc.icon;

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/portal"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-navy transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to My Portal
        </Link>

        {/* Status Banner */}
        <div className={`rounded-2xl border p-5 md:p-6 mb-6 ${sc.bg}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${sc.text} bg-white/60`}>
              <StatusIcon size={24} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h2 className={`text-lg font-black ${sc.text}`}>{sc.label}</h2>
                <span className="px-2.5 py-1 bg-white/60 rounded-lg text-xs font-mono font-bold text-gray-500">
                  #{booking.bookingNumber}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">{sc.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Event Details (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            {/* Event Info Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-lg shadow-navy/5">
              <h3 className="text-lg font-black text-navy mb-5 flex items-center gap-2">
                <CalendarDays className="text-coral" size={20} />
                Event Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Event Type</p>
                  <p className="text-navy font-bold text-base">{booking.eventType}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Package</p>
                  <p className="text-navy font-bold text-base">{pkg?.name || "Custom Package"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-navy font-bold text-base">
                    {new Date(booking.eventDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</p>
                  <p className="text-navy font-bold text-base">{booking.startTime}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-navy font-bold text-base">{booking.durationMins} minutes</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Guests</p>
                  <p className="text-navy font-bold text-base">{booking.guests} guests</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-lg shadow-navy/5">
              <h3 className="text-lg font-black text-navy mb-5 flex items-center gap-2">
                <MapPin className="text-coral" size={20} />
                Location
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Event Address</p>
                  <p className="text-navy font-bold">
                    {booking.address || "—"}, {booking.city} {booking.zip}
                  </p>
                </div>
                {distanceMiles > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Truck size={15} className="text-gray-400" />
                    <span>{distanceMiles.toFixed(1)} miles from our garage</span>
                  </div>
                )}

                {booking.stops && booking.stops.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Additional Stops</p>
                    <div className="space-y-2">
                      {booking.stops.map((stop: any, i: number) => (
                        <div key={stop.id} className="flex items-start gap-2 text-sm">
                          <span className="w-5 h-5 bg-coral/10 text-coral rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-gray-600 font-medium">
                            {stop.street}, {stop.city} {stop.state} {stop.zipCode}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {booking.notes && (
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-lg shadow-navy/5">
                <h3 className="text-lg font-black text-navy mb-3">Notes</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Right: Pricing & Actions (1 col) */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-lg shadow-navy/5">
              <h3 className="text-lg font-black text-navy mb-5 flex items-center gap-2">
                <DollarSign className="text-coral" size={20} />
                Pricing
              </h3>

              {totalAmount > 0 ? (
                <div className="space-y-3">
                  {basePrice > 0 && (
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Base Package</span>
                      <span className="text-navy font-bold">${basePrice.toFixed(2)}</span>
                    </div>
                  )}
                  {travelFee > 0 && (
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Travel Fee</span>
                      <span className="text-navy font-bold">+${travelFee.toFixed(2)}</span>
                    </div>
                  )}
                  {extraGuestsFee > 0 && (
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Extra Guests</span>
                      <span className="text-navy font-bold">+${extraGuestsFee.toFixed(2)}</span>
                    </div>
                  )}
                  {extraTimeFee > 0 && (
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Extra Time</span>
                      <span className="text-navy font-bold">+${extraTimeFee.toFixed(2)}</span>
                    </div>
                  )}
                  {additionalStopsFee > 0 && (
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Additional Stops</span>
                      <span className="text-navy font-bold">+${additionalStopsFee.toFixed(2)}</span>
                    </div>
                  )}
                  {weekendFee > 0 && (
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Weekend Surcharge</span>
                      <span className="text-navy font-bold">+${weekendFee.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="pt-4 mt-4 border-t-2 border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black text-navy">Total</span>
                      <span className="text-2xl font-black text-coral">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-yellow-500" size={22} />
                  </div>
                  <p className="text-sm font-bold text-navy mb-1">Pricing Pending</p>
                  <p className="text-xs text-gray-400 font-medium">Our team will calculate your total soon.</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-lg shadow-navy/5">
              <h3 className="text-sm font-black text-navy mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <Mail size={15} className="text-gray-400" />
                  <span>{booking.customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <Phone size={15} className="text-gray-400" />
                  <span>{booking.customer.phone || "Not provided"}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {canEditOrCancel && (
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/80 shadow-lg shadow-navy/5">
                <h3 className="text-sm font-black text-navy mb-4">Actions</h3>
                <div className="space-y-3">
                  <EditBookingButton bookingId={booking.id} initialData={{
                    eventDate: booking.eventDate ? new Date(booking.eventDate).toISOString().split('T')[0] : "",
                    startTime: booking.startTime,
                    notes: booking.notes
                  }} />
                  <CancelBookingButton bookingId={booking.id} />
                </div>
              </div>
            )}

            {/* Booked at */}
            <div className="text-center">
              <p className="text-xs text-gray-400 font-medium">
                Booked on {new Date(booking.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
