"use client";
import { useState, useEffect } from "react";
import { Plus, X, Loader2, Check, ChevronDown } from "lucide-react";

type Task = {
  id: string; title: string; description: string | null;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string | null;
  assignedTo?: { name: string } | null;
  createdAt: string;
};

const COLUMNS: { key: Task["status"]; label: string; color: string; bg: string }[] = [
  { key: "TODO",        label: "To Do",      color: "#6B7280", bg: "#F9FAFB" },
  { key: "IN_PROGRESS", label: "In Progress", color: "#2563EB", bg: "#EFF6FF" },
  { key: "REVIEW",      label: "In Review",   color: "#D97706", bg: "#FFFBEB" },
  { key: "DONE",        label: "Done",        color: "#059669", bg: "#ECFDF5" },
];

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  LOW:    { label: "Low",    color: "#64748B", bg: "#F1F5F9" },
  MEDIUM: { label: "Medium", color: "#2563EB", bg: "#EFF6FF" },
  HIGH:   { label: "High",   color: "#D97706", bg: "#FFFBEB" },
  URGENT: { label: "Urgent", color: "#DC2626", bg: "#FEF2F2" },
};

export default function TasksPage() {
  const [tasks, setTasks]         = useState<Task[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm]           = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "", status: "TODO" as Task["status"] });
  const [saving, setSaving]       = useState(false);

  const loadTasks = async () => {
    try {
      const res  = await fetch("/api/admin/tasks");
      const json = await res.json();
      setTasks(Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { loadTasks(); }, []);

  const createTask = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setShowCreate(false); setForm({ title: "", description: "", priority: "MEDIUM", dueDate: "", status: "TODO" }); await loadTasks(); }
    } catch {} finally { setSaving(false); }
  };

  const moveTask = async (id: string, status: Task["status"]) => {
    try {
      await fetch(`/api/admin/tasks/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await loadTasks();
    } catch {}
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/admin/tasks/${id}`, { method: "DELETE" });
      await loadTasks();
    } catch {}
  };

  const colTasks = (col: Task["status"]) => tasks.filter(t => t.status === col);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Tasks</h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">{tasks.length} total tasks</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark transition-all shadow-[0_4px_20px_rgb(255,111,97,0.3)] hover:-translate-y-0.5">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {COLUMNS.map(col => (
            <div key={col.key} className="bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
              <div className="px-5 py-4 border-b border-gray-100/50 flex items-center justify-between bg-white/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: col.color }} />
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: col.color }}>{col.label}</span>
                </div>
                <span className="text-[11px] font-black text-gray-500 bg-white shadow-sm px-2.5 py-0.5 rounded-full">{colTasks(col.key).length}</span>
              </div>
              <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                {colTasks(col.key).length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100/50 flex items-center justify-center mb-3">
                      <span className="text-xl">✨</span>
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">No tasks</div>
                  </div>
                ) : (
                  colTasks(col.key).map(task => {
                    const pc = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.MEDIUM;
                    return (
                      <div key={task.id} className="bg-white rounded-2xl p-4 border border-gray-100/80 shadow-sm hover:shadow-md hover:border-coral/30 transition-all group cursor-grab active:cursor-grabbing">
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <p className="text-sm font-black text-navy leading-snug">{task.title}</p>
                          <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 transition-all flex-shrink-0">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {task.description && <p className="text-xs font-medium text-gray-400 mb-3 leading-relaxed line-clamp-2">{task.description}</p>}
                        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-gray-50">
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-sm" style={{ background: pc.bg, color: pc.color }}>{pc.label}</span>
                          {task.dueDate && <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded-lg">{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {COLUMNS.filter(c => c.key !== col.key).map(c => (
                            <button key={c.key} onClick={() => moveTask(task.id, c.key)}
                              className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 hover:border-coral hover:bg-coral/5 hover:text-coral transition-all">
                              → {c.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-navy/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.1)] w-full max-w-md border border-white/50 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100/50 bg-white/50">
              <h2 className="text-lg font-black text-navy tracking-tight">New Task</h2>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-7 space-y-5">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="What needs to be done?" className="w-full px-4 py-3 border-none bg-gray-50/80 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 focus:bg-white transition-all text-navy placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  placeholder="Add details..."
                  className="w-full px-4 py-3 border-none bg-gray-50/80 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 focus:bg-white resize-none transition-all text-navy placeholder:text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Priority</label>
                  <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                    className="w-full px-4 py-3 border-none bg-gray-50/80 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 transition-all text-navy appearance-none">
                    {Object.keys(PRIORITY_CONFIG).map(k => <option key={k} value={k}>{PRIORITY_CONFIG[k].label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Due Date</label>
                  <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                    className="w-full px-4 py-3 border-none bg-gray-50/80 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 transition-all text-navy" />
                </div>
              </div>
            </div>
            <div className="px-7 py-5 border-t border-gray-100/50 flex justify-end gap-3 bg-gray-50/30">
              <button onClick={() => setShowCreate(false)} className="px-5 py-2.5 border-none bg-gray-100 rounded-xl text-sm font-black text-gray-500 hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={createTask} disabled={saving || !form.title.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark disabled:opacity-60 transition-colors shadow-[0_4px_15px_rgb(255,111,97,0.3)]">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
