"use client";
import { useState, useEffect, useCallback } from "react";
import {
  BarChart3, TrendingUp, MapPin, DollarSign, Download, Loader2,
  Calendar, RefreshCw, Activity, PieChart as PieChartIcon
} from "lucide-react";
// @ts-ignore
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

type CityStat = { city: string; count: number; revenue: number };
type MonthStat = { month: string; bookings: number; revenue: number };

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];

export default function ReportsPage() {
  const [cityStats, setCityStats] = useState<CityStat[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthStat[]>([]);
  const [overview, setOverview] = useState({ totalRevenue: 0, totalBookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reports");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load reports");
      }
      setCityStats(json.data.cityStats);
      setMonthlyRevenue(json.data.monthlyRevenue);
      setOverview(json.data.overview);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const exportCSV = () => {
    if (!cityStats.length) return;
    const headers = ["City,Bookings,Revenue\n"];
    const rows = cityStats.map(c => `"${c.city}",${c.count},${c.revenue}`);
    const csv = headers.concat(rows).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `city-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-coral" />
          <p className="text-gray-400 font-bold animate-pulse">Generating Reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <p className="font-bold text-gray-700">{error}</p>
          <button onClick={load} className="mt-4 px-6 py-2 bg-navy text-white rounded-xl font-bold">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Analytics & Reports</h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Financials & Booking Density</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-navy hover:bg-white shadow-sm transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white rounded-xl text-sm font-black hover:bg-navy/90 shadow-md transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-5 relative overflow-hidden group">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-inner z-10">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="z-10">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
            <h2 className="text-3xl font-black text-navy mt-1">${overview.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
        </div>
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-5 relative overflow-hidden group">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-inner z-10">
            <Calendar className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="z-10">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Bookings</p>
            <h2 className="text-3xl font-black text-navy mt-1">{overview.totalBookings.toLocaleString()}</h2>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Monthly Revenue Chart */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-[400px]">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-coral" />
            <h3 className="text-lg font-black text-navy">Monthly Revenue</h3>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#9CA3AF' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                />
                <Bar dataKey="revenue" fill="#FF6B6B" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Booking Density */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-[400px]">
          <div className="flex items-center gap-2 mb-2">
            <PieChartIcon className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-black text-navy">Booking Density by City</h3>
          </div>
          <div className="flex-1 w-full min-h-0 flex items-center justify-center">
            {cityStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cityStats.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="city"
                  >
                    {cityStats.slice(0, 6).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                    itemStyle={{ fontWeight: 900 }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-400 font-bold text-sm">No city data available</div>
            )}
          </div>
        </div>

      </div>

      {/* City Data Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100/80 flex items-center gap-2 bg-gray-50/30">
          <MapPin className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-black text-navy">City Performance Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 font-black uppercase tracking-wider text-xs text-gray-400">City</th>
                <th className="px-6 py-4 font-black uppercase tracking-wider text-xs text-gray-400 text-right">Bookings</th>
                <th className="px-6 py-4 font-black uppercase tracking-wider text-xs text-gray-400 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/80">
              {cityStats.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-navy">{c.city}</td>
                  <td className="px-6 py-4 font-bold text-gray-600 text-right">{c.count}</td>
                  <td className="px-6 py-4 font-black text-emerald-600 text-right">
                    ${c.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              {cityStats.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-400 font-bold">
                    No data available for city performance
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
