"use client";
import { useState, useEffect, useCallback } from "react";
import {
  MapPin, Plus, Search, Trash2, ToggleLeft, ToggleRight,
  Download, Upload, Loader2, CheckCircle2, AlertCircle,
  X, RefreshCw, Edit2, Save, EyeOff, Eye
} from "lucide-react";

type ZipRecord = {
  id: string;
  zip: string;
  city: string;
  county: string | null;
  isActive: boolean;
  notes: string | null;
  createdAt: string;
};

const FN = "'Inter','Nunito',sans-serif";

function Toast({ type, msg, onClose }: { type: "success" | "error"; msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-bold border ${type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"}`}>
      {type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
      {msg}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X className="w-3 h-3" /></button>
    </div>
  );
}

function AddZipModal({ onAdd, onClose }: { onAdd: (zip: string, city: string, county: string, notes: string) => Promise<void>; onClose: () => void }) {
  const [zip, setZip]       = useState("");
  const [city, setCity]     = useState("");
  const [county, setCounty] = useState("");
  const [notes, setNotes]   = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  const handle = async () => {
    if (!/^\d{5}$/.test(zip)) { setErr("ZIP must be exactly 5 digits"); return; }
    if (!city.trim()) { setErr("City is required"); return; }
    setSaving(true); setErr("");
    try { await onAdd(zip, city, county, notes); onClose(); }
    catch (e: any) { setErr(e.message || "Failed to add ZIP"); }
    finally { setSaving(false); }
  };

  const inCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-gray-100 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-navy">Add ZIP Code</h2>
            <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">Add a Massachusetts service area ZIP</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="px-6 py-6 space-y-4 bg-gray-50/30">
          {err && <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm font-bold"><AlertCircle className="w-4 h-4 shrink-0" />{err}</div>}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">ZIP Code *</label>
            <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="02115" maxLength={5} className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">City / Neighborhood *</label>
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="Boston (Fenway)" className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">County</label>
            <input value={county} onChange={e => setCounty(e.target.value)} placeholder="Suffolk" className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Notes (optional)</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special notes or conditions" className={inCls} />
          </div>
        </div>
        <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handle} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black bg-coral text-white hover:bg-coral-dark shadow-md disabled:opacity-50 transition-all">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {saving ? "Adding…" : "Add ZIP Code"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ record, onSave, onClose }: { record: ZipRecord; onSave: (id: string, data: Partial<ZipRecord>) => Promise<void>; onClose: () => void }) {
  const [city, setCity]     = useState(record.city);
  const [county, setCounty] = useState(record.county || "");
  const [notes, setNotes]   = useState(record.notes || "");
  const [saving, setSaving] = useState(false);

  const handle = async () => {
    setSaving(true);
    try { await onSave(record.id, { city, county: county || null, notes: notes || null }); onClose(); }
    finally { setSaving(false); }
  };

  const inCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-gray-100 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-navy">Edit ZIP {record.zip}</h2>
            <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">Update service area details</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="px-6 py-6 space-y-4 bg-gray-50/30">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">City / Neighborhood *</label>
            <input value={city} onChange={e => setCity(e.target.value)} className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">County</label>
            <input value={county} onChange={e => setCounty(e.target.value)} placeholder="Suffolk" className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Notes</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special notes" className={inCls} />
          </div>
        </div>
        <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handle} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black bg-coral text-white hover:bg-coral-dark shadow-md disabled:opacity-50 transition-all">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServiceAreasPage() {
  const [records, setRecords]     = useState<ZipRecord[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filterActive, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [showAdd, setShowAdd]     = useState(false);
  const [editRec, setEditRec]     = useState<ZipRecord | null>(null);
  const [toast, setToast]         = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [seeding, setSeeding]     = useState(false);
  const [bulkWorking, setBulkWorking] = useState(false);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/service-areas");
      const data = await res.json();
      setRecords(data.data || []);
    } catch {
      showToast("error", "Failed to load service areas");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const filtered = records.filter(r => {
    const matchSearch = !search || r.zip.includes(search) || r.city.toLowerCase().includes(search.toLowerCase()) || (r.county || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterActive === "all" || (filterActive === "active" ? r.isActive : !r.isActive);
    return matchSearch && matchFilter;
  });

  const activeCount   = records.filter(r => r.isActive).length;
  const inactiveCount = records.length - activeCount;

  const handleAdd = async (zip: string, city: string, county: string, notes: string) => {
    const res = await fetch("/api/admin/service-areas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zip, city, county, notes }),
    });
    if (!res.ok) {
      const d = await res.json();
      throw new Error(d.error || "Failed to add");
    }
    await load();
    showToast("success", `ZIP code ${zip} added successfully`);
  };

  const handleToggle = async (rec: ZipRecord) => {
    await fetch(`/api/admin/service-areas/${rec.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !rec.isActive }),
    });
    setRecords(r => r.map(x => x.id === rec.id ? { ...x, isActive: !x.isActive } : x));
    showToast("success", `${rec.zip} ${rec.isActive ? "deactivated" : "activated"}`);
  };

  const handleEdit = async (id: string, data: Partial<ZipRecord>) => {
    await fetch(`/api/admin/service-areas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await load();
    showToast("success", "ZIP code updated");
  };

  const handleDelete = async (id: string, zip: string) => {
    const confirmed = window.confirm(
      `⚠️ PERMANENT DELETE\n\nAre you sure you want to permanently delete ZIP ${zip}?\n\nThis cannot be undone. Consider deactivating instead (toggle the status).`
    );
    if (!confirmed) return;
    await fetch(`/api/admin/service-areas/${id}`, { method: "DELETE" });
    setRecords(r => r.filter(x => x.id !== id));
    showToast("success", `ZIP ${zip} permanently deleted`);
  };

  // ─── BULK: DEFAULT ACTION = DEACTIVATE (safe), not delete ───────────────────
  const handleBulkDeactivate = async () => {
    if (!selected.size) return;
    setBulkWorking(true);
    try {
      await Promise.all(
        Array.from(selected).map(id =>
          fetch(`/api/admin/service-areas/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: false }),
          })
        )
      );
      setRecords(r => r.map(x => selected.has(x.id) ? { ...x, isActive: false } : x));
      showToast("success", `${selected.size} ZIP codes deactivated (not deleted)`);
      setSelected(new Set());
    } finally {
      setBulkWorking(false);
    }
  };

  const handleBulkActivate = async () => {
    if (!selected.size) return;
    setBulkWorking(true);
    try {
      await Promise.all(
        Array.from(selected).map(id =>
          fetch(`/api/admin/service-areas/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: true }),
          })
        )
      );
      setRecords(r => r.map(x => selected.has(x.id) ? { ...x, isActive: true } : x));
      showToast("success", `${selected.size} ZIP codes activated`);
      setSelected(new Set());
    } finally {
      setBulkWorking(false);
    }
  };

  // ─── BULK DELETE: requires double-confirm with typed phrase ──────────────────
  const handleBulkDelete = async () => {
    if (!selected.size) return;
    const phrase = window.prompt(
      `⚠️ DANGER ZONE — PERMANENT DELETE\n\nYou are about to PERMANENTLY DELETE ${selected.size} ZIP codes.\nThis action CANNOT be undone.\n\nConsider using "Deactivate Selected" instead.\n\nType DELETE to confirm:`
    );
    if (phrase !== "DELETE") {
      if (phrase !== null) showToast("error", 'Type DELETE exactly to confirm. Action cancelled.');
      return;
    }
    setBulkWorking(true);
    try {
      await fetch("/api/admin/service-areas", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      setRecords(r => r.filter(x => !selected.has(x.id)));
      setSelected(new Set());
      showToast("success", `${selected.size} ZIP codes permanently deleted`);
    } finally {
      setBulkWorking(false);
    }
  };

  const handleSeed = async () => {
    if (!confirm("This will import all ZIP codes from the default Massachusetts list. Existing ZIPs will not be overwritten. Continue?")) return;
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/service-areas/seed", { method: "POST" });
      const d = await res.json();
      await load();
      showToast("success", d.message || "Seed complete");
    } catch {
      showToast("error", "Seed failed");
    } finally {
      setSeeding(false);
    }
  };

  const exportCsv = () => {
    const rows = [["ZIP", "City", "County", "Active", "Notes"], ...records.map(r => [r.zip, r.city, r.county || "", r.isActive ? "Yes" : "No", r.notes || ""])];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "service-areas.csv"; a.click();
    URL.revokeObjectURL(url);
    showToast("success", "CSV exported");
  };

  const toggleSelect = (id: string) => {
    setSelected(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(r => r.id)));
  };

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} msg={toast.msg} onClose={() => setToast(null)} />}
      {showAdd && <AddZipModal onAdd={handleAdd} onClose={() => setShowAdd(false)} />}
      {editRec && <EditModal record={editRec} onSave={handleEdit} onClose={() => setEditRec(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Service Areas</h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Manage Massachusetts ZIP codes</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={handleSeed} disabled={seeding} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-navy hover:border-gray-200 shadow-sm transition-all hover:-translate-y-0.5 disabled:opacity-50">
            {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {seeding ? "Seeding…" : "Seed MA Defaults"}
          </button>
          <button onClick={exportCsv} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-navy hover:border-gray-200 shadow-sm transition-all hover:-translate-y-0.5">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-3 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Add ZIP Code
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total ZIPs", value: records.length, color: "text-navy", bg: "bg-navy/5" },
          { label: "Active", value: activeCount, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Inactive", value: inactiveCount, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map(s => (
          <div key={s.label} className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex items-center gap-5 hover:shadow-md hover:bg-white transition-all hover:-translate-y-1">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 ${s.bg} ${s.color}`}>
              {s.value}
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ZIP, city, or county…"
            className="w-full pl-11 pr-5 py-3 rounded-2xl border border-gray-100 bg-white font-semibold text-sm outline-none transition-all placeholder:text-gray-400 focus:border-coral focus:ring-4 focus:ring-coral/10" />
        </div>
        <div className="flex gap-1 bg-gray-50/50 border border-gray-100 rounded-2xl p-1 shrink-0 w-full md:w-auto overflow-x-auto">
          {(["all", "active", "inactive"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-xs font-black capitalize transition-all shrink-0 ${filterActive === f ? 'bg-white text-navy shadow-sm border border-gray-100' : 'text-gray-500 hover:text-navy hover:bg-gray-100/50'}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={load} className="p-3 rounded-2xl border border-gray-100 hover:border-gray-300 text-gray-400 hover:text-gray-600 transition-all shrink-0 bg-white shadow-sm">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 bg-amber-50/80 border border-amber-200/60 rounded-3xl animate-in slide-in-from-top-2 duration-200 shadow-sm backdrop-blur-xl">
          <span className="text-sm font-black text-amber-900">{selected.size} selected</span>

          {/* Primary: Deactivate (safe) */}
          <button onClick={handleBulkDeactivate} disabled={bulkWorking}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border border-amber-300 text-amber-800 hover:bg-amber-100 transition-colors disabled:opacity-50 bg-white shadow-sm">
            {bulkWorking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <EyeOff className="w-3.5 h-3.5" />}
            Deactivate
          </button>

          {/* Secondary: Activate */}
          <button onClick={handleBulkActivate} disabled={bulkWorking}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors disabled:opacity-50 bg-white shadow-sm">
            {bulkWorking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
            Activate
          </button>

          {/* Danger: Delete (requires typed confirm) */}
          <button onClick={handleBulkDelete} disabled={bulkWorking}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 bg-white shadow-sm">
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>

          <button onClick={() => setSelected(new Set())} className="ml-auto text-amber-700 hover:text-amber-900 text-xs font-black uppercase tracking-wider bg-amber-100/50 px-3 py-1.5 rounded-lg">Clear</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-5 text-left w-12">
                  <input type="checkbox" checked={filtered.length > 0 && selected.size === filtered.length}
                    onChange={toggleAll} className="w-4 h-4 rounded accent-coral cursor-pointer" />
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-500">ZIP</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-500">City / Neighborhood</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">County</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Notes</th>
                <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white/50">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-16"><Loader2 className="w-8 h-8 animate-spin mx-auto text-coral" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-20">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                      <MapPin className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="font-black text-gray-500 text-lg">No ZIP codes found</p>
                    <p className="text-sm text-gray-400 font-medium mt-1">Click "Seed MA Defaults" to import the default Massachusetts list</p>
                  </td>
                </tr>
              ) : filtered.map(r => (
                <tr key={r.id} className={`hover:bg-gray-50 transition-colors ${selected.has(r.id) ? "bg-amber-50/30" : ""}`}>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)}
                      className="w-4 h-4 rounded accent-coral cursor-pointer" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-black text-sm text-navy bg-gray-100/80 px-2 py-1 rounded-md">{r.zip}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-navy">{r.city}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs font-semibold text-gray-500">{r.county || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleToggle(r)} title={r.isActive ? "Click to deactivate" : "Click to activate"} className="flex items-center gap-2 group">
                      {r.isActive
                        ? <><ToggleRight className="w-6 h-6 text-emerald-500 group-hover:text-emerald-600 transition-colors drop-shadow-sm" /><span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">Active</span></>
                        : <><ToggleLeft className="w-6 h-6 text-gray-300 group-hover:text-gray-400 transition-colors" /><span className="text-[10px] font-black uppercase tracking-wider text-gray-500 bg-gray-500/10 border border-gray-500/20 px-2.5 py-1 rounded-lg">Inactive</span></>
                      }
                    </button>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-xs text-gray-400 font-semibold truncate max-w-48 block">{r.notes || "—"}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditRec(r)} title="Edit" className="p-2 rounded-xl hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(r.id, r.zip)} title="Permanent delete" className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Showing {filtered.length} of {records.length} ZIPs
            </span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
              {activeCount} active
            </span>
          </div>
        )}
      </div>

      {/* Safety info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-4 px-6 py-5 bg-emerald-50/50 border border-emerald-100/60 rounded-3xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-black text-emerald-900">Safe Way to Remove: Deactivate</p>
            <p className="text-xs font-medium text-emerald-700 mt-1 leading-relaxed">
              Toggle or bulk-deactivate ZIPs to hide them from customers. The record stays in DB. You can reactivate at any time.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 px-6 py-5 bg-blue-50/50 border border-blue-100/60 rounded-3xl">
          <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-black text-blue-900">Coverage Note</p>
            <p className="text-xs font-medium text-blue-700 mt-1 leading-relaxed">
              Default seed covers <strong>Greater Boston + surrounding MA cities</strong> (~120 ZIPs). Add more manually or import a full MA list.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
