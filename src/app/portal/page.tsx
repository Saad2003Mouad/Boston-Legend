import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CalendarDays, ChevronRight, Truck, MapPin, Users, Clock, Package, Sparkles } from "lucide-react";
import SignOutButton from "./SignOutButton";

export const metadata = {
  title: "My Portal | American Legend Ice Cream Truck",
};

export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== "CUSTOMER") {
    redirect("/login?callbackUrl=/portal");
  }

  // Fetch customer bookings
  let bookings: any[] = [];
  try {
    bookings = await prisma.booking.findMany({
      where: { customerId: (session.user as any).id },
      include: {
        package: true,
        quote: true,
      },
      orderBy: { eventDate: "desc" },
    });
  } catch (error) {
    console.error("[PORTAL] Error fetching bookings:", error);
    // Graceful degradation: empty array
  }

  const upcomingCount = bookings.filter(b => new Date(b.eventDate) >= new Date()).length;
  const approvedCount = bookings.filter(b => b.status === "APPROVED").length;
  const pendingCount = bookings.filter(b => b.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="text-coral" size={20} />
              <span className="text-sm font-bold text-coral uppercase tracking-wider">Customer Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-navy font-display">
              Welcome back, {session.user.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-500 font-medium mt-1">Track your bookings and manage your sweet events.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/packages"
              className="px-6 py-3 bg-coral text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-coral/90 transition-all flex items-center gap-2"
            >
              <Truck size={18} />
              New Booking
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, icon: Package, color: "bg-navy/5 text-navy" },
            { label: "Upcoming", value: upcomingCount, icon: CalendarDays, color: "bg-coral/10 text-coral" },
            { label: "Approved", value: approvedCount, icon: Sparkles, color: "bg-green-50 text-green-600" },
            { label: "Pending", value: pendingCount, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/80 shadow-lg shadow-navy/5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-black text-navy">{stat.value}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bookings Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-xl shadow-navy/5 border border-white/80">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
            <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
              <CalendarDays className="text-coral" size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-navy">My Bookings</h2>
              <p className="text-xs font-medium text-gray-400">{bookings.length} booking{bookings.length !== 1 ? "s" : ""} total</p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Truck className="text-gray-300" size={40} />
              </div>
              <h3 className="text-xl font-black text-navy mb-2">No bookings yet</h3>
              <p className="text-gray-500 font-medium mb-8 max-w-sm mx-auto">
                Ready to bring the sweetest experience to your next event? Browse our packages to get started!
              </p>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 px-8 py-4 bg-coral text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-coral/90 transition-all"
              >
                <Truck size={20} />
                Browse Packages
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const isPast = new Date(booking.eventDate) < new Date();
                const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
                  APPROVED: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
                  PENDING: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
                  REJECTED: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
                  CANCELLED: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
                };
                const sc = statusConfig[booking.status] || statusConfig.PENDING;

                return (
                  <Link
                    href={`/portal/booking/${booking.id}`}
                    key={booking.id}
                    className={`group block rounded-2xl border border-gray-100 hover:border-coral/30 transition-all bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:shadow-coral/5 overflow-hidden ${isPast ? "opacity-70" : ""}`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Package Image */}
                      {booking.package?.imageUrl && (
                        <div className="md:w-44 h-32 md:h-auto flex-shrink-0 overflow-hidden">
                          <img
                            src={booking.package.imageUrl}
                            alt={booking.package.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="flex-1 p-5 md:p-6">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-mono font-bold text-gray-500">
                              #{booking.bookingNumber}
                            </span>
                            {isPast && (
                              <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-400">
                                Past
                              </span>
                            )}
                          </div>
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${sc.bg} ${sc.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                            {booking.status}
                          </div>
                        </div>

                        <h3 className="text-lg font-black text-navy mb-3">
                          {booking.package?.name || booking.eventType || "Custom Event"}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-medium text-gray-500">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={15} className="text-coral flex-shrink-0" />
                            <span className={isPast ? "text-gray-400" : "text-navy font-bold"}>
                              {new Date(booking.eventDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}{" "}
                              · {booking.startTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={15} className="text-gray-400 flex-shrink-0" />
                            <span>{booking.guests} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={15} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{booking.city}{booking.zip ? `, ${booking.zip}` : ""}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center group-hover:border-coral/10">
                          <div className="font-black text-navy text-lg">
                            ${booking.totalAmount > 0 ? booking.totalAmount.toFixed(2) : "Pending"}
                          </div>
                          <div className="flex items-center gap-1 text-sm font-bold text-coral opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                            View Details <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
