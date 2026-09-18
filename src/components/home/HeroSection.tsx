"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ArrowRight, Star, Phone, CheckCircle } from "lucide-react";
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
      particleCount: 160,
      spread: 100,
      origin: { y: 0.55 },
      colors: ["#FF4E74", "#D98A2C", "#FFFBF5", "#2E9365", "#E5A84B"],
      scalar: 1.1,
    });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #FFFDF9 0%, #FFFBF5 50%, #FDF0E8 100%)",
      }}
    >
      {/* ── Ambient background blobs ── */}
      <div
        className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,78,116,0.07) 0%, transparent 65%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(217,138,44,0.06) 0%, transparent 70%)",
          transform: "translate(-35%, 25%)",
        }}
      />

      {/* ── Subtle decorative pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #1A1009 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pt-[100px] sm:pt-[110px] md:pt-[120px] pb-8 md:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-20 min-h-[75vh] md:min-h-[80vh]">

          {/* ────────── LEFT: Copy ────────── */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left z-20 order-1 lg:order-1">

            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6 flex justify-center lg:justify-start"
            >
              <span
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-[0.65rem] sm:text-[0.68rem] font-black tracking-[0.18em] uppercase"
                style={{
                  background: "rgba(255,78,116,0.09)",
                  border: "1px solid rgba(255,78,116,0.22)",
                  color: "#FF4E74",
                }}
              >
                🍦 Boston&apos;s Premier Ice Cream Truck
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display font-black leading-[1.1] sm:leading-[1.04] tracking-tight mb-4 sm:mb-5"
              style={{ fontSize: "clamp(2.3rem, 8vw, 5.2rem)", color: "#1A1009" }}
            >
              Legendary
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF4E74 0%, #E63860 45%, #D98A2C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                Sweet Memories
              </span>
              <br />
              <span style={{ color: "#1A1009" }}>Across Massachusetts.</span>
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9"
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                color: "rgba(26,16,9,0.65)",
              }}
            >
              From intimate birthday parties to massive corporate festivals —
              we bring the ice cream truck experience that gets talked about for years.
              Serving{" "}
              <strong style={{ color: "#1A1009" }}>all of Massachusetts.</strong>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10"
            >
              <Link
                href="/packages"
                onMouseEnter={handleConfetti}
                onClick={handleConfetti}
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-black text-white text-base overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] w-full sm:w-auto"
                style={{
                  background: "linear-gradient(135deg, #FF4E74, #E63860)",
                  boxShadow: "0 8px 32px rgba(255,78,116,0.38), 0 2px 8px rgba(255,78,116,0.18)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Book Your Event
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </Link>

              <Link
                href={`tel:${BUSINESS_CONFIG.contact.phone1}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base border-2 transition-all duration-300 hover:scale-[1.03] w-full sm:w-auto"
                style={{
                  borderColor: "rgba(26,16,9,0.12)",
                  color: "#1A1009",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#D98A2C" }} />
                {BUSINESS_CONFIG.contact.phone1}
              </Link>
            </motion.div>

            {/* Trust pills row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.90)",
                    border: "1px solid rgba(26,16,9,0.08)",
                    color: "rgba(26,16,9,0.65)",
                    boxShadow: "0 2px 8px rgba(26,16,9,0.04)",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ────────── RIGHT: COVER IMAGE ────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full max-w-[560px] lg:max-w-none flex items-center justify-center relative select-none order-2 lg:order-2 mt-2 lg:mt-0 min-h-[240px] sm:min-h-[340px] lg:min-h-[420px]"
          >
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,78,116,0.12) 0%, rgba(217,138,44,0.06) 45%, transparent 70%)",
                transform: "scale(1.08)",
              }}
            />

            {/* Main Cover Image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-full flex items-center justify-center"
              style={{
                aspectRatio: "1/1",
                maxHeight: "clamp(250px, 55vw, 650px)",
                filter: "drop-shadow(0 25px 35px rgba(26,16,9,0.15))"
              }}
            >
              <Image
                src="/images/Cover Image.png"
                alt="Boston Legend Ice Cream Truck — Premium Ice Cream Catering in Massachusetts"
                fill
                className="object-contain scale-110"
                sizes="(max-width: 1024px) 90vw, 55vw"
                priority
              />
            </motion.div>

            {/* ── Floating badge: 500+ Events ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute left-[-20px] top-[22%] z-30 hidden md:flex items-center gap-3 px-5 py-3.5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(26,16,9,0.12)",
                border: "1.5px solid rgba(255,78,116,0.15)",
                animation: "float 4.5s ease-in-out infinite",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FF4E7418, #D98A2C14)" }}
              >
                🎉
              </div>
              <div>
                <p className="font-black text-base leading-none mb-0.5" style={{ color: "#1A1009" }}>
                  500<span style={{ color: "#FF4E74" }}>+</span>
                </p>
                <p className="text-[0.6rem] font-bold uppercase tracking-wider" style={{ color: "rgba(26,16,9,0.45)" }}>
                  Events Catered
                </p>
              </div>
            </motion.div>

            {/* ── Floating badge: 5-Star ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute right-[-20px] top-[30%] z-30 hidden md:flex items-center gap-3 px-5 py-3.5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(26,16,9,0.12)",
                border: "1.5px solid rgba(217,138,44,0.18)",
                animation: "float 5s ease-in-out infinite",
                animationDelay: "1.2s",
              }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#D98A2C" }} />
                ))}
              </div>
              <p className="font-black text-sm" style={{ color: "#1A1009" }}>
                5.0
                <span className="font-medium text-xs ml-1" style={{ color: "rgba(26,16,9,0.45)" }}>
                  rating
                </span>
              </p>
            </motion.div>

            {/* ── Floating badge: Licensed ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-[-18px] left-[10%] right-[10%] mx-auto z-30 hidden md:flex items-center justify-center gap-2 px-5 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(26,16,9,0.10)",
                border: "1.5px solid rgba(46,147,101,0.18)",
                animation: "float 4s ease-in-out infinite",
                animationDelay: "2s",
              }}
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#2E9365" }} />
              <p className="text-xs font-bold" style={{ color: "#1A1009" }}>
                Licensed &amp; Insured · All of Massachusetts
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
