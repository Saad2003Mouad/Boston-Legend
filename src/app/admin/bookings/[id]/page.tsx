"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, XCircle, MapPin, Users,
  Phone, Mail, DollarSign, Calendar, Loader2, ChevronRight, AlertCircle, MessageSquare, Truck, Edit3
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  PENDING_REVIEW:  { label: "Pending Review",  bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  PENDING_PAYMENT: { label: "Pending Payment", bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  CONFIRMED:       { label: "Confirmed",       bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  COMPLETED:       { label: "Completed",       bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" },
  CANCELLED:       { label: "Cancelled",       bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
  REJECTED:        { label: "Rejected",        bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
};

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-36 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-navy text-right flex-1">{value || "—"}</span>
    </div>
  );
}

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [internalNote, setInternalNote] = useState("");
  const [showNoteBox, setShowNoteBox] = useState(false);
  
  // Assignment state
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);

  // Edit state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [saveEditLoading, setSaveEditLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadBooking = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/bookings/${id}`);
      const json = await res.json();
      setBooking(json.data || json);
      if (json.data?.assignment) {
        setSelectedVehicle(json.data.assignment.vehicleId || "");
        setSelectedDriver(json.data.assignment.driverId || "");
      }
    } catch { showToast("Failed to load booking", "error"); }
    finally { setLoading(false); }
  };

  const loadResources = async () => {
    try {
      const [vRes, dRes] = await Promise.all([
        fetch("/api/admin/vehicles"),
        fetch("/api/admin/drivers")
      ]);
      const vJson = await vRes.json();
      const dJson = await dRes.json();
      if (Array.isArray(vJson)) setVehicles(vJson);
      if (Array.isArray(dJson)) setDrivers(dJson);
    } catch (e) {
      console.error("Failed to load resources", e);
    }
  };

  useEffect(() => { loadBooking(); loadResources(); }, [id]);

  const updateStatus = async (status: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNote }),
      });
      if (res.ok) { showToast(`Status updated to ${status}`); setShowNoteBox(false); await loadBooking(); }
      else { showToast("Failed to update status", "error"); }
    } catch { showToast("Network error", "error"); }
    finally { setActionLoading(false); }
  };

  const saveAssignment = async () => {
    setAssignLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId: selectedVehicle, driverId: selectedDriver }),
      });
      if (res.ok) { showToast("Assignment saved"); await loadBooking(); }
      else { showToast("Failed to save assignment", "error"); }
    } catch { showToast("Network error", "error"); }
    finally { setAssignLoading(false); }
  };

  const saveEdit = async () => {
    setSaveEditLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) { showToast("Booking details updated"); setShowEditModal(false); await loadBooking(); }
      else { showToast("Failed to update booking details", "error"); }
    } catch { showToast("Network error", "error"); }
    finally { setSaveEditLoading(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-coral" />
    </div>
  );
  if (!booking) return (
    <div className="text-center py-20">
      <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p className="font-bold text-gray-500">Booking not found</p>
    </div>
  );

  const sc = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.CONFIRMED;
  const dateStr = booking.eventDate
    ? new Date(booking.eventDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-bold flex items-center gap-2 transition-all ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-navy">#{booking.bookingNumber}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border"
                style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>
                {sc.label}
              </span>
              <span className="text-xs text-gray-400 font-medium">{dateStr}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {booking.status === "PENDING_REVIEW" && (
            <>
              <button onClick={() => updateStatus("CONFIRMED")} disabled={actionLoading}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 disabled:opacity-60 transition-all shadow-sm">
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Confirm Booking
              </button>
              <button onClick={() => updateStatus("REJECTED")} disabled={actionLoading}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all">
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </>
          )}
          {booking.status === "CONFIRMED" && (
            <button onClick={() => updateStatus("COMPLETED")} disabled={actionLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 disabled:opacity-60 transition-all shadow-sm">
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Mark Completed
            </button>
          )}
          {!["CANCELLED","REJECTED","COMPLETED"].includes(booking.status) && (
            <button onClick={() => updateStatus("CANCELLED")} disabled={actionLoading}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:border-red-300 hover:text-red-500 transition-all">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Event Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative">
            <button onClick={() => {
              setEditData({
                eventDate: booking.eventDate ? new Date(booking.eventDate).toISOString().split('T')[0] : "",
                startTime: booking.startTime,
                durationMins: booking.durationMins,
                guests: booking.guests,
                address: booking.address,
                city: booking.city,
                zip: booking.zip,
                notes: booking.notes || ""
              });
              setShowEditModal(true);
            }} className="absolute top-6 right-6 text-gray-400 hover:text-coral transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-coral" /> Event Details
            </h2>
            <InfoRow label="Event Type"   value={booking.eventType} />
            <InfoRow label="Date"         value={dateStr} />
            <InfoRow label="Start Time"   value={booking.startTime} />
            <InfoRow label="Duration"     value={booking.durationMins ? `${booking.durationMins} min` : null} />
            <InfoRow label="Guests"       value={booking.guests} />
            <InfoRow label="Address"      value={`${booking.address || ""}, ${booking.city || ""} ${booking.zip || ""}`} />
            <InfoRow label="Package"      value={booking.package?.name} />
            <InfoRow label="Vehicle"      value={booking.vehicle?.code} />
            {booking.notes && <InfoRow label="Notes" value={booking.notes} />}
          </div>

          {/* Pricing */}
          {booking.quote && (() => {
            let snap: any = {};
            try { snap = booking.quote.snapshotJson ? JSON.parse(booking.quote.snapshotJson) : {}; } catch {}

            const basePrice            = snap.packagePrice        ?? booking.quote.basePrice           ?? 0;
            const includedGuests       = snap.includedGuests       ?? booking.package?.servings         ?? 0;
            const includedMins         = snap.includedServiceMins  ?? booking.package?.durationMins     ?? 0;
            const extraGuestsCount     = snap.additionalGuests     ?? 0;
            const extraGuestPrice      = snap.extraGuestPrice      ?? 5;
            const extraGuestsFee       = snap.additionalGuestsFee  ?? (extraGuestsCount * extraGuestPrice);
            const travelFee            = snap.travelFee            ?? booking.quote.travelFee           ?? 0;
            const weekendFee           = snap.weekendFee           ?? 0;
            const additionalServiceFee = snap.additionalServiceFee ?? booking.quote.additionalServiceFee ?? 0;
            const additionalServiceMins= snap.additionalServiceMins ?? 0;
            const extraTimeFee         = snap.extraTimeFee         ?? 0;
            const additionalStopsFee   = snap.additionalStopsFee   ?? 0;
            const additionalVehicleFee = snap.additionalVehicleSetupFee ?? 0;
            const total                = snap.estimatedTotal       ?? booking.quote.totalAmount         ?? booking.totalAmount ?? 0;

            return (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-coral" /> Pricing
                </h2>
                <InfoRow label="Base Price" value={
                  <span>
                    ${basePrice.toFixed(2)}
                    {(includedGuests > 0 || includedMins > 0) && (
                      <span className="text-[10px] text-gray-400 font-normal ml-1">
                        ({includedGuests} guests · {includedMins} min included)
                      </span>
                    )}
                  </span>
                } />
                {extraGuestsFee > 0 && (
                  <InfoRow label="Extra Guests" value={
                    <span className="text-amber-600">
                      +${extraGuestsFee.toFixed(2)}
                      <span className="text-[10px] text-gray-400 font-normal ml-1">
                        ({extraGuestsCount} × ${extraGuestPrice})
                      </span>
                    </span>
                  } />
                )}
                {travelFee > 0 && (
                  <InfoRow label="Travel Fee" value={<span className="text-amber-600">+${travelFee.toFixed(2)}</span>} />
                )}
                {weekendFee > 0 && (
                  <InfoRow label="Weekend Fee" value={<span className="text-amber-600">+${weekendFee.toFixed(2)}</span>} />
                )}
                {additionalServiceFee > 0 && (
                  <InfoRow label="Extra Service Time" value={
                    <span className="text-amber-600">
                      +${additionalServiceFee.toFixed(2)}
                      {additionalServiceMins > 0 && <span className="text-[10px] text-gray-400 font-normal ml-1">({additionalServiceMins} min)</span>}
                    </span>
                  } />
                )}
                {extraTimeFee > 0 && (
                  <InfoRow label="Overtime Fee" value={<span className="text-amber-600">+${extraTimeFee.toFixed(2)}</span>} />
                )}
                {additionalStopsFee > 0 && (
                  <InfoRow label="Multi-Location Fee" value={<span className="text-amber-600">+${additionalStopsFee.toFixed(2)}</span>} />
                )}
                {additionalVehicleFee > 0 && (
                  <InfoRow label="Additional Vehicle" value={<span className="text-amber-600">+${additionalVehicleFee.toFixed(2)}</span>} />
                )}
                <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-black text-navy">${total.toFixed(2)}</span>
                </div>
              </div>
            );
          })()}


          {/* Internal Notes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black text-navy uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-coral" /> Internal Notes
              </h2>
              <button onClick={() => setShowNoteBox(v => !v)} className="text-xs font-bold text-coral">
                {showNoteBox ? "Cancel" : "+ Add Note"}
              </button>
            </div>
            {showNoteBox && (
              <div className="mb-4">
                <textarea value={internalNote} onChange={e => setInternalNote(e.target.value)}
                  placeholder="Add an internal note (not visible to customers)…" rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral resize-none transition-colors" />
                <button onClick={() => updateStatus(booking.status)}
                  className="mt-2 px-4 py-2 bg-coral text-white rounded-xl text-xs font-bold hover:bg-coral-dark transition-colors">
                  Save Note
                </button>
              </div>
            )}
            {booking.internalNote
              ? <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-gray-700">{booking.internalNote}</div>
              : <p className="text-sm text-gray-400">No internal notes yet.</p>
            }
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-coral" /> Customer
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center font-black text-coral text-sm">
                {booking.customer?.firstName?.[0]}{booking.customer?.lastName?.[0]}
              </div>
              <div>
                <div className="font-black text-sm text-navy">{booking.customer?.firstName} {booking.customer?.lastName}</div>
                {booking.customer?.id && (
                  <Link href={`/admin/customers/${booking.customer.id}`} className="text-xs font-bold text-coral hover:underline">View Profile →</Link>
                )}
              </div>
            </div>
            <div className="space-y-2.5">
              <a href={`mailto:${booking.customer?.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-coral transition-colors">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{booking.customer?.email}</span>
              </a>
              <a href={`tel:${booking.customer?.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-coral transition-colors">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" /> {booking.customer?.phone}
              </a>
              {booking.city && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" /> {booking.city}, MA
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-3">Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-coral mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-navy">Booking Created</div>
                  <div className="text-[11px] text-gray-400">{booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "—"}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${booking.status !== "PENDING_REVIEW" ? "bg-emerald-500" : "bg-gray-200"}`} />
                <div>
                  <div className="text-xs font-bold text-navy">Status</div>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>{sc.label}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-3 flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-coral" /> Assignment
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Vehicle</label>
                <select 
                  value={selectedVehicle} 
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full text-sm border-gray-200 rounded-lg p-2 focus:ring-coral focus:border-coral"
                >
                  <option value="">-- Select Vehicle --</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Driver</label>
                <select 
                  value={selectedDriver} 
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full text-sm border-gray-200 rounded-lg p-2 focus:ring-coral focus:border-coral"
                >
                  <option value="">-- Unassigned --</option>
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={saveAssignment} 
                disabled={assignLoading || !selectedVehicle}
                className="w-full py-2 mt-2 bg-navy text-white rounded-lg text-xs font-bold hover:bg-navy-light disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {assignLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-navy text-lg flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-coral" /> Edit Details
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-red-500">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Date</label>
                  <input type="date" value={editData.eventDate} onChange={(e) => setEditData({...editData, eventDate: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Time</label>
                  <input type="time" value={editData.startTime} onChange={(e) => setEditData({...editData, startTime: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Duration (Mins)</label>
                  <input type="number" value={editData.durationMins} onChange={(e) => setEditData({...editData, durationMins: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Guests</label>
                  <input type="number" value={editData.guests} onChange={(e) => setEditData({...editData, guests: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Address</label>
                  <input type="text" value={editData.address} onChange={(e) => setEditData({...editData, address: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">City</label>
                    <input type="text" value={editData.city} onChange={(e) => setEditData({...editData, city: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">Zip Code</label>
                    <input type="text" value={editData.zip} onChange={(e) => setEditData({...editData, zip: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Customer Notes</label>
                  <textarea rows={3} value={editData.notes} onChange={(e) => setEditData({...editData, notes: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm resize-none" />
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button onClick={() => setShowEditModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={saveEdit} disabled={saveEditLoading} className="px-5 py-2.5 text-sm font-bold bg-coral text-white rounded-xl hover:bg-coral-dark disabled:opacity-50 flex items-center gap-2">
                {saveEditLoading && <Loader2 className="w-4 h-4 animate-spin" />} Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
