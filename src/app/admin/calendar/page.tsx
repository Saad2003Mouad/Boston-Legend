"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2, Plus, X, Calendar as CalendarIcon, Star, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getOutlookWebCalendarUrl } from "@/lib/ics";

export type CalEvent = {
  id: string;
  bookingNumber: string;
  startTime: string;
  durationMins?: number;
  eventDate: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  isRescheduled?: boolean;
  customer: { firstName: string; lastName: string; email?: string; phone?: string };
  package: { name: string } | null;
  city: string;
  address?: string;
  totalAmount?: number;
};

export type DisplayStatus = "CONFIRMED" | "PENDING_REVIEW" | "CANCELLED" | "MODIFIED" | "COMPLETED";

export function getEffectiveStatus(ev: CalEvent): DisplayStatus {
  // 1. Cancelled or Rejected -> Red
  if (ev.status === "CANCELLED" || ev.status === "REJECTED") {
    return "CANCELLED";
  }

  // 2. Event date in the past -> Automatically Slate / Gray (Completed)
  const evDate = new Date(ev.eventDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  evDate.setHours(0, 0, 0, 0);
  if (evDate < now || ev.status === "COMPLETED") {
    return "COMPLETED";
  }

  // 3. Modified / Rescheduled -> Blue
  if (
    ev.isRescheduled ||
    ev.status === "MODIFIED" ||
    (ev.updatedAt && ev.createdAt && new Date(ev.updatedAt).getTime() - new Date(ev.createdAt).getTime() > 120000 && ev.status === "CONFIRMED")
  ) {
    return "MODIFIED";
  }

  // 4. Needs review -> Amber / Orange
  if (ev.status === "PENDING" || ev.status === "PENDING_REVIEW" || ev.status === "PENDING_PAYMENT") {
    return "PENDING_REVIEW";
  }

  // 5. Confirmed / Accepted -> Green
  return "CONFIRMED";
}

const STATUS_CONFIG: Record<DisplayStatus, { label: string; labelAr: string; color: string; bg: string; border: string }> = {
  CONFIRMED: {
    label: "Confirmed",
    labelAr: "مقبول / مؤكد",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
  PENDING_REVIEW: {
    label: "Under Review",
    labelAr: "قيد المراجعة",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
  },
  MODIFIED: {
    label: "Modified",
    labelAr: "تم التعديل",
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  COMPLETED: {
    label: "Past / Completed",
    labelAr: "منتهية تلقائياً",
    color: "#64748B",
    bg: "#F8FAFC",
    border: "#CBD5E1",
  },
  CANCELLED: {
    label: "Cancelled / Rejected",
    labelAr: "ملغي / مرفوض",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
  },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarPage() {
  const [events, setEvents]       = useState<CalEvent[]>([]);
  const [loading, setLoading]     = useState(true);
  const [viewDate, setViewDate]   = useState(new Date());
  const [selected, setSelected]   = useState<CalEvent | null>(null);
  const [dayEvents, setDayEvents] = useState<{ date: Date; events: CalEvent[] } | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadBookings = async () => {
    try {
      const res  = await fetch("/api/admin/bookings");
      const json = await res.json();
      setEvents(json.data || []);
    } catch {
      showToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const sendReviewEmail = async (bookingId: string) => {
    setReviewLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/review`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || "Review request email sent successfully! ⭐");
      } else {
        showToast(data.error || "Failed to send review email", "error");
      }
    } catch {
      showToast("Network error while sending review email", "error");
    } finally {
      setReviewLoading(false);
    }
  };

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsForDay = (d: number) => events.filter(e => {
    const ev = new Date(e.eventDate);
    return ev.getFullYear() === year && ev.getMonth() === month && ev.getDate() === d;
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-bold flex items-center gap-2 transition-all ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 bg-amber-500/10 rounded-2xl text-amber-600">🗓️</span> Calendar
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">
            {events.length} Total Bookings &middot; Auto-synced with Outlook
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/booking" target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-sm transition-all">
            <Plus className="w-4 h-4" /> New Booking
          </Link>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {/* Month Navigation */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100/80 bg-white/60">
          <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-slate-400 hover:text-slate-900 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{MONTHS[month]} {year}</h2>
            <button onClick={() => setViewDate(new Date())} className="text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors mt-1 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Today
            </button>
          </div>
          <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-slate-400 hover:text-slate-900 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
          {DAYS.map(d => (
            <div key={d} className="py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-40 bg-white/30">
            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
          </div>
        ) : (
          <div className="grid grid-cols-7 bg-white/40">
            {cells.map((d, idx) => {
              if (!d) return <div key={`empty-${idx}`} className="border-b border-r border-gray-100/70 min-h-[140px] bg-gray-50/30" />;
              const dayEvs = eventsForDay(d);
              return (
                <div key={d}
                  onClick={() => dayEvs.length > 0 && setDayEvents({ date: new Date(year, month, d), events: dayEvs })}
                  className={`border-b border-r border-gray-100/70 min-h-[140px] p-2 transition-all ${dayEvs.length > 0 ? "cursor-pointer hover:bg-slate-50/60" : ""}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-xl text-sm font-bold mb-1.5 transition-all ${
                    isToday(d) ? "bg-slate-900 text-white shadow-sm font-black" : "text-slate-700"
                  }`}>{d}</div>
                  <div className="space-y-1">
                    {dayEvs.slice(0, 3).map(ev => {
                      const eff = getEffectiveStatus(ev);
                      const conf = STATUS_CONFIG[eff];
                      return (
                        <div key={ev.id}
                          onClick={e => { e.stopPropagation(); setSelected(ev); }}
                          className="text-[11px] font-bold px-2 py-1 rounded-lg truncate cursor-pointer transition-all hover:opacity-85 shadow-2xs"
                          style={{ background: conf.bg, color: conf.color, border: `1px solid ${conf.border}` }}>
                          {ev.startTime} · {ev.customer.firstName}
                        </div>
                      );
                    })}
                    {dayEvs.length > 3 && (
                      <div className="text-[10px] font-bold text-slate-500 px-1.5 py-0.5 bg-gray-100 rounded inline-block">+{dayEvs.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5 Statuses Legend */}
      <div className="flex items-center gap-6 flex-wrap justify-center bg-white/80 backdrop-blur-xl px-8 py-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        {(Object.keys(STATUS_CONFIG) as DisplayStatus[]).map(key => {
          const item = STATUS_CONFIG[key];
          return (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full shadow-xs" style={{ background: item.color }} />
              <span className="text-xs font-bold text-slate-700">{item.label}</span>
              <span className="text-[11px] text-gray-400 font-medium">({item.labelAr})</span>
            </div>
          );
        })}
      </div>

      {/* Day Events Modal */}
      {dayEvents && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDayEvents(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="font-bold text-slate-900 text-lg">
                {dayEvents.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </h3>
              <button onClick={() => setDayEvents(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-gray-50 max-h-[60vh] overflow-y-auto p-3">
              {dayEvents.events.map(ev => {
                const eff = getEffectiveStatus(ev);
                const conf = STATUS_CONFIG[eff];
                return (
                  <div key={ev.id} onClick={() => { setDayEvents(null); setSelected(ev); }}
                    className="flex items-start gap-3.5 p-3.5 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors">
                    <div className="w-3.5 h-3.5 rounded-full mt-1 flex-shrink-0" style={{ background: conf.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-slate-900">#{ev.bookingNumber} · {ev.customer.firstName} {ev.customer.lastName}</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">{ev.startTime} · {ev.city}</div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate">{ev.package?.name}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: conf.bg, color: conf.color, border: `1px solid ${conf.border}` }}>
                      {conf.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal with Outlook Calendar Sync & Review Button */}
      {selected && (() => {
        const eff = getEffectiveStatus(selected);
        const conf = STATUS_CONFIG[eff];
        const isPastOrCompleted = eff === "COMPLETED";
        const outlookUrl = getOutlookWebCalendarUrl({
          summary: `American Legend Ice Cream Truck #${selected.bookingNumber}`,
          description: `Booking #${selected.bookingNumber}\nCustomer: ${selected.customer.firstName} ${selected.customer.lastName}\nPackage: ${selected.package?.name || 'Custom Package'}\nLocation: ${selected.address || selected.city}`,
          location: `${selected.address ? selected.address + ', ' : ''}${selected.city}`,
          startDate: selected.eventDate,
          startTime: selected.startTime,
          durationMins: selected.durationMins || 60,
        });

        return (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm border border-gray-100 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">#{selected.bookingNumber}</h3>
                  <p className="text-xs text-gray-400">American Legend Event</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2">
                  <div className="text-base font-bold text-slate-900">{selected.customer.firstName} {selected.customer.lastName}</div>
                  <div className="text-xs font-semibold text-gray-600">
                    {new Date(selected.eventDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })} at {selected.startTime}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">📍 {selected.city}</div>
                  <div className="text-xs text-slate-700 font-medium border-t border-gray-200/60 pt-2">{selected.package?.name || 'Custom Package'}</div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border" style={{ background: conf.bg, color: conf.color, borderColor: conf.border }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: conf.color }} />
                    {conf.label} ({conf.labelAr})
                  </span>
                </div>

                {/* Outlook Calendar Sync Button */}
                <a
                  href={outlookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <CalendarIcon className="w-3.5 h-3.5" /> Open in Outlook Calendar <ExternalLink className="w-3 h-3" />
                </a>

                {/* Send Google Review Request Button (if completed or past date) */}
                {isPastOrCompleted && (
                  <button
                    onClick={() => sendReviewEmail(selected.id)}
                    disabled={reviewLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 disabled:opacity-60 transition-colors shadow-xs"
                  >
                    {reviewLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Star className="w-3.5 h-3.5 fill-white" />}
                    Send Google Review Email ⭐
                  </button>
                )}

                {/* Full Booking Details Link */}
                <Link
                  href={`/admin/bookings/${selected.id}`}
                  className="block w-full text-center py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  View Full Booking Management &rarr;
                </Link>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
