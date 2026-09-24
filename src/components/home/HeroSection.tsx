"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ArrowRight, Star, Phone, FileText, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const TRUST_ITEMS = [
  { icon: "🏆", label: "500+ Events" },
  { icon: "⭐", label: "5-Star Rated" },
  { icon: "📍", label: "All of Massachusetts" },
  { icon: "✅", label: "Fully Licensed" },
];

export default function HeroSection() {
  const handleConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 110,
      origin: { y: 0.6 },
      colors: ["#C9232D", "#C99A3D", "#FFF4D6", "#123E73", "#ffffff"],
      scalar: 1.2,
    });
  };

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col md:justify-end overflow-hidden bg-[#071B3A]"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Background Image Container (Responsive) ── */}
      {/* On mobile: fixed height at the top to avoid stretching. On desktop: covers entire screen */}
      <div className="absolute top-0 left-0 right-0 h-[55vh] md:h-full md:inset-0 z-0">
        <Image
          src="/images/cover_image.png"
          alt="American Legend Ice Cream Truck — Premium Ice Cream Catering in Massachusetts"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Mobile Gradient: Fades the bottom of the image into the navy background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-[#071B3A]/40 to-transparent md:hidden" />
        
        {/* Desktop Gradients: Left and bottom fades for text legibility */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#071B3A]/90 via-[#071B3A]/40 to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-transparent" />
      </div>

      {/* ── Floating badge: 500+ Events (Desktop Only) ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[25%] left-16 z-30 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white/10">🎉</div>
        <div>
          <p className="font-black text-lg leading-none mb-0.5 text-white">500<span className="text-[#C99A3D]">+</span></p>
          <p className="text-[0.62rem] font-bold uppercase tracking-wider text-white/60">Events Catered</p>
        </div>
      </motion.div>

      {/* ── Floating badge: 5-Star (Desktop Only) ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[25%] right-16 z-30 hidden md:flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(201,154,61,0.4)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#C99A3D] text-[#C99A3D]" />
          ))}
        </div>
        <p className="font-black text-base text-white leading-none">
          5.0 <span className="font-medium text-xs text-white/50">rating</span>
        </p>
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      {/* On mobile, content is pushed down to overlap the image fade. On desktop, it sits at the bottom left. */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-end pt-[45vh] md:pt-[100px] pb-10 md:pb-16">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-20">

          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex justify-center md:justify-start mb-5"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.65rem] md:text-[0.7rem] font-black tracking-[0.2em] uppercase"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#C99A3D",
              }}
            >
              🍦 Massachusetts&apos; Premier Ice Cream Truck
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black leading-[1.05] tracking-tight text-center md:text-left text-white mb-4 md:mb-5"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
          >
            Legendary
            <br />
            <span className="italic" style={{ color: "#C9232D" }}>
              Sweet Memories
            </span>
            <br />
            <span className="italic font-medium text-white/90">Across Massachusetts.</span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-white/75 font-medium leading-relaxed text-center md:text-left max-w-2xl mx-auto md:mx-0 mb-8"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
          >
            From intimate birthday parties to massive corporate festivals —
            we bring the ice cream truck experience that gets talked about for years.
            Serving <strong className="text-white font-bold">all of Massachusetts.</strong>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10"
          >
            {/* Primary CTA */}
            <Link
              href="/packages"
              onMouseEnter={handleConfetti}
              onClick={handleConfetti}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 rounded-full font-black text-white text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #C9232D 0%, #a31b24 100%)",
                boxShadow: "0 8px 30px rgba(201,35,45,0.45), 0 0 0 1px rgba(255,255,255,0.1) inset",
              }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <span className="hidden md:inline">BOOK YOUR EVENT</span>
                <span className="md:hidden">BOOK THE TRUCK</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>

            {/* Mobile: View Menu */}
            <Link
              href="/menu"
              className="md:hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base w-full transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
              }}
            >
              <FileText className="w-5 h-5 flex-shrink-0 text-[#C99A3D]" />
              VIEW MENU
            </Link>

            {/* Desktop: Phone */}
            <Link
              href={`tel:${BUSINESS_CONFIG.contact.phone1}`}
              className="hidden md:inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
              }}
            >
              <Phone className="w-5 h-5 flex-shrink-0 text-[#C99A3D]" />
              {BUSINESS_CONFIG.contact.phone1}
            </Link>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className="flex flex-wrap justify-center md:justify-start gap-2.5"
          >
            {TRUST_ITEMS.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 text-[0.65rem] md:text-xs font-bold px-3 py-1.5 md:px-3.5 rounded-full text-white/80"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1"
      >
        <span className="text-white/35 text-[0.6rem] font-bold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
