"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Truck, Wrench, CheckCircle2, Loader2, Plus, Edit2, Trash2,
  X, Save, RefreshCw, AlertCircle, MapPin, User
} from "lucide-react";

type Vehicle = {
  id: string; code: string; name: string; type: string;
  status: string; driver: string | null; location: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; dot: string; icon: any }> = {
  AVAILABLE:   { label: "Available",   color: "#059669", bg: "#ECFDF5", border: "#A7F3D0", dot: "bg-emerald-500", icon: CheckCircle2 },
  ON_JOB:      { label: "On Job",      color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", dot: "bg-blue-500",    icon: Truck },
  MAINTENANCE: { label: "Maintenance", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", dot: "bg-red-500",     icon: Wrench },
};

const VEHICLE_TYPES = ["STANDARD", "PREMIUM", "MINI"];
const STATUSES = ["AVAILABLE", "ON_JOB", "MAINTENANCE"];

function VehicleModal({ vehicle, onClose, onSaved }: {
  vehicle?: Vehicle; onClose: () => void; onSaved: (v: Vehicle) => void;
}) {
  const isEdit = !!vehicle;
  const [form, setForm] = useState({
    code: vehicle?.code || "",
    name: vehicle?.name || "",
    type: vehicle?.type || "STANDARD",
    status: vehicle?.status || "AVAILABLE",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!form.code.trim() || !form.name.trim()) { setError("Code and name are required."); return; }
    setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/vehicles/${vehicle!.id}` : "/api/admin/vehicles";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      onSaved(isEdit ? { ...vehicle!, ...json } : json);
    } catch (e: any) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-black text-navy">{isEdit ? "Edit Vehicle" : "Add Vehicle"}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          {error && <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-medium">{error}</div>}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Vehicle Code</label>
            <input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
              placeholder="e.g. ICE-01"
              disabled={isEdit}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral disabled:bg-gray-50 disabled:opacity-70 font-mono" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Vehicle Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Frosty Express"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white">
                {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white">
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s]?.label || s}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isEdit ? "Save Changes" : "Add Vehicle"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editTarget, setEditTarget]     = useState<Vehicle | undefined>(undefined);
  const [showCreate, setShowCreate]     = useState(false);
  const [toast, setToast]       = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/vehicles");
      const json = await res.json();
      setVehicles(Array.isArray(json) ? json : json.data || []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleDelete = async (v: Vehicle) => {
    if (!confirm(`Remove ${v.name} (${v.code}) from the fleet?`)) return;
    const res = await fetch(`/api/admin/vehicles/${v.id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      setVehicles(prev => prev.filter(x => x.id !== v.id));
      showToast(`${v.name} removed from fleet.`);
    } else {
      alert(json.error || "Failed to delete vehicle");
    }
  };

  const statusCounts = {
    AVAILABLE:   vehicles.filter(v => v.status === "AVAILABLE").length,
    ON_JOB:      vehicles.filter(v => v.status === "ON_JOB").length,
    MAINTENANCE: vehicles.filter(v => v.status === "MAINTENANCE").length,
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-navy text-white text-sm font-bold animate-in fade-in slide-in-from-top-4">{toast}</div>
      )}
      {(showCreate || editTarget) && (
        <VehicleModal
          vehicle={editTarget}
          onClose={() => { setShowCreate(false); setEditTarget(undefined); }}
          onSaved={saved => {
            if (editTarget) {
              setVehicles(prev => prev.map(v => v.id === saved.id ? { ...v, ...saved } : v));
              showToast(`${saved.name} updated.`);
            } else {
              setVehicles(prev => [...prev, saved]);
              showToast(`${saved.name} added to fleet.`);
            }
            setShowCreate(false); setEditTarget(undefined);
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Fleet Management</h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">{vehicles.length} vehicles total</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-navy hover:border-gray-200 shadow-sm transition-all hover:-translate-y-0.5">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-3 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.entries(statusCounts) as [string, number][]).map(([key, count]) => {
          const sc = STATUS_CONFIG[key];
          const Icon = sc.icon;
          return (
            <div key={key} className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex items-center gap-5 hover:shadow-md hover:bg-white transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform" style={{ background: sc.bg }}>
                <Icon className="w-7 h-7" style={{ color: sc.color }} />
              </div>
              <div>
                <div className="text-3xl font-black text-navy">{count}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">{sc.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32"><Loader2 className="w-10 h-10 animate-spin text-coral" /></div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-32 bg-white/50 backdrop-blur-md rounded-3xl border border-gray-100/50 border-dashed">
          <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-5">
            <Truck className="w-10 h-10 text-gray-300" />
          </div>
          <p className="font-black text-gray-500 text-lg tracking-tight mb-2">No vehicles in fleet</p>
          <button onClick={() => setShowCreate(true)} className="px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-black shadow-md hover:bg-coral-dark transition-colors">Add First Vehicle</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map(v => {
            const sc = STATUS_CONFIG[v.status] ?? STATUS_CONFIG.AVAILABLE;
            const Icon = sc.icon;
            return (
              <div key={v.id} className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 hover:shadow-lg hover:border-gray-200 transition-all hover:-translate-y-1 group">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <Truck className="w-7 h-7 text-navy/70" />
                    </div>
                    <div>
                      <div className="font-black text-base text-navy">{v.name}</div>
                      <div className="text-xs text-gray-400 font-mono font-bold mt-1 bg-gray-100/80 px-2 py-0.5 rounded-md inline-block">{v.code}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditTarget(v)} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(v)} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Type</span>
                    <span className="text-xs font-black text-navy bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{v.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Driver</span>
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-black text-navy">{v.driver || "Unassigned"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Location</span>
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-black text-navy">{v.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm border"
                    style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
                    <div className={`w-2 h-2 rounded-full ${sc.dot} shadow-sm`} />
                    {sc.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
