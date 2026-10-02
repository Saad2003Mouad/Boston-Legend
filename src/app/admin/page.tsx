"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  DollarSign, Users, CalendarDays, AlertCircle, Truck, Inbox,
  TrendingUp, ArrowUpRight, ArrowRight, Package, Clock,
  CheckCircle2, Activity, Bot, MapPin, Star, Zap, Plus,
  BarChart3, Loader2, Navigation, Phone, Calendar, Map,
  BookCheck, XCircle, RefreshCw
} from "lucide-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – recharts defaultProps typings are incompatible with react 18 strict mode; safe to ignore
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";


// STATUS helpers
const STATUS_DRIVER = [
  { value: "PENDING",    label: "Pending",    color: "#94A3B8", bg: "#1E293B" },
  { value: "ON_THE_WAY", label: "On the Way", color: "#60A5FA", bg: "#2563EB20" },
  { value: "ARRIVED",    label: "Arrived",    color: "#FBBF24", bg: "#D9770620" },
  { value: "COMPLETED",  label: "Completed",  color: "#34D399", bg: "#05966920" },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  CONFIRMED:      { bg: "#05966920", text: "#34D399", border: "#05966940" },
  PENDING:        { bg: "#D9770620", text: "#FBBF24", border: "#D9770640" },
  PENDING_REVIEW: { bg: "#C2410C20", text: "#FB923C", border: "#C2410C40" },
  APPROVED:       { bg: "#2563EB20", text: "#60A5FA", border: "#2563EB40" },
  ASSIGNED:       { bg: "#2563EB20", text: "#60A5FA", border: "#2563EB40" },
  IN_PROGRESS:    { bg: "#7C3AED20", text: "#A78BFA", border: "#7C3AED40" },
  COMPLETED:      { bg: "#16A34A20", text: "#4ADE80", border: "#16A34A40" },
  CANCELLED:      { bg: "#DC262620", text: "#F87171", border: "#DC262640" },
};

