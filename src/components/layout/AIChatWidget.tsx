"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, FormEvent, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, Send, CheckCircle2, Loader2, Sparkles, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  bookingRequest?: BookingRequest;
}

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  startTime: string;
  eventType: string;
  packageId: string;
  address: string;
  city: string;
  zip: string;
  guests: number;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hey there! 👋 I'm your American Legend Concierge.\n\nI can help you explore our packages, check pricing, and book your event directly here.\n\nHow can I sweeten your day?",
};

const QUICK_REPLIES = [
  "🍦 View Packages",
  "📅 Book an Event",
  "💰 Check Pricing",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirming, setBookingConfirming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { status } = useSession();

  // Show button when scrolled
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for external open triggers
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on open (desktop only)
  useEffect(() => {
    if (isOpen && window.innerWidth >= 640) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (e?: FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const text = overrideText || inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].slice(-12).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.text || "",
        bookingRequest: data.bookingRequest,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("AI Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again or call us at 617-999-3803! 📞",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingData: BookingRequest) => {
    setBookingConfirming(true);
    try {
      const res = await fetch("/api/chat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingData }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: `🎉 **Booking Confirmed!**\n\nYour reference number is **#${data.bookingNumber}**.\n\nOur team will review it and contact you shortly. Thank you for choosing American Legend Ice Cream Truck! 🍦`,
          },
        ]);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I couldn't process the booking right now. Please call us at 617-999-3803 and we'll be happy to help! 📞",
        },
      ]);
    } finally {
      setBookingConfirming(false);
    }
  };

  const hasQuickRepliesShown = messages.length <= 1;

  const memoizedMessages = useMemo(() => messages.map((msg) => (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      key={msg.id} 
      className="relative w-full flex flex-col"
    >
      <div className={cn("flex gap-3 max-w-[90%]", msg.role === "user" ? "self-end flex-row-reverse" : "self-start")}>
        {msg.role === "assistant" && (
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/50 bg-white">
            <Image src="/images/icon.png" alt="Assistant" fill className="object-contain p-1" sizes="32px" />
          </div>
        )}
        <div
          className={cn(
            "px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed shadow-md backdrop-blur-sm",
            msg.role === "user"
              ? "bg-gradient-to-br from-navy to-[#1a2b5e] text-white rounded-2xl rounded-br-sm shadow-navy/20"
              : "bg-white/90 text-navy rounded-2xl rounded-bl-sm border border-white/60 shadow-black/5"
          )}
        >
          {msg.role === "assistant" ? (
            <div className="prose prose-sm prose-p:leading-relaxed prose-pre:p-0 max-w-none prose-li:marker:text-coral text-navy prose-strong:text-navy prose-strong:font-black">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content || "…"}</ReactMarkdown>
            </div>
          ) : (
            msg.content
          )}
        </div>
      </div>

      {/* Booking Confirmation Card */}
      {msg.bookingRequest && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="self-start ml-11 mt-3 w-[280px] sm:w-[320px] bg-white/90 backdrop-blur-md rounded-[1.5rem] border border-white/60 shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-coral/10 to-transparent px-5 py-4 border-b border-white/40">
            <p className="text-coral text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={16} /> Booking Summary
            </p>
          </div>
          <div className="p-5 space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-100/50 pb-2">
              <span className="text-gray-400 font-bold text-xs uppercase">Event</span>
              <span className="text-navy font-black">{msg.bookingRequest.eventType}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100/50 pb-2">
              <span className="text-gray-400 font-bold text-xs uppercase">Date</span>
              <span className="text-navy font-black">{msg.bookingRequest.eventDate} @ {msg.bookingRequest.startTime}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100/50 pb-2">
              <span className="text-gray-400 font-bold text-xs uppercase">Guests</span>
              <span className="text-navy font-black">{msg.bookingRequest.guests}</span>
            </div>
            <div className="pt-3">
              {status === "authenticated" ? (
                <button
                  onClick={() => msg.bookingRequest && handleConfirmBooking(msg.bookingRequest)}
                  disabled={bookingConfirming}
                  className="w-full py-3.5 rounded-xl font-black text-sm bg-coral text-white hover:bg-coral-dark shadow-lg shadow-coral/30 hover:shadow-coral/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {bookingConfirming ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Confirm Booking</>}
                </button>
              ) : (
                <button
                  onClick={() => window.location.href = "/login"}
                  className="w-full py-3.5 rounded-xl font-black text-sm bg-navy text-white hover:bg-[#1a2b5e] shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Log in to Confirm
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )), [messages, bookingConfirming, status]);

  return (
    <>
      {/* ── Floating Chat Button (Premium Glass FAB) ── */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            key="chat-fab"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 z-[60] group"
            aria-label="Open AI Chat"
          >
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-coral/30 animate-ping group-hover:bg-coral/40 transition-colors" style={{ animationDuration: "3s" }} />
            
            {/* Core Button */}
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.4)_inset] overflow-hidden">
               {/* Animated gradient background on hover */}
               <div className="absolute inset-0 bg-gradient-to-tr from-coral/10 via-transparent to-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <Image
                 src="/images/icon.png"
                 alt="Assistant"
                 fill
                 className="object-contain p-3 sm:p-4 drop-shadow-md relative z-10 transition-transform duration-500 group-hover:scale-110"
                 sizes="80px"
               />
            </div>
            
            {/* Online Indicator */}
            <div className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-[2.5px] border-white shadow-sm flex items-center justify-center z-20">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-80" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window (Glassmorphic Floating Card) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "fixed z-[70] flex flex-col overflow-hidden",
              // Ultra-premium Glassmorphism
              "bg-white/60 backdrop-blur-[40px] shadow-[0_20px_60px_-15px_rgba(10,17,40,0.2),0_0_0_1px_rgba(255,255,255,0.5)_inset]",
              // Positioning & sizing for all devices (floating card)
              "bottom-4 right-2 left-2 sm:left-auto sm:bottom-8 sm:right-8 md:bottom-10 md:right-10",
              "sm:w-[420px] md:w-[440px]",
              "h-[calc(100dvh-32px)] max-h-[750px] sm:h-[680px] md:h-[720px] sm:max-h-[85vh]",
              "rounded-[2.5rem] border border-white/60"
            )}
          >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-navy/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-coral/15 rounded-full blur-[80px]" />
            </div>

            {/* ── Header ── */}
            <div className="relative px-6 py-5 flex items-center gap-4 shrink-0 bg-white/40 border-b border-white/40 z-20 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-lg border border-white/60 bg-white">
                <Image src="/images/icon.png" alt="Assistant" fill className="object-contain p-1" sizes="48px" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="font-display font-black text-navy text-xl leading-none flex items-center gap-2 mb-1.5 drop-shadow-sm">
                  American Legend <Sparkles className="w-4 h-4 text-red" />
                </h3>
                <p className="flex items-center gap-1.5 text-navy-light text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> AI Concierge
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 border border-white/60 flex items-center justify-center transition-all shadow-sm text-navy"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 z-10 scrollbar-hide relative">
              {memoizedMessages}

              {/* Quick Replies */}
              {hasQuickRepliesShown && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.4 }}
                  className="flex flex-nowrap overflow-x-auto pb-4 pt-2 -mx-5 px-5 sm:flex-wrap gap-2 scrollbar-hide"
                >
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(undefined, q)}
                      className="shrink-0 px-4 py-2.5 text-[13px] font-bold rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-navy hover:bg-white hover:shadow-md transition-all whitespace-nowrap"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[85%]"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto border border-white/50 bg-white">
                    <Image src="/images/icon.png" alt="Assistant" fill className="object-contain p-1" sizes="32px" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl rounded-bl-sm px-4 py-3.5 border border-white/60 shadow-sm flex items-center gap-1.5 h-[42px]">
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-coral/60" />
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-coral/60" />
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-coral/60" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* ── Input Area ── */}
            <div className="shrink-0 z-20 pb-4 px-4 pt-2">
              <form 
                onSubmit={handleSend} 
                className="relative flex items-end gap-2 bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[2rem] p-1.5 focus-within:bg-white focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all"
              >
                <div className="flex-1 min-h-[44px] flex items-center pl-4 pb-0.5">
                  <TextareaAutosize
                    ref={inputRef}
                    minRows={1}
                    maxRows={4}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="w-full bg-transparent resize-none outline-none text-[15px] text-navy placeholder:text-gray-400 font-medium py-2.5 scrollbar-hide"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-[44px] h-[44px] shrink-0 rounded-full bg-gradient-to-br from-coral to-[#ff5050] text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:scale-95 hover:shadow-[0_4px_15px_rgba(255,107,107,0.4)] disabled:hover:shadow-none"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
