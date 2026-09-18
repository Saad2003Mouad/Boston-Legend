"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, RefreshCw, ChevronLeft, ChevronRight,
  Eye, CheckCircle2, XCircle, Clock, DollarSign,
  Loader2, Filter, Download, Calendar, User, Truck
} from "lucide-react";

type Booking = {
  id: string; bookingNumber: string; status: string; eventDate: string;
  startTime: string; city: string; guests: number;
  customer: { firstName: string; lastName: string; phone: string; email: string };
  package: { name: string } | null;
  quote: { totalAmount: number } | null;
  vehicle: { code: string } | null;
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  PENDING_REVIEW:  { label: "Pending Review",  bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  PENDING_PAYMENT: { label: "Pending Payment", bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  CONFIRMED:       { label: "Confirmed",       bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  COMPLETED:       { label: "Completed",       bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" },
  CANCELLED:       { label: "Cancelled",       bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
  REJECTED:        { label: "Rejected",        bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
};

const ALL_STATUSES = Object.entries(STATUS_CONFIG);

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("ALL");
  const [page, setPage]         = useState(1);
  const PER_PAGE = 20;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/bookings");
      const json = await res.json();
      setBookings(json.data || []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      `${b.customer?.firstName || ""} ${b.customer?.lastName || ""} ${b.bookingNumber} ${b.city || ""} ${b.customer?.email || ""}`
        .toLowerCase().includes(q);
    const matchStatus = status === "ALL" || b.status === status;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const counts: Record<string, number> = { ALL: bookings.length };
  ALL_STATUSES.forEach(([k]) => { counts[k] = bookings.filter(b => b.status === k).length; });

  const statusTabs = [
    { key: "ALL",            label: "All" },
    { key: "PENDING_REVIEW", label: "Pending Review" },
    { key: "CONFIRMED",      label: "Confirmed" },
    { key: "COMPLETED",      label: "Completed" },
    { key: "CANCELLED",      label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Bookings</h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">
            {bookings.length} total · {counts["PENDING_REVIEW"] ?? 0} needs review
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/api/admin/export?type=bookings" download
            className="flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md border border-gray-100 rounded-xl text-sm font-black text-gray-600 hover:border-gray-200 hover:text-navy transition-all shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-0.5">
            <Download className="w-4 h-4" /> Export
          </a>
          <button onClick={fetchBookings}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md border border-gray-100 rounded-xl text-sm font-black text-gray-600 hover:border-gray-200 hover:text-navy transition-all shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-0.5">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4">
        {/* Status Tabs */}
        <div className="flex gap-2 bg-white/70 backdrop-blur-xl border border-gray-100/80 rounded-2xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-x-auto custom-scrollbar flex-1">
          {statusTabs.map(t => (
            <button key={t.key} onClick={() => { setStatus(t.key); setPage(1); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black whitespace-nowrap transition-all ${
                status === t.key ? "bg-navy text-white shadow-md shadow-navy/20" : "text-gray-500 hover:text-navy hover:bg-gray-100/50"
              }`}>
              {t.label}
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-black ${
                status === t.key ? "bg-white/20 text-white" : "bg-gray-200/50 text-gray-600"
              }`}>
                {counts[t.key] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-100/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 w-full xl:w-[350px]">
          <div className="relative h-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, booking #, email…"
              className="w-full h-full pl-11 pr-4 py-2.5 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 bg-gray-50/50 hover:bg-gray-50 transition-colors placeholder:text-gray-400 placeholder:font-semibold text-navy" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-coral" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <p className="font-black text-gray-500 text-lg tracking-tight">No bookings found</p>
            <p className="text-sm font-semibold text-gray-400 mt-1">{search ? "Try adjusting your search criteria" : "Bookings will appear here once created"}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-100/80 bg-white/50">
                    {["Booking", "Customer", "Date & Time", "Package", "Total", "Status", "Actions"].map(h => (
                      <th key={h} className={`px-6 md:px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-400 ${h === "Actions" ? "text-right" : "text-left"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/80 bg-white/30">
                  {paginated.map(b => {
                    const sc = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.CONFIRMED;
                    const dateStr = new Date(b.eventDate).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric"
                    });
                    return (
                      <tr key={b.id} className="hover:bg-white/80 transition-colors group">
                        <td className="px-6 md:px-8 py-4">
                          <div className="font-black text-sm text-navy">#{b.bookingNumber}</div>
                          <div className="text-[11px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">{b.guests} guests</div>
                        </td>
                        <td className="px-6 md:px-8 py-4">
                          <div className="font-bold text-sm text-navy">{b.customer?.firstName || "Unknown"} {b.customer?.lastName || ""}</div>
                          <div className="text-[11px] text-gray-400 font-semibold mt-1">{b.customer?.phone || "No phone"}</div>
                        </td>
                        <td className="px-6 md:px-8 py-4">
                          <div className="font-bold text-sm text-navy">{dateStr}</div>
                          <div className="text-[11px] text-gray-400 font-semibold mt-1">{b.startTime} · {b.city}</div>
                        </td>
                        <td className="px-6 md:px-8 py-4">
                          <div className="font-bold text-sm text-navy">{b.package?.name ?? "—"}</div>
                          <div className="text-[11px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">{b.vehicle?.code ?? "Unassigned"}</div>
                        </td>
                        <td className="px-6 md:px-8 py-4">
                          <div className="font-black text-sm text-navy">
                            ${b.quote?.totalAmount?.toFixed(0) ?? "—"}
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm"
                            style={{ background: sc.bg, color: sc.text }}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-6 md:px-8 py-4 text-right">
                          <Link href={`/admin/bookings/${b.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gray-50/80 text-gray-500 hover:bg-coral hover:text-white transition-all hover:shadow-md hover:shadow-coral/20">
                            <Eye className="w-3.5 h-3.5" /> View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 md:px-8 py-5 border-t border-gray-100/80 flex items-center justify-between bg-white/50">
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider">
                  Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-gray-500 hover:border-coral hover:text-coral disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const p = totalPages <= 5 ? i + 1 : Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                    return (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${page === p ? "bg-coral text-white shadow-md shadow-coral/20" : "bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-gray-500 hover:border-coral hover:text-coral"}`}>
                        {p}
                      </button>
                    );
                  })}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-gray-500 hover:border-coral hover:text-coral disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
