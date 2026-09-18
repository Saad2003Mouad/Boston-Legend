"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Shield, Mail, Loader2, Plus, Edit2, AlertCircle, Trash2,
  CheckCircle, XCircle, Search, RefreshCw, X, Save, ChevronDown
} from "lucide-react";
import { useSession } from "next-auth/react";
import { ROLE_PERMISSIONS, Permission } from "@/lib/permissions";

type User = {
  id: string; name: string; email: string;
  role: string; permissions: string[];
  active: boolean; createdAt: string;
};

const ROLE_COLORS: Record<string, string> = {
  OWNER:      "bg-purple-50 text-purple-700 border-purple-200",
  ADMIN:      "bg-blue-50 text-blue-700 border-blue-200",
  DISPATCHER: "bg-amber-50 text-amber-700 border-amber-200",
  DRIVER:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  SUPPORT:    "bg-slate-100 text-slate-600 border-slate-200",
  VIEWER:     "bg-gray-100 text-gray-500 border-gray-200",
};

const ALL_ROLES = ["OWNER", "ADMIN", "DISPATCHER", "DRIVER", "SUPPORT", "VIEWER"] as const;
const ALL_PERMISSIONS = Object.keys(ROLE_PERMISSIONS.OWNER) as unknown as string[];

function EditModal({ user, currentUserRole, onClose, onSaved }: {
  user: User; currentUserRole: string; onClose: () => void; onSaved: (u: User) => void;
}) {
  const [form, setForm] = useState({ name: user.name, role: user.role, active: user.active, permissions: user.permissions || [] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true); setError("");
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save");
      onSaved(json.data);
    } catch (e: any) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  const togglePerm = (p: string) => {
    setForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(p)
        ? prev.permissions.filter(x => x !== p)
        : [...prev.permissions, p],
    }));
  };

  const rolePerms = ROLE_PERMISSIONS[form.role] || [];
  const inCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden border border-gray-100 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-navy">Edit User</h2>
            <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">{user.email}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto bg-gray-50/30">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>
          )}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Display Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Role</label>
            <select value={form.role}
              disabled={currentUserRole !== "OWNER"}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className={`${inCls} disabled:opacity-60`}>
              {ALL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <p className="text-xs font-semibold text-gray-400 mt-2">Role provides base permissions. Custom permissions below extend the role.</p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
            <select value={form.active ? "1" : "0"} onChange={e => setForm(p => ({ ...p, active: e.target.value === "1" }))}
              className={inCls}>
              <option value="1">Active</option>
              <option value="0">Deactivated</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
              Custom Extra Permissions
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 bg-white p-3 rounded-xl border border-gray-200">
              {(ROLE_PERMISSIONS.OWNER as string[]).map((p) => {
                const isBase = (rolePerms as string[]).includes(p);
                const isChecked = form.permissions.includes(p) || isBase;
                return (
                  <label key={p} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${isBase ? "bg-gray-50 opacity-60" : "hover:bg-blue-50/60"}`}>
                    <input type="checkbox" checked={isChecked} disabled={isBase}
                      onChange={() => !isBase && togglePerm(p)}
                      className="rounded accent-coral w-4 h-4 border-gray-300" />
                    <span className="text-xs font-bold text-gray-700 font-mono">{p}</span>
                    {isBase && <span className="ml-auto text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">ROLE</span>}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark transition-all disabled:opacity-60 shadow-md">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateModal({ currentUserRole, onClose, onCreated }: {
  currentUserRole: string; onClose: () => void; onCreated: (u: User) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "SUPPORT" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!form.name || !form.email || !form.password) { setError("Name, email and password are required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to create user");
      onCreated(json.data);
    } catch (e: any) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  const inCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-coral bg-white";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-black text-navy">Create Staff Member</h2>
            <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">Add a new user to the dashboard</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4 bg-gray-50/30">
          {error && <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Initial Password</label>
            <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className={inCls} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Role</label>
            <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className={inCls}>
              {ALL_ROLES.filter(r => currentUserRole === "OWNER" || r !== "OWNER").map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark transition-all disabled:opacity-60 shadow-md">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {saving ? "Creating…" : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers]       = useState<User[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showCreate, setShowCreate]   = useState(false);
  const [toast, setToast]       = useState("");
  const { data: session } = useSession();
  const currentRole = (session?.user as any)?.role || "VIEWER";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/users");
      const json = await res.json();
      setUsers(json.data || []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleDelete = async (u: User) => {
    if (!confirm(`Are you sure you want to deactivate ${u.name}? They will lose access immediately.`)) return;
    const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      setUsers(prev => prev.filter(x => x.id !== u.id));
      showToast(`${u.name} has been deactivated.`);
    } else {
      alert(json.error || "Failed to delete user");
    }
  };

  const handleToggleActive = async (u: User) => {
    const res = await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !u.active }),
    });
    const json = await res.json();
    if (json.success) {
      setUsers(prev => prev.map(x => x.id === u.id ? json.data : x));
      showToast(`${u.name} ${json.data.active ? "activated" : "deactivated"}.`);
    }
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return !q || `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {toast && (
        <div className="fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-xl bg-navy text-white text-sm font-bold animate-in fade-in slide-in-from-top-4">{toast}</div>
      )}
      {editingUser && (
        <EditModal
          user={editingUser}
          currentUserRole={currentRole}
          onClose={() => setEditingUser(null)}
          onSaved={updated => {
            setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u));
            setEditingUser(null);
            showToast("User updated successfully.");
          }}
        />
      )}
      {showCreate && (
        <CreateModal
          currentUserRole={currentRole}
          onClose={() => setShowCreate(false)}
          onCreated={newUser => {
            setUsers(prev => [newUser as User, ...prev]);
            setShowCreate(false);
            showToast("Staff member created.");
          }}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-coral drop-shadow-sm" /> Staff & Access Control
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">{users.length} team members</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-navy hover:border-gray-200 hover:shadow-sm transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all shadow-sm"
            />
          </div>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-5 py-3 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5 whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-32 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-coral" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-wider">Loading staff...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-32 flex flex-col items-center justify-center text-center bg-white/50 border-dashed border border-gray-100/50 m-6 rounded-3xl">
            <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center mb-5">
              <Shield className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-navy mb-1">No staff members found</h3>
            <p className="text-sm font-medium text-gray-500 mb-6">No users match your current filters or search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white/50">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy to-navy/80 text-white flex items-center justify-center font-black text-lg shadow-inner group-hover:scale-105 transition-transform flex-shrink-0">
                          {u.name?.[0]?.toUpperCase() || u.email?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-black text-base text-navy">{u.name || "Unnamed"}</div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-0.5">
                            <Mail className="w-3 h-3 text-gray-400" /> {u.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border shadow-sm ${ROLE_COLORS[u.role] ?? ROLE_COLORS.SUPPORT}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.active ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-200 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-gray-400" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleToggleActive(u)}
                          title={u.active ? "Deactivate" : "Activate"}
                          className={`p-2.5 rounded-xl transition-all ${u.active ? "text-amber-500 hover:bg-amber-50" : "text-emerald-500 hover:bg-emerald-50"}`}>
                          {u.active ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setEditingUser(u)}
                          className="p-2.5 rounded-xl text-blue-500 hover:bg-blue-50 transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {u.role !== "OWNER" && (
                          <button onClick={() => handleDelete(u)}
                            className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
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
