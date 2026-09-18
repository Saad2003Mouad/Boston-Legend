"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";

type CalEvent = {
  id: string; bookingNumber: string; startTime: string;
  eventDate: string; status: string;
  customer: { firstName: string; lastName: string };
  package: { name: string } | null;
  city: string;
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED:       "#059669",
  PENDING_REVIEW:  "#D97706",
  PENDING_PAYMENT: "#2563EB",
  COMPLETED:       "#64748B",
  CANCELLED:       "#DC2626",
};

const STATUS_BG: Record<string, string> = {
  CONFIRMED:       "#ECFDF5",
  PENDING_REVIEW:  "#FFFBEB",
  PENDING_PAYMENT: "#EFF6FF",
  COMPLETED:       "#F8FAFC",
  CANCELLED:       "#FEF2F2",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarPage() {
  const [events, setEvents]       = useState<CalEvent[]>([]);
  const [loading, setLoading]     = useState(true);
  const [viewDate, setViewDate]   = useState(new Date());
  const [selected, setSelected]   = useState<CalEvent | null>(null);
  const [dayEvents, setDayEvents] = useState<{ date: Date; events: CalEvent[] } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/admin/bookings");
        const json = await res.json();
        setEvents(json.data || []);
      } catch {} finally { setLoading(false); }
    })();
  }, []);

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight flex items-center gap-3">
            <span className="p-2 bg-coral/10 rounded-2xl">🗓️</span> Calendar
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">{events.length} total bookings</p>
        </div>
        <Link href="/booking" target="_blank"
          className="flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5 whitespace-nowrap">
          <Plus className="w-5 h-5" /> New Booking
        </Link>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {/* Month Nav */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/80 bg-white/50">
          <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            className="w-12 h-12 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-all hover:shadow-md hover:-translate-x-0.5">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl font-black text-navy tracking-tight">{MONTHS[month]} {year}</h2>
            <button onClick={() => setViewDate(new Date())} className="text-xs font-black text-coral hover:text-white hover:bg-coral transition-colors mt-1 bg-coral/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
              Today
            </button>
          </div>
          <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            className="w-12 h-12 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-all hover:shadow-md hover:translate-x-0.5">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-100/80 bg-gray-50/50">
          {DAYS.map(d => (
            <div key={d} className="py-5 text-center text-[12px] font-black text-gray-400 uppercase tracking-widest">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-40 bg-white/30">
            <Loader2 className="w-10 h-10 animate-spin text-coral" />
          </div>
        ) : (
          <div className="grid grid-cols-7 bg-white/30">
            {cells.map((d, idx) => {
              if (!d) return <div key={`empty-${idx}`} className="border-b border-r border-gray-100/50 min-h-[160px] bg-gray-50/30" />;
              const dayEvs = eventsForDay(d);
              return (
                <div key={d}
                  onClick={() => dayEvs.length > 0 && setDayEvents({ date: new Date(year, month, d), events: dayEvs })}
                  className={`border-b border-r border-gray-100/50 min-h-[160px] p-2 transition-all ${dayEvs.length > 0 ? "cursor-pointer hover:bg-coral/5 hover:shadow-inner" : ""}`}>
                  <div className={`w-9 h-9 flex items-center justify-center rounded-2xl text-sm font-black mb-2 transition-all ${
                    isToday(d) ? "bg-coral text-white shadow-md shadow-coral/30 scale-110 ml-1 mt-1" : "text-navy"
                  }`}>{d}</div>
                  <div className="space-y-1.5 px-1">
                    {dayEvs.slice(0, 3).map(ev => (
                      <div key={ev.id}
                        onClick={e => { e.stopPropagation(); setSelected(ev); }}
                        className="text-[11px] font-bold px-2.5 py-1.5 rounded-xl truncate cursor-pointer transition-all hover:scale-[1.02] hover:shadow-sm"
                        style={{ background: STATUS_BG[ev.status] ?? "#F8FAFC", color: STATUS_COLORS[ev.status] ?? "#475569", border: `1px solid ${STATUS_COLORS[ev.status]}20` }}>
                        {ev.startTime} · {ev.customer.firstName}
                      </div>
                    ))}
                    {dayEvs.length > 3 && (
                      <div className="text-[10px] font-black text-coral px-2 uppercase tracking-wider py-1 bg-coral/5 rounded-lg inline-block">+{dayEvs.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 flex-wrap justify-center bg-white/70 backdrop-blur-xl px-8 py-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        {Object.entries(STATUS_COLORS).map(([k, c]) => (
          <div key={k} className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full shadow-inner ring-4 ring-gray-50/50" style={{ background: c }} />
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">{k.replace(/_/g, " ")}</span>
          </div>
        ))}
      </div>

      {/* Day Modal */}
      {dayEvents && (
        <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setDayEvents(null)}>
          <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-white/50 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50 bg-white/50">
              <h3 className="font-black text-navy text-xl tracking-tight">
                {dayEvents.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </h3>
              <button onClick={() => setDayEvents(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="divide-y divide-gray-50 max-h-[60vh] overflow-y-auto custom-scrollbar p-3">
              {dayEvents.events.map(ev => (
                <Link key={ev.id} href={`/admin/bookings/${ev.id}`} onClick={() => setDayEvents(null)}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50/80 rounded-2xl transition-colors group">
                  <div className="w-3.5 h-3.5 rounded-full mt-1.5 flex-shrink-0 shadow-inner ring-4 ring-gray-50" style={{ background: STATUS_COLORS[ev.status] ?? "#475569" }} />
                  <div>
                    <div className="font-black text-sm text-navy group-hover:text-coral transition-colors">#{ev.bookingNumber} · {ev.customer.firstName} {ev.customer.lastName}</div>
                    <div className="text-[11px] text-gray-500 font-bold mt-1.5 uppercase tracking-wider bg-gray-50 inline-block px-2 py-0.5 rounded-md">{ev.startTime} · {ev.city}</div>
                    <div className="text-[11px] text-gray-400 font-semibold mt-1 truncate max-w-[250px]">{ev.package?.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelected(null)}>
          <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl w-full max-w-sm border border-white/50 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50 bg-white/50">
              <h3 className="font-black text-navy text-xl tracking-tight">#{selected.bookingNumber}</h3>
              <button onClick={() => setSelected(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100/80 shadow-inner">
                <div className="text-lg font-black text-navy">{selected.customer.firstName} {selected.customer.lastName}</div>
                <div className="text-sm font-bold text-gray-500 mt-2">{new Date(selected.eventDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selected.startTime}</div>
                <div className="text-[11px] font-black text-gray-400 mt-3 uppercase tracking-wider bg-white px-3 py-1.5 rounded-lg inline-block shadow-sm">{selected.city}</div>
                <div className="text-sm font-semibold text-gray-600 mt-3 border-t border-gray-200/50 pt-3">{selected.package?.name}</div>
              </div>
              <div className="flex items-center justify-center">
                <span className="inline-flex px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm border" style={{ background: STATUS_BG[selected.status], color: STATUS_COLORS[selected.status], borderColor: `${STATUS_COLORS[selected.status]}30` }}>
                  {selected.status.replace(/_/g, " ")}
                </span>
              </div>
              <Link href={`/admin/bookings/${selected.id}`}
                className="block w-full text-center mt-2 py-4 bg-coral text-white rounded-2xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5">
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
