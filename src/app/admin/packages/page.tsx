"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Package, Plus, Loader2, DollarSign, Users, Clock, Edit2, Trash2,
  X, Save, RefreshCw, CheckCircle2, Image as ImageIcon, Box, LayoutGrid
} from "lucide-react";

type Pkg = {
  id: string; name: string; description: string; serviceType: string;
  price: number; servings: number; extraPiecePrice: number; extraGuestPrice: number;
  durationMins: number; features: any; imageUrl: string;
  isActive: boolean; sortOrder: number; badge?: string | null;
};

type MediaItem = { id: string; url: string; filename: string; mimeType: string; size: number };

function MediaPickerModal({ onClose, onSelect }: { onClose: () => void, onSelect: (url: string) => void }) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/upload").then(r => r.json()).then(j => {
      if (j.success) setMedia(j.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-black text-navy text-lg flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Select Image from Library</h3>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-gray-100"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
          ) : media.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No media found. Go to Media Library to upload.</div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {media.map(m => (
                <div key={m.id} onClick={() => onSelect(m.url)}
                  className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-coral transition-colors aspect-square">
                  <img src={m.url} alt={m.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PackageModal({ pkg, onClose, onSaved }: { pkg?: Pkg, onClose: () => void, onSaved: (p: Pkg) => void }) {
  const isEdit = !!pkg;
  const [form, setForm] = useState({
    name: pkg?.name || "", description: pkg?.description || "",
    serviceType: pkg?.serviceType || "AMERICANO_TRUCK",
    price: pkg?.price || 0, servings: pkg?.servings || 0,
    durationMins: pkg?.durationMins || 60,
    extraPiecePrice: pkg?.extraPiecePrice || 0,
    extraGuestPrice: pkg?.extraGuestPrice || 0,
    imageUrl: pkg?.imageUrl || "", badge: pkg?.badge || "",
    isActive: pkg !== undefined ? pkg.isActive : true,
    sortOrder: pkg?.sortOrder || 0,
    features: (pkg?.features ? (typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features) : []).join("\n")
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showMedia, setShowMedia] = useState(false);

  const save = async () => {
    if (!form.name.trim()) { setError("Name is required."); return; }
    setSaving(true); setError("");
    try {
      const payload = { ...form, features: form.features.split("\n").filter((x: string) => x.trim()) };
      const url = isEdit ? `/api/admin/packages/${pkg.id}` : "/api/admin/packages";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save");
      onSaved(isEdit ? { ...pkg!, ...json.data } : json.data);
    } catch (e: any) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  return (
    <>
      {showMedia && <MediaPickerModal onClose={() => setShowMedia(false)} onSelect={(url) => { setForm(p => ({ ...p, imageUrl: url })); setShowMedia(false); }} />}
      
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 py-10" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-full flex flex-col" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xl font-black text-navy">{isEdit ? "Edit Package" : "Create Package"}</h2>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100"><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-gray-50/30">
            {error && <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-xl">{error}</div>}
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Package Name</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
                  <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Service Type</label>
                    <select value={form.serviceType} onChange={e => setForm(p => ({ ...p, serviceType: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white">
                      <option value="AMERICANO_TRUCK">Americano Truck</option>
                      <option value="CART">Ice Cream Cart</option>
                      <option value="STAND">Ice Cream Stand</option>
                      <option value="CLASSIC_TRUCK">Classic Truck</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Badge (Optional)</label>
                    <input value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} placeholder="e.g. Most Popular"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Features (One per line)</label>
                  <textarea value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} rows={5}
                    placeholder="Premium Ice Cream\nProfessional Server\nCustom Music..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white resize-y font-mono" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Base Price ($)</label>
                    <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Base Guests</label>
                    <input type="number" value={form.servings} onChange={e => setForm(p => ({ ...p, servings: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Duration (Mins)</label>
                    <input type="number" value={form.durationMins} onChange={e => setForm(p => ({ ...p, durationMins: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Extra Guest Price ($)</label>
                    <input type="number" value={form.extraGuestPrice} onChange={e => setForm(p => ({ ...p, extraGuestPrice: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white" />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Package Image</label>
                    <button onClick={() => setShowMedia(true)} className="text-xs font-bold text-coral flex items-center gap-1 hover:underline">
                      <LayoutGrid className="w-3.5 h-3.5" /> Browse Library
                    </button>
                  </div>
                  <input value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white" />
                  {form.imageUrl && (
                    <div className="mt-3 aspect-video bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative">
                      <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-coral" />
                    <span className="text-sm font-bold text-navy">Active (Visible to customers)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-navy">
                    Sort Order: <input type="number" value={form.sortOrder} onChange={e => setForm(p => ({ ...p, sortOrder: Number(e.target.value) }))} className="w-16 px-2 py-1 border border-gray-200 rounded outline-none" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isEdit ? "Save Changes" : "Create Package"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState<Pkg | "NEW" | null>(null);
  const [toast, setToast] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages");
      const json = await res.json();
      setPackages(Array.isArray(json.data) ? json.data : []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleDelete = async (p: Pkg) => {
    if (!confirm(`Delete ${p.name}? This will mark it as inactive and hide it from the public.`)) return;
    try {
      const res = await fetch(`/api/admin/packages/${p.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setPackages(prev => prev.filter(x => x.id !== p.id));
        showToast("Package deleted successfully");
      } else {
        alert(json.error || "Failed to delete");
      }
    } catch (e: any) { alert(e.message || "Failed to delete"); }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-navy text-white text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}
      {editTarget && (
        <PackageModal 
          pkg={editTarget === "NEW" ? undefined : editTarget} 
          onClose={() => setEditTarget(null)} 
          onSaved={(p) => {
            if (editTarget === "NEW") {
              setPackages(prev => [...prev, p].sort((a,b) => a.sortOrder - b.sortOrder));
              showToast("Package created");
            } else {
              setPackages(prev => prev.map(x => x.id === p.id ? p : x).sort((a,b) => a.sortOrder - b.sortOrder));
              showToast("Package updated");
            }
            setEditTarget(null);
          }} 
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Packages</h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Manage event packages, pricing tiers, and media</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadData} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-navy hover:border-gray-200 shadow-sm transition-all hover:-translate-y-0.5">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setEditTarget("NEW")}
            className="flex items-center gap-2 px-5 py-3 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Add Package
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32"><Loader2 className="w-10 h-10 animate-spin text-coral" /></div>
      ) : packages.length === 0 ? (
        <div className="text-center py-32 bg-white/50 backdrop-blur-md rounded-3xl border border-gray-100/50 border-dashed">
          <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-5">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <p className="font-black text-gray-500 text-lg tracking-tight mb-2">No packages configured</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(p => (
            <div key={p.id} className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group hover:shadow-lg hover:border-gray-200 transition-all hover:-translate-y-1">
              <div className="aspect-[16/10] bg-gray-50 relative overflow-hidden">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100/50"><ImageIcon className="w-8 h-8 text-gray-300" /></div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  {p.badge && <span className="bg-coral text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_4px_10px_rgb(255,111,97,0.3)]">{p.badge}</span>}
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border ${p.isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-gray-500/10 text-gray-600 border-gray-500/20 backdrop-blur-md'}`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-black text-xl text-navy mb-2">{p.name}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-1 line-clamp-2">{p.description}</p>
                
                <div className="space-y-4 mb-6 bg-gray-50/50 rounded-2xl p-5 border border-gray-100/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wider text-[10px]"><DollarSign className="w-4 h-4"/> Base Price</span>
                    <span className="font-black text-navy bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">${p.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wider text-[10px]"><Users className="w-4 h-4"/> Base Guests</span>
                    <span className="font-black text-navy bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{p.servings}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wider text-[10px]"><Clock className="w-4 h-4"/> Duration</span>
                    <span className="font-black text-navy bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{p.durationMins} min</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setEditTarget(p)}
                    className="flex items-center justify-center gap-2 py-3 bg-white text-gray-600 rounded-xl text-sm font-black hover:text-blue-500 transition-colors border border-gray-200 shadow-sm hover:border-blue-200 hover:bg-blue-50">
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handleDelete(p)}
                    className="flex items-center justify-center gap-2 py-3 bg-white text-gray-600 rounded-xl text-sm font-black hover:text-red-500 transition-colors border border-gray-200 shadow-sm hover:border-red-200 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
