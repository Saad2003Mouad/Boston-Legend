"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, RefreshCw, ChevronRight, Mail, Phone, Calendar, Loader2, Users } from "lucide-react";

type Customer = {
  id: string; firstName: string; lastName: string;
  email: string; phone: string; createdAt: string;
  bookingsCount?: number;
  bookings?: { quote?: { totalAmount: number } }[];
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/customers");
      const json = await res.json();
      if (!res.ok || json.success === false) {
        console.error("Failed to load customers:", json.error || res.statusText);
        setCustomers([]);
        return;
      }
      setCustomers(json.data || json || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomers([]);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    return !q || `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Customers</h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">{customers.length} registered customers</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md border border-gray-100 rounded-xl text-sm font-black text-gray-600 hover:border-gray-200 hover:text-navy transition-all shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-0.5">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-gray-100/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2">
        <div className="relative max-w-md h-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, phone…"
            className="w-full pl-11 pr-4 py-2.5 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 bg-gray-50/50 hover:bg-gray-50 transition-colors placeholder:text-gray-400 placeholder:font-semibold text-navy" />
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-gray-300" />
            </div>
            <p className="font-black text-gray-500 text-lg tracking-tight">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100/80 bg-white/50">
                  {["Customer", "Contact", "Bookings", "Joined", ""].map((h, i) => (
                    <th key={i} className={`px-6 md:px-8 py-5 text-[11px] font-black uppercase tracking-wider text-gray-400 ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/80 bg-white/30">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-white/80 transition-colors group">
                    <td className="px-6 md:px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-coral/10 to-coral/5 border border-coral/20 flex items-center justify-center font-black text-coral text-xs flex-shrink-0 shadow-inner">
                          {c.firstName?.[0]}{c.lastName?.[0]}
                        </div>
                        <div>
                          <div className="font-black text-sm text-navy">{c.firstName} {c.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-coral transition-colors">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> {c.email}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mt-1 hover:text-coral transition-colors">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {c.phone}
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4">
                      <span className="text-sm font-black text-navy">{c.bookingsCount ?? 0}</span>
                      <span className="text-[10px] text-gray-400 ml-1 font-black uppercase tracking-widest">bookings</span>
                    </td>
                    <td className="px-6 md:px-8 py-4">
                      <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                        {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-4 text-right">
                      <Link href={`/admin/customers/${c.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gray-50/80 text-gray-500 hover:bg-coral hover:text-white transition-all hover:shadow-md hover:shadow-coral/20">
                        View <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