// --- KPI Card ---
function KpiCard({
  label, value, sub, icon: Icon, iconBg, iconColor, trend, href, highlight
}: {
  label: string; value: string; sub?: string;
  icon: any; iconBg: string; iconColor: string;
  trend?: { value: string; up: boolean }; href: string; highlight?: boolean;
}) {
  return (
    <Link href={href} className={`group bg-slate-900/40 backdrop-blur-xl rounded-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 p-5 flex flex-col justify-between gap-4 relative overflow-hidden hover:-translate-y-1
      ${highlight ? "border-coral/40 bg-gradient-to-br from-slate-900 to-coral/10" : "border-slate-800 hover:border-coral/40"}`}>
      <div className="flex items-start justify-between relative z-10">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${iconBg} shadow-inner`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1.5 rounded-full ${trend.up ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
            <TrendingUp className={`w-3.5 h-3.5 ${!trend.up && "rotate-180"}`} />
            {trend.value}
          </div>
        )}
      </div>
      <div className="relative z-10 mt-2">
        <div className="text-3xl font-black text-white tracking-tight">{value}</div>
        <div className="text-[13px] font-bold text-slate-400 mt-1">{label}</div>
        {sub && <div className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">{sub}</div>}
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-slate-800 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <ArrowUpRight className="w-5 h-5 text-coral" />
      </div>
    </Link>
  );
}

// --- Section Header ---
function SectionHeader({ title, sub, href, linkLabel }: { title: string; sub?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-lg font-black text-white tracking-tight">{title}</h2>
        {sub && <p className="text-xs font-semibold text-slate-400 mt-1">{sub}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="flex items-center gap-1.5 text-xs font-black text-coral hover:text-coral transition-colors bg-coral/10 hover:bg-coral/20 px-3 py-1.5 rounded-full">
          {linkLabel} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

// ─── Driver View ────────────────────────────────────────────────────────────
function DriverView() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);
  const [updating, setUpdating]       = useState<string | null>(null);
  const [selected, setSelected]       = useState<any | null>(null);
  const [note, setNote]               = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      const r = await fetch("/api/driver/jobs");
      if (r.ok) setAssignments(await r.json());
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchJobs(); const t = setInterval(fetchJobs, 30000); return () => clearInterval(t); }, [fetchJobs]);

  const updateStatus = async (id: string, jobStatus: string) => {
    setUpdating(id);
    await fetch(`/api/driver/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobStatus, driverNote: note }),
    });
    await fetchJobs();
    setUpdating(null);
    if (selected?.id === id) setSelected((prev: any) => prev ? { ...prev, jobStatus } : null);
  };

  const todayStr  = new Date().toISOString().split("T")[0];
  const todayJobs = assignments.filter(a => a.booking.eventDate.startsWith(todayStr));
  const upcoming  = assignments.filter(a => !a.booking.eventDate.startsWith(todayStr));
  const mapsUrl   = (a: any) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${a.booking.address},${a.booking.city},MA ${a.booking.zip}`)}`;

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-coral/20 rounded-full animate-spin border-t-coral" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Truck className="w-6 h-6 text-coral animate-pulse" />
        </div>
      </div>
    </div>
  );

  const firstName = session?.user?.name?.split(" ")[0] || "Driver";
  const statusOpt = (s: string) => STATUS_DRIVER.find(o => o.value === s) ?? STATUS_DRIVER[0];

  const renderCard = (a: any) => {
    const s   = statusOpt(a.jobStatus);
    const date = new Date(a.booking.eventDate);
    const dateStr = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    return (
      <div key={a.id}
        onClick={() => { setSelected(a); setNote(a.driverNote || ""); }}
        className="bg-slate-900/40 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-800 p-5 cursor-pointer hover:shadow-md hover:border-coral/40 transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm font-black text-white">{a.booking.customer?.firstName} {a.booking.customer?.lastName}</div>
            <div className="text-xs text-slate-400 mt-0.5">{dateStr} · {a.booking.startTime}</div>
          </div>
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.color }}>
            {s.label}
          </span>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1 mb-4">
          <Navigation className="w-3.5 h-3.5" />
          {a.booking.address}, {a.booking.city}
        </div>
        <div className="flex gap-2">
          <a href={mapsUrl(a)} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 py-2 bg-coral text-white rounded-xl text-xs font-bold hover:bg-coral-dark transition-colors"
            onClick={e => e.stopPropagation()}>
            <Map className="w-3.5 h-3.5" /> Navigate
          </a>
          {STATUS_DRIVER.filter(o => o.value !== a.jobStatus).map(opt => (
            <button key={opt.value} onClick={e => { e.stopPropagation(); updateStatus(a.id, opt.value); }}
              disabled={updating === a.id}
              className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 transition-colors"
              style={{ color: opt.color }}>
              {updating === a.id ? <Loader2 className="w-3 h-3 animate-spin mx-auto" /> : opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Hi, {firstName} 👋</h1>
        <p className="text-sm text-slate-400 font-medium mt-1">Here are your assignments</p>
      </div>
      {todayJobs.length > 0 && (
        <div>
          <h2 className="text-sm font-black text-white mb-3">Today's Jobs</h2>
          <div className="space-y-3">{todayJobs.map(renderCard)}</div>
        </div>
      )}
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-sm font-black text-white mb-3">Upcoming Jobs</h2>
          <div className="space-y-3">{upcoming.map(renderCard)}</div>
        </div>
      )}
      {assignments.length === 0 && (
        <div className="py-20 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <p className="font-bold text-slate-500">No assignments yet</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "OWNER";
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Admin";
  const [data, setData]       = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (userRole === "DRIVER") { setLoading(false); return; }
    try {
      const res  = await fetch("/api/admin/dashboard", { cache: "no-store" });
      const text = await res.text();
      const json = text ? JSON.parse(text) : null;
      if (!res.ok) throw new Error(json?.error || `API error ${res.status}`);
      setData(json?.data ?? json);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard");
    } finally { setLoading(false); }
  }, [userRole]);

  useEffect(() => { loadData(); }, [loadData]);

  if (userRole === "DRIVER") return <DriverView />;

  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  };

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded-xl mb-2" />
      <div className="h-4 w-40 bg-gray-100 rounded-lg" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_,i) => <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100" />)}
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-white rounded-2xl border border-gray-100" />
        <div className="h-80 bg-white rounded-2xl border border-gray-100" />
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-400" />
      </div>
      <h2 className="text-lg font-black text-navy mb-2">Dashboard Error</h2>
      <p className="text-sm text-gray-500 font-medium">{error}</p>
      <button onClick={() => { setLoading(true); setError(null); loadData(); }}
        className="mt-4 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> Retry
      </button>
    </div>
  );

  if (!data) return null;

  const { stats, todayBookings = [], pendingBookings = [], recentBookings = [], upcomingBookings = [], vehicles = [], revenueChart = [] } = data;

  const PIE_COLORS = ["#10B981", "#FF6B6B", "#F59E0B", "#6B7280"];
  const bookingsByStatus = [
    { name: "Confirmed",  value: stats?.confirmed ?? 0 },
    { name: "Cancelled",  value: stats?.cancelled ?? 0 },
    { name: "Pending",    value: stats?.pending   ?? 0 },
    { name: "Completed",  value: stats?.completed ?? 0 },
  ].filter(b => b.value > 0);

  const formatCurrency = (v: number) => v >= 1000 ? `$${(v/1000).toFixed(1)}k` : `$${v.toFixed(0)}`;

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {greeting()}, {userName.split(" ")[0]} 👋
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setLoading(true); loadData(); }}
            className="flex items-center gap-2 px-3 py-2.5 bg-slate-900/40 rounded-xl border border-slate-700 text-sm font-bold text-slate-300 hover:border-slate-500 hover:bg-slate-800 transition-all shadow-sm">
            <RefreshCw className="w-4 h-4" />
          </button>
          {stats?.pending > 0 && (
            <Link href="/admin/bookings?status=PENDING_REVIEW"
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm font-bold text-amber-400 hover:bg-amber-500/20 transition-all shadow-sm">
              <AlertCircle className="w-4 h-4" />
              {stats.pending} Pending Review
            </Link>
          )}
          <Link href="/packages" target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            New Booking
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard label="Total Bookings" value={String(stats?.totalBookings ?? 0)}
          icon={CalendarDays} iconBg="bg-blue-500/10" iconColor="text-blue-400"
          href="/admin/bookings" />
        {(userRole === "OWNER" || userRole === "ADMIN") && (
          <KpiCard label="Monthly Revenue" value={formatCurrency(stats?.monthRevenue ?? 0)}
            icon={DollarSign} iconBg="bg-emerald-500/10" iconColor="text-emerald-400"
            href="/admin/bookings" highlight />
        )}
        <KpiCard label="Confirmed" value={String(stats?.confirmed ?? 0)}
          icon={CheckCircle2} iconBg="bg-emerald-500/10" iconColor="text-emerald-400"
          href="/admin/bookings?status=CONFIRMED" />
        <KpiCard label="Pending Review" value={String(stats?.pending ?? 0)}
          icon={AlertCircle} iconBg="bg-amber-500/10" iconColor="text-amber-400"
          href="/admin/bookings?status=PENDING_REVIEW"
          sub={stats?.pending > 0 ? "Needs attention" : "All clear"} />
        <KpiCard label="Customers" value={String(stats?.totalCustomers ?? 0)}
          icon={Users} iconBg="bg-purple-500/10" iconColor="text-purple-400"
          href="/admin/customers" />
        <KpiCard label="Today's Jobs" value={String(stats?.todayJobs ?? 0)}
          icon={Activity} iconBg="bg-indigo-500/10" iconColor="text-indigo-400"
          href="/admin/calendar"
          sub={new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
      </div>

      {/* ── Revenue Chart + Pie ── */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        {(userRole === "OWNER" || userRole === "ADMIN") && (
          <div className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 md:p-8">
            <SectionHeader title="Revenue Overview" sub="Last 7 days (confirmed & completed bookings)" />
            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-black text-white tracking-tighter">{formatCurrency(stats?.weekRevenue ?? 0)}</span>
              <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">This week</span>
              <span className="ml-auto text-xs font-semibold text-slate-500">
                All time: <span className="font-black text-white">{formatCurrency(stats?.allTimeRevenue ?? 0)}</span>
              </span>
            </div>
            <div className="h-64 w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChart} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#FF6B6B" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: "#64748B" }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                  <Tooltip formatter={(v: any) => [`$${Number(v).toFixed(2)}`, "Revenue"]}
                    contentStyle={{ borderRadius: 16, border: "1px solid #1E293B", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", fontWeight: 700, fontSize: 13, backgroundColor: 'rgba(15, 23, 42, 0.95)', color: '#fff' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#FF6B6B" strokeWidth={3} fill="url(#revGrad)"
                    activeDot={{ r: 6, fill: "#0F172A", stroke: "#FF6B6B", strokeWidth: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Pie + Summary */}
        <div className={`bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 md:p-8 flex flex-col ${(userRole !== "OWNER" && userRole !== "ADMIN") ? "xl:col-span-3" : ""}`}>
          <SectionHeader title="Bookings Breakdown" sub="By status" />
          {bookingsByStatus.length > 0 ? (
            <div className="flex-1 flex flex-col justify-center">
              <div className="h-48 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={bookingsByStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                      {bookingsByStatus.map((_, idx) => <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.2)", fontWeight: 700, fontSize: 13, backgroundColor: '#0F172A', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {bookingsByStatus.map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between text-sm p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-inner" style={{ background: PIE_COLORS[idx % PIE_COLORS.length] }} />
                      <span className="font-bold text-slate-300">{item.name}</span>
                    </div>
                    <span className="font-black text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400 font-bold">No bookings yet</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Bookings + Pending Review ── */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
          <div className="px-6 md:px-8 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Recent Bookings</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Latest booking activity</p>
            </div>
            <Link href="/admin/bookings" className="text-xs font-black text-coral hover:text-coral transition-colors bg-coral/10 hover:bg-coral/20 px-3 py-1.5 rounded-full">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-800/50 rounded-3xl flex items-center justify-center mb-4">
                <CalendarDays className="w-6 h-6 text-slate-500" />
              </div>
              <p className="font-black text-slate-400 text-base">No bookings yet</p>
              <p className="text-sm text-slate-500 mt-1 font-medium">Bookings will appear here once created 🍦</p>
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-800/30">
                    <th className="px-6 md:px-8 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">Ref</th>
                    <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">Package</th>
                    <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 md:px-8 py-4 text-right text-[11px] font-black text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {recentBookings.map((b: any) => {
                    const sc = STATUS_COLORS[b.status] ?? { bg: "#1E293B", text: "#94A3B8", border: "#334155" };
                    return (
                      <tr key={b.id} className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                        <td className="px-6 md:px-8 py-4">
                          <Link href={`/admin/bookings/${b.id}`} className="text-xs font-black text-coral group-hover:text-coral transition-colors">
                            #{b.bookingNumber}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-white text-sm">{b.customer.firstName} {b.customer.lastName}</div>
                          <div className="text-[11px] text-slate-400 font-semibold mt-0.5">{b.city} · {b.eventType}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 font-bold">{b.package?.name || "—"}</td>
                        <td className="px-6 py-4 text-sm font-black text-white">${(b.totalAmount || 0).toFixed(0)}</td>
                        <td className="px-6 md:px-8 py-4 text-right whitespace-nowrap">
                          <span className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                            style={{ background: sc.bg, color: sc.text }}>
                            {b.status.replace(/_/g, " ")}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Pending Review */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
            <div className="px-6 md:px-8 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span className="text-lg font-black text-white tracking-tight">Needs Approval</span>
              </div>
              {pendingBookings.length > 0 && (
                <span className="text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full shadow-sm">
                  {pendingBookings.length}
                </span>
              )}
            </div>
            {pendingBookings.length === 0 ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-base font-black text-slate-400">All caught up!</p>
                <p className="text-xs font-medium text-slate-500 mt-1">No pending approvals.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto custom-scrollbar">
                {pendingBookings.map((b: any) => (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`}
                    className="flex items-center gap-4 p-5 hover:bg-slate-800/50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-inner flex items-center justify-center font-black text-amber-500 text-sm flex-shrink-0">
                      {b.customer.firstName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm truncate group-hover:text-coral transition-colors">{b.customer.firstName} {b.customer.lastName}</div>
                      <div className="text-xs text-slate-400 font-semibold mt-0.5">${(b.totalAmount||0).toFixed(0)} · {b.eventType}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-coral transition-colors translate-x-0 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
            <div className="px-6 md:px-8 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span className="text-lg font-black text-white tracking-tight">Upcoming Events</span>
              </div>
              <Link href="/admin/calendar" className="text-xs font-black text-coral hover:text-coral transition-colors bg-coral/10 hover:bg-coral/20 px-3 py-1.5 rounded-full">View</Link>
            </div>
            {upcomingBookings.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-slate-500" />
                </div>
                <p className="text-sm font-bold text-slate-400">No upcoming events</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80">
                {upcomingBookings.map((b: any) => {
                  const sc = STATUS_COLORS[b.status] ?? { bg: "#1E293B", text: "#94A3B8", border: "#334155" };
                  const d = new Date(b.eventDate);
                  return (
                    <Link key={b.id} href={`/admin/bookings/${b.id}`}
                      className="flex items-center gap-4 p-5 hover:bg-slate-800/50 transition-colors group">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider leading-none mb-0.5">
                          {d.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-base font-black text-indigo-300 leading-none">{d.getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm truncate group-hover:text-indigo-400 transition-colors">{b.customer.firstName} {b.customer.lastName}</div>
                        <div className="text-[11px] text-slate-400 font-semibold mt-0.5">{b.startTime} · {b.city}</div>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0 uppercase tracking-wider"
                        style={{ background: sc.bg, color: sc.text }}>
                        {b.status.replace(/_/g, " ")}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Fleet Status */}
          {vehicles.length > 0 && (
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
              <div className="px-6 md:px-8 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-slate-400" />
                  <span className="text-lg font-black text-white tracking-tight">Fleet Status</span>
                </div>
                <Link href="/admin/vehicles" className="text-xs font-black text-coral hover:text-coral transition-colors bg-coral/10 hover:bg-coral/20 px-3 py-1.5 rounded-full">Manage</Link>
              </div>
              <div className="p-3">
                {vehicles.slice(0, 5).map((v: any) => {
                  const statusColors: Record<string, { bg: string; text: string }> = {
                    AVAILABLE:   { bg: "#05966920", text: "#34D399" },
                    ON_JOB:      { bg: "#2563EB20", text: "#60A5FA" },
                    MAINTENANCE: { bg: "#DC262620", text: "#F87171" },
                  };
                  const c = statusColors[v.status] ?? { bg: "#1E293B", text: "#94A3B8" };
                  return (
                    <div key={v.code} className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-2xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-lg shadow-inner">
                          {v.code.startsWith("VAN") ? "🚐" : "🚌"}
                        </div>
                        <div>
                          <div className="text-xs font-black text-white">{v.code}</div>
                          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{v.type}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ background: c.bg, color: c.text }}>
                        {v.status.replace("_", " ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Activity Feed */}
          {data?.activityFeed && data.activityFeed.length > 0 && (
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
              <div className="px-6 md:px-8 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <span className="text-lg font-black text-white tracking-tight">Live Activity</span>
                </div>
              </div>
              <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto custom-scrollbar">
                {data.activityFeed.map((log: any) => (
                  <div key={log.id} className="p-5 hover:bg-slate-800/50 transition-colors flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[12px] font-black text-emerald-400 flex-shrink-0 shadow-inner">
                      {log.actorName?.charAt(0)?.toUpperCase() ?? "S"}
                    </div>
                    <div>
                      <p className="text-xs font-black text-white capitalize">{log.action.replace(/_/g, " ").toLowerCase()}</p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1">
                        {log.actorName} · {new Date(log.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <SectionHeader title="Quick Actions" sub="Common admin tasks" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { href: "/packages", label: "New Booking", icon: Plus, color: "bg-coral/10 text-coral", external: true },
            { href: "/admin/inquiries", label: "View Inquiries", icon: Inbox, color: "bg-blue-500/10 text-blue-400" },
            { href: "/admin/customers", label: "Customers", icon: Users, color: "bg-purple-500/10 text-purple-400" },
            { href: "/admin/packages", label: "Packages", icon: Package, color: "bg-amber-500/10 text-amber-400" },
          ].map(({ href, label, icon: Icon, color, external }) => (
            <Link key={href} href={href} target={external ? "_blank" : undefined}
              className="flex items-center gap-3 bg-slate-900/40 rounded-2xl border border-slate-800 p-4 hover:border-coral/40 hover:shadow-sm transition-all font-semibold text-sm text-white group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
