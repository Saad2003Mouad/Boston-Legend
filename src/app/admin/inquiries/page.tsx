"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Search, Mail, Phone, Loader2, RefreshCw, MessageSquare,
  AlertCircle, User, Flag, ChevronRight, Tag, X, CheckCircle, Clock,
  Calendar, FileText, Send
} from "lucide-react";

type Inquiry = {
  id: string; name: string; email: string; phone?: string;
  eventType?: string; eventDate?: string; guestCount?: number;
  notes?: string; status: string; priority: string;
  createdAt: string; source: string;
  assignedTo?: { id: string; name: string } | null;
  internalNote?: string | null;
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  NEW:        { label: "New",         bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  IN_PROGRESS:{ label: "In Progress", bg: "#FFFBEB", text: "#D97706", border: "#FDE68A" },
  RESPONDED:  { label: "Responded",   bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  CLOSED:     { label: "Closed",      bg: "#F8FAFC", text: "#64748B", border: "#E2E8F0" },
  READ:       { label: "Read",        bg: "#F8FAFC", text: "#64748B", border: "#E2E8F0" },
};

const PRIORITY_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  LOW:    { label: "Low",    bg: "#F1F5F9", text: "#64748B", dot: "bg-slate-400" },
  MEDIUM: { label: "Medium", bg: "#EFF6FF", text: "#2563EB", dot: "bg-blue-500" },
  HIGH:   { label: "High",   bg: "#FFFBEB", text: "#D97706", dot: "bg-amber-500" },
  URGENT: { label: "Urgent", bg: "#FEF2F2", text: "#DC2626", dot: "bg-red-500" },
};

function DetailPanel({ inquiry, users, onClose, onUpdated }: {
  inquiry: Inquiry; users: { id: string; name: string }[];
  onClose: () => void; onUpdated: (i: Inquiry) => void;
}) {
  const [status, setStatus]           = useState(inquiry.status);
  const [priority, setPriority]       = useState(inquiry.priority);
  const [assignedToId, setAssignedToId] = useState(inquiry.assignedTo?.id || "");
  const [internalNote, setInternalNote] = useState(inquiry.internalNote || "");
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, priority, assignedToId: assignedToId || null, internalNote }),
      });
      const json = await res.json();
      if (json.success) {
        onUpdated(json.data);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally { setSaving(false); }
  };

  const sc = STATUS_CONFIG[status] ?? STATUS_CONFIG.NEW;
  const pc = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.MEDIUM;

  return (
    <div className="w-96 flex-shrink-0 border-l border-gray-100 flex flex-col bg-white">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="font-black text-navy text-sm">Inquiry Details</div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Sender */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center font-black text-coral">
            {inquiry.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-navy text-sm">{inquiry.name}</div>
            <div className="text-xs text-gray-400 font-medium">{inquiry.source?.replace("_", " ")}</div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2 bg-gray-50 rounded-xl p-4">
          <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2.5 text-xs font-bold text-navy hover:text-coral transition-colors">
            <Mail className="w-4 h-4 text-gray-400" /> {inquiry.email}
          </a>
          {inquiry.phone && (
            <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2.5 text-xs font-bold text-navy hover:text-coral transition-colors">
              <Phone className="w-4 h-4 text-gray-400" /> {inquiry.phone}
            </a>
          )}
        </div>

        {/* Event details */}
        {(inquiry.eventType || inquiry.eventDate || inquiry.guestCount) && (
          <div className="space-y-2">
            <div className="text-xs font-black text-gray-400 uppercase tracking-wider">Event Details</div>
            <div className="space-y-1.5">
              {inquiry.eventType && <div className="flex items-center justify-between text-xs"><span className="text-gray-400 flex items-center gap-1.5"><Tag className="w-3 h-3" /> Type</span><span className="font-bold text-navy">{inquiry.eventType}</span></div>}
              {inquiry.eventDate && <div className="flex items-center justify-between text-xs"><span className="text-gray-400 flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Date</span><span className="font-bold text-navy">{new Date(inquiry.eventDate).toLocaleDateString()}</span></div>}
              {inquiry.guestCount && <div className="flex items-center justify-between text-xs"><span className="text-gray-400 flex items-center gap-1.5"><User className="w-3 h-3" /> Guests</span><span className="font-bold text-navy">{inquiry.guestCount}</span></div>}
            </div>
          </div>
        )}

        {/* Message */}
        {inquiry.notes && (
          <div className="space-y-2">
            <div className="text-xs font-black text-gray-400 uppercase tracking-wider">Message</div>
            <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 leading-relaxed">{inquiry.notes}</div>
          </div>
        )}

        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-coral bg-white">
              {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-coral bg-white">
              {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        {/* Assign to */}
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Assigned To</label>
          <select value={assignedToId} onChange={e => setAssignedToId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-coral bg-white">
            <option value="">— Unassigned —</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>

        {/* Internal Note */}
        <div>
          <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Internal Note</label>
          <textarea value={internalNote} onChange={e => setInternalNote(e.target.value)}
            rows={3} placeholder="Add a private note for the team…"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-coral resize-none" />
        </div>
      </div>

      <div className="p-5 border-t border-gray-100 flex items-center gap-3">
        <a href={`mailto:${inquiry.email}?subject=Re: Your Inquiry`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-coral hover:text-coral transition-colors">
          <Mail className="w-3.5 h-3.5" /> Reply via Email
        </a>
        <button onClick={save} disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-coral text-white rounded-xl text-xs font-bold hover:bg-coral-dark disabled:opacity-60">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selected, setSelected]   = useState<Inquiry | null>(null);
  const [users, setUsers]         = useState<{ id: string; name: string }[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [inqRes, usrRes] = await Promise.all([
        fetch("/api/admin/inquiries"),
        fetch("/api/admin/users"),
      ]);
      const inqJson = await inqRes.json();
      const usrJson = await usrRes.json();
      setInquiries(Array.isArray(inqJson.data) ? inqJson.data : []);
      setUsers((usrJson.data || []).map((u: any) => ({ id: u.id, name: u.name })));
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = inquiries.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${i.name} ${i.email} ${i.phone || ""} ${i.notes || ""}`.toLowerCase().includes(q);
    const matchStatus = filterStatus === "ALL" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = { ALL: inquiries.length, NEW: 0, IN_PROGRESS: 0, RESPONDED: 0, CLOSED: 0, READ: 0 };
  inquiries.forEach(i => { if (counts[i.status as keyof typeof counts] !== undefined) counts[i.status as keyof typeof counts]++; });

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-0 -m-6 overflow-hidden bg-gray-50/30">
      {/* Main List */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 md:p-8 space-y-5 border-b border-gray-100/80 bg-white/70 backdrop-blur-xl shadow-sm z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-navy tracking-tight">Contact Inquiries</h1>
              <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">{inquiries.length} total messages</p>
            </div>
            <button onClick={load} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-black text-gray-600 hover:border-gray-200 hover:text-navy shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-0.5 transition-all">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search inquiries…"
                className="w-full pl-11 pr-4 py-2.5 border-none bg-gray-50/80 hover:bg-gray-50 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 transition-all text-navy placeholder:text-gray-400 placeholder:font-semibold" />
            </div>
            <div className="flex gap-2 p-1 bg-gray-100/50 rounded-2xl overflow-x-auto custom-scrollbar border border-gray-100">
              {(["ALL", "NEW", "IN_PROGRESS", "RESPONDED", "CLOSED"] as const).map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${filterStatus === s ? "bg-navy text-white shadow-md shadow-navy/20" : "text-gray-500 hover:text-navy hover:bg-gray-200/50"}`}>
                  {s === "ALL" ? `All (${counts.ALL})` : `${STATUS_CONFIG[s]?.label || s} (${counts[s] || 0})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-transparent p-4 md:p-6 custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="font-black text-gray-500 text-lg tracking-tight">No inquiries found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(i => {
                const sc = STATUS_CONFIG[i.status] ?? STATUS_CONFIG.NEW;
                const pc = PRIORITY_CONFIG[i.priority] ?? PRIORITY_CONFIG.MEDIUM;
                return (
                  <div key={i.id}
                    onClick={() => setSelected(i)}
                    className={`p-5 rounded-2xl transition-all cursor-pointer group border ${selected?.id === i.id ? "bg-white border-coral shadow-[0_8px_30px_rgb(255,111,97,0.12)] scale-[1.01]" : "bg-white/70 backdrop-blur-md border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs flex-shrink-0 shadow-inner ${selected?.id === i.id ? "bg-coral text-white" : "bg-coral/10 border border-coral/20 text-coral"}`}>
                          {i.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-black text-sm text-navy">{i.name}</div>
                          <div className="text-[11px] font-bold text-gray-400 mt-0.5">{new Date(i.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm"
                          style={{ background: pc.bg, color: pc.text }}>
                          <div className={`w-2 h-2 rounded-full ${pc.dot} shadow-sm`} /> {pc.label}
                        </span>
                        <span className="inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm border"
                          style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>
                          {sc.label}
                        </span>
                      </div>
                    </div>
                    {i.notes && (
                      <p className="text-sm font-medium text-gray-500 line-clamp-2 ml-[56px] leading-relaxed">{i.notes}</p>
                    )}
                    <div className="flex items-center gap-4 ml-[56px] mt-3">
                      <span className="text-[11px] font-bold text-gray-400 hover:text-coral transition-colors flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {i.email}</span>
                      {i.assignedTo && (
                        <span className="text-[11px] font-black text-blue-500 flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md"><User className="w-3.5 h-3.5" /> {i.assignedTo.name}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <DetailPanel
          inquiry={selected}
          users={users}
          onClose={() => setSelected(null)}
          onUpdated={updated => {
            setInquiries(prev => prev.map(i => i.id === updated.id ? { ...i, ...updated } : i));
            setSelected({ ...selected, ...updated });
          }}
        />
      )}
    </div>
  );
}
