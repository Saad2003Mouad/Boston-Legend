"use client";
import { useState, useRef, useEffect, FormEvent, useCallback } from "react";
import {
  Bot, Loader2, Send, AlertTriangle, Plus, Trash2, Edit2,
  MessageSquare, Search, X, Check, ChevronRight, Sparkles
} from "lucide-react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";

type Message = { id: string; role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string | null; updatedAt: string; _count?: { messages: number } };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AiAdminPage() {
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId]   = useState<string | null>(null);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [inputValue, setInputValue]       = useState("");
  const [isLoading, setIsLoading]         = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [convSearch, setConvSearch]       = useState("");
  const [renamingId, setRenamingId]       = useState<string | null>(null);
  const [renameVal, setRenameVal]         = useState("");
  const [sidebarOpen, setSidebarOpen]     = useState(true);

  const loadConversations = useCallback(async () => {
    try {
      const res  = await fetch("/api/admin/conversations");
      const json = await res.json();
      setConversations(json.data || []);
    } catch {}
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const openConversation = async (conv: Conversation) => {
    setActiveConvId(conv.id);
    setMessages([]);
    setError(null);
    try {
      const res  = await fetch(`/api/admin/conversations/${conv.id}`);
      const json = await res.json();
      const msgs = (json.data?.messages || []).map((m: any) => ({
        id: m.id, role: m.role, content: m.content,
      }));
      if (msgs.length === 0) {
        setMessages([{
          id: "welcome",
          role: "assistant",
          content: `Hello, ${session?.user?.name?.split(" ")[0] || "Admin"}! 👋 What would you like to know?`,
        }]);
      } else {
        setMessages(msgs);
      }
    } catch {}
  };

  const startNewConversation = async () => {
    try {
      const res  = await fetch("/api/admin/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Conversation" }),
      });
      const json = await res.json();
      const conv = json.data;
      setConversations(prev => [conv, ...prev]);
      setActiveConvId(conv.id);
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: `Hello, ${session?.user?.name?.split(" ")[0] || "Admin"}! 👋 I'm your Boston Legend Ice Cream Truck AI Operations Assistant. I have live access to your database and can help you with:\n\n• 📋 **Booking queries** — search, filter, status\n• 👥 **Customer lookups** — name, email, history\n• 📦 **Package details** — pricing, availability\n• 📊 **Analytics** — revenue trends, booking stats\n\nWhat would you like to know?`,
      }]);
      setError(null);
    } catch {}
  };

  const deleteConversation = async (conv: Conversation) => {
    if (!confirm("Delete this conversation?")) return;
    await fetch(`/api/admin/conversations/${conv.id}`, { method: "DELETE" });
    setConversations(prev => prev.filter(c => c.id !== conv.id));
    if (activeConvId === conv.id) { setActiveConvId(null); setMessages([]); }
  };

  const renameConversation = async (conv: Conversation) => {
    if (!renameVal.trim()) { setRenamingId(null); return; }
    await fetch(`/api/admin/conversations/${conv.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: renameVal }),
    });
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, title: renameVal } : c));
    setRenamingId(null);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (!activeConvId) { await startNewConversation(); return; }
    setError(null);

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = updatedMessages.slice(-12).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, conversationId: activeConvId }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const reply = data.reply ?? "No response from AI.";

      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: reply }]);

      // Auto-title: if this is the first message, use it as title
      if (updatedMessages.filter(m => m.role === "user").length === 1) {
        const autoTitle = text.length > 40 ? text.substring(0, 40) + "…" : text;
        await fetch(`/api/admin/conversations/${activeConvId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: autoTitle }),
        });
        setConversations(prev => prev.map(c => c.id === activeConvId ? { ...c, title: autoTitle, updatedAt: new Date().toISOString() } : c));
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally { setIsLoading(false); }
  };

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); sendMessage(inputValue); };

  const filteredConvs = conversations.filter(c =>
    !convSearch || (c.title || "New Conversation").toLowerCase().includes(convSearch.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-7rem)] bg-white/70 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">

      {/* ─── Sidebar ─────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="w-80 border-r border-gray-100/80 flex flex-col bg-white/40">
          <div className="p-5 border-b border-gray-100/80 bg-white/30">
            <button onClick={startNewConversation}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark transition-all shadow-[0_4px_15px_rgb(255,111,97,0.3)] hover:-translate-y-0.5">
              <Plus className="w-4 h-4" /> New Chat
            </button>
            <div className="relative mt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input value={convSearch} onChange={e => setConvSearch(e.target.value)}
                placeholder="Search conversations…"
                className="w-full pl-11 pr-4 py-2.5 border-none bg-white/80 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-coral/20 transition-all text-navy placeholder:text-gray-400 placeholder:font-semibold shadow-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {filteredConvs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-wider">No conversations</div>
              </div>
            ) : filteredConvs.map(conv => (
              <div key={conv.id}
                className={`group relative mb-2 rounded-2xl transition-all cursor-pointer ${activeConvId === conv.id ? "bg-white shadow-sm border border-gray-100 scale-[1.02]" : "hover:bg-white/60 hover:shadow-sm"}`}
                onClick={() => openConversation(conv)}>
                <div className="p-4 pr-16">
                  {renamingId === conv.id ? (
                    <input autoFocus value={renameVal} onChange={e => setRenameVal(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") renameConversation(conv); if (e.key === "Escape") setRenamingId(null); }}
                      className="w-full text-sm font-black text-navy bg-transparent outline-none border-b border-coral"
                      onClick={e => e.stopPropagation()} />
                  ) : (
                    <div className="text-sm font-black text-navy truncate">{conv.title || "New Conversation"}</div>
                  )}
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{timeAgo(conv.updatedAt)}</div>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={e => { e.stopPropagation(); setRenamingId(conv.id); setRenameVal(conv.title || ""); }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); deleteConversation(conv); }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Main Chat Area ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-gray-100/80 bg-white/40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(v => !v)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-gray-400 shadow-sm transition-colors border border-transparent hover:border-gray-100">
              <MessageSquare className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-coral to-orange-400 flex items-center justify-center shadow-[0_4px_15px_rgb(255,111,97,0.3)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-black text-navy tracking-tight">AI Operations Assistant</div>
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-500 flex items-center gap-2 mt-0.5">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                Live Database Access
              </div>
            </div>
          </div>
          {!activeConvId && (
            <button onClick={startNewConversation}
              className="flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5">
              <Plus className="w-4 h-4" /> Start Chat
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-8 custom-scrollbar bg-transparent">
          {!activeConvId ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-coral/20 to-orange-100 flex items-center justify-center mb-6 shadow-inner">
                <Bot className="w-12 h-12 text-coral" />
              </div>
              <h2 className="text-3xl font-black text-navy mb-3 tracking-tight">AI Operations Assistant</h2>
              <p className="text-gray-500 text-sm font-semibold max-w-sm mb-8 leading-relaxed">Start a new conversation to query your live business data, analyze revenue, or find specific bookings.</p>
              <button onClick={startNewConversation}
                className="flex items-center gap-2 px-8 py-4 bg-coral text-white rounded-2xl font-black hover:bg-coral-dark shadow-[0_4px_20px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-1 hover:scale-105">
                <Plus className="w-5 h-5" /> Start New Chat
              </button>
            </div>
          ) : messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black shadow-md ${
                msg.role === "user" ? "bg-navy text-white" : "bg-gradient-to-br from-coral to-orange-400 text-white shadow-coral/20"
              }`}>
                {msg.role === "user" ? (session?.user?.name?.[0] || "U") : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                <div className={`px-5 py-4 text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-navy text-white rounded-2xl rounded-tr-none"
                    : "bg-white border border-gray-100/80 text-navy rounded-2xl rounded-tl-none"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-headings:font-black prose-headings:text-navy prose-code:text-coral prose-code:bg-coral/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-bold prose-strong:font-black">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-coral to-orange-400 flex items-center justify-center shadow-md shadow-coral/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-gray-100/80 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-2 shadow-sm">
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-coral/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50/80 border border-red-100 rounded-2xl text-sm font-bold text-red-700 mx-auto max-w-md">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 md:px-8 py-5 border-t border-gray-100/80 bg-white/40">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); } }}
                placeholder={activeConvId ? "Ask about bookings, customers, revenue…" : "Start a new chat first"}
                disabled={!activeConvId || isLoading}
                rows={1}
                className="w-full px-5 py-3.5 bg-white border-none shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-coral/20 transition-all resize-none disabled:opacity-60 disabled:bg-gray-50 max-h-40 text-navy placeholder:text-gray-400"
                style={{ height: "auto" }}
              />
            </div>
            <button type="submit" disabled={!inputValue.trim() || isLoading || !activeConvId}
              className="flex-shrink-0 w-12 h-12 bg-coral text-white rounded-2xl flex items-center justify-center hover:bg-coral-dark transition-all disabled:opacity-50 shadow-[0_4px_15px_rgb(255,111,97,0.3)] hover:-translate-y-0.5 active:translate-y-0">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
          <p className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-3">
            AI responses may occasionally be imprecise. Verify critical data in the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
