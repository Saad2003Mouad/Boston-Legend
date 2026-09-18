"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Mail, Phone, Calendar, ChevronRight,
  DollarSign, Clock, Loader2, AlertCircle
} from "lucide-react";
import { useParams } from "next/navigation";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  CONFIRMED:       { label: "Confirmed",      bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  PENDING_REVIEW:  { label: "Pending Review", bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  PENDING_PAYMENT: { label: "Pending Payment",bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  COMPLETED:       { label: "Completed",      bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" },
  CANCELLED:       { label: "Cancelled",      bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
};

export default function CustomerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`/api/admin/customers/${id}`);
        const json = await res.json();
        setCustomer(json.data || json);
      } catch {} finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-coral" /></div>;
  if (!customer) return <div className="text-center py-20"><AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="font-bold text-gray-500">Customer not found</p></div>;

  const initials = `${customer.firstName?.[0] ?? ""}${customer.lastName?.[0] ?? ""}`;
  const totalSpent = customer.bookings?.reduce((sum: number, b: any) => sum + (b.quote?.totalAmount ?? 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/customers" className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-black text-navy">Customer Profile</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-coral/10 border-2 border-coral/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-black text-coral">{initials}</span>
          </div>
          <h2 className="text-lg font-black text-navy">{customer.firstName} {customer.lastName}</h2>
          <p className="text-sm text-gray-400 font-medium mt-0.5">Customer since {new Date(customer.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

          <div className="mt-5 space-y-3 text-left">
            <a href={`mailto:${customer.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-coral transition-colors">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" /> <span className="truncate">{customer.email}</span>
            </a>
            <a href={`tel:${customer.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-coral transition-colors">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" /> {customer.phone}
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-xl font-black text-navy">{customer.bookings?.length ?? 0}</div>
              <div className="text-[11px] font-semibold text-gray-400">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-navy">${totalSpent.toFixed(0)}</div>
              <div className="text-[11px] font-semibold text-gray-400">Total Spent</div>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-black text-navy uppercase tracking-wider mb-4">Booking History</h2>
          {!customer.bookings?.length ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
              <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="font-bold text-gray-400">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customer.bookings.map((b: any) => {
                const sc = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.CONFIRMED;
                const dateStr = b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
                return (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4 hover:border-coral/20 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                        <Calendar className="w-4 h-4 text-coral" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-navy">#{b.bookingNumber}</div>
                        <div className="text-xs text-gray-400 font-medium mt-0.5">{dateStr} · {b.city} · {b.package?.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-black text-sm text-navy">${b.quote?.totalAmount?.toFixed(0) ?? "—"}</div>
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>{sc.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-coral transition-colors" />
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
