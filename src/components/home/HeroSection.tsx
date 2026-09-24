"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ArrowRight, Star, Phone, CheckCircle, FileText } from "lucide-react";
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
      colors: ["#C9232D", "#C99A3D", "#FFF4D6", "#123E73", "#071B3A"],
      scalar: 1.1,
    });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-cream"
    >
      {/* ── Ambient background blobs ── */}
      <div
        className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,35,45,0.05) 0%, transparent 65%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(18,62,115,0.06) 0%, transparent 70%)",
          transform: "translate(-35%, 25%)",
        }}
      />

      {/* ── Subtle decorative pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #071B3A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pt-[90px] sm:pt-[110px] md:pt-[120px] pb-8 md:pb-24">
        {/* Mobile order: Copy -> Image, stacked. Desktop: side-by-side */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20 min-h-[75vh] md:min-h-[80vh]">

          {/* ────────── LEFT: Copy ────────── */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left z-20 order-1 lg:order-1 w-full">

            {/* Mobile-only Logo/Icon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:hidden flex justify-center mb-6"
            >
              <Image 
                src="/images/icon.png"
                alt="American Legend Icon"
                width={70}
                height={70}
                className="drop-shadow-md"
              />
            </motion.div>

            {/* Badge pill - hidden on mobile if it clutters, but let's keep it small */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:flex mb-6 justify-center lg:justify-start"
            >
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[0.68rem] font-black tracking-[0.18em] uppercase text-navy border border-navy/10 bg-white/50 backdrop-blur-sm"
              >
                🍦 Massachusetts&apos; Premier Ice Cream Truck
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display font-black leading-[1.05] tracking-tight mb-5 text-navy"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5.2rem)" }}
            >
              Legendary
              <br />
              <span className="text-red italic pr-2">
                Sweet Memories
              </span>
              <br />
              Across Massachusetts.
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 lg:mb-10 text-charcoal/80"
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.25rem)",
              }}
            >
              From intimate birthday parties to massive corporate festivals —
              we bring the ice cream truck experience that gets talked about for years.
              Serving <strong className="text-navy">all of Massachusetts.</strong>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-10"
            >
              <Link
                href="/packages"
                onMouseEnter={handleConfetti}
                onClick={handleConfetti}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 rounded-full font-black text-white text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto bg-red shadow-coral-lg"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  BOOK THE TRUCK
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 md:py-5 rounded-full font-bold text-lg border-2 border-navy/15 text-navy hover:bg-navy/5 transition-all duration-300 w-full sm:w-auto bg-white/50 backdrop-blur-md"
              >
                <FileText className="w-5 h-5 flex-shrink-0 text-gold" />
                VIEW MENU
              </Link>
            </motion.div>

            {/* Trust pills row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/90 border border-navy/10 text-charcoal/80 shadow-sm"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ────────── RIGHT: COVER IMAGE ────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full max-w-[500px] lg:max-w-none flex items-center justify-center relative select-none order-2 lg:order-2 mt-4 lg:mt-0 min-h-[300px] sm:min-h-[400px]"
          >
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-50"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(201,35,45,0.15) 0%, rgba(201,154,61,0.08) 45%, transparent 70%)",
                transform: "scale(1.1)",
              }}
            />

            {/* Main Cover Image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-full flex items-center justify-center"
              style={{
                aspectRatio: "1/1",
                maxHeight: "clamp(300px, 80vw, 650px)",
                filter: "drop-shadow(0 20px 30px rgba(7,27,58,0.15))"
              }}
            >
              <Image
                src="/images/cover_image.png"
                alt="American Legend Ice Cream Truck — Premium Ice Cream Catering in Massachusetts"
                fill
                className="object-contain scale-105"
                sizes="(max-width: 1024px) 95vw, 55vw"
                priority
              />
            </motion.div>

            {/* ── Floating badge: 500+ Events ── */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute left-[-10px] sm:left-[-20px] top-[15%] z-30 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-lift border border-navy/5"
              style={{ animation: "float 4.5s ease-in-out infinite" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-red/10">
                🎉
              </div>
              <div>
                <p className="font-black text-base leading-none mb-0.5 text-navy">
                  500<span className="text-red">+</span>
                </p>
                <p className="text-[0.6rem] font-bold uppercase tracking-wider text-charcoal/50">
                  Events Catered
                </p>
              </div>
            </motion.div>

            {/* ── Floating badge: 5-Star ── */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute right-[-10px] sm:right-[-20px] top-[30%] z-30 hidden md:flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-lift border border-gold/20"
              style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-black text-sm text-navy">
                5.0<span className="font-medium text-xs ml-1 text-charcoal/50">rating</span>
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
