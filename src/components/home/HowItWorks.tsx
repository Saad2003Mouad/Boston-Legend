"use client";

import { motion } from "framer-motion";
import MeltingDrip from "@/components/shared/MeltingDrip";

const STEPS = [
  {
    number: "01",
    emoji: "🍦",
    title: "Choose Your Experience",
    desc: "Browse our premium fleet and select the perfect ice cream truck or boutique van — tailored to your guest count, venue, and aesthetic vision.",
  },
  {
    number: "02",
    emoji: "📅",
    title: "Reserve Your Date",
    desc: "Tell us your event details through our seamless booking portal. Your date is locked in instantly — no back-and-forth, no waiting.",
  },
  {
    number: "03",
    emoji: "🎉",
    title: "Sweet Delivery Day",
    desc: "Our uniformed crew arrives early, sets up perfectly, and serves your guests with warmth and professionalism. You enjoy the moment.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative w-full py-16 md:py-36 overflow-hidden"
      style={{ background: "#FFFBF5" }}
    >
      {/* Strawberry Drip coming DOWN from BrandCarousel into HowItWorks */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <MeltingDrip
          color="#E63860"
          height={80}
          variant="left-heavy"
        />
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10 pt-4 md:pt-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-28"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[0.68rem] font-black tracking-[0.22em] uppercase mb-5"
            style={{
              background: "linear-gradient(90deg, rgba(255,78,116,0.10), rgba(217,138,44,0.10))",
              border: "1px solid rgba(255,78,116,0.18)",
              color: "#FF4E74",
            }}
          >
            The Process
          </span>
          <h2
            className="font-display font-black tracking-tight leading-[1.06]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1A1009" }}
          >
            Three Steps to{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #FF4E74, #D98A2C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Legendary.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: "rgba(26,16,9,0.60)" }}>
            We've refined every step so you can focus on celebrating — not planning.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.13 }}
              className="relative group"
            >
              {/* Connector line between cards (desktop) */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-full w-full h-px z-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, rgba(255,78,116,0.25), rgba(217,138,44,0.08))",
                    width: "calc(100% - 3rem)",
                    transform: "translateX(1.5rem)",
                  }}
                />
              )}

              <div
                className="relative z-10 flex flex-col h-full rounded-[2rem] p-8 md:p-9 transition-all duration-400"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(26,16,9,0.06)",
                  boxShadow: "0 4px 24px rgba(26,16,9,0.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(255,78,116,0.12), 0 4px 16px rgba(26,16,9,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,78,116,0.20)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(26,16,9,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,16,9,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Step number */}
                <div
                  className="text-[3.5rem] font-black font-display leading-none mb-4 select-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,78,116,0.08), rgba(217,138,44,0.06))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.number}
                </div>

                {/* Emoji icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,78,116,0.10), rgba(217,138,44,0.08))",
                    border: "1px solid rgba(255,78,116,0.15)",
                  }}
                >
                  {step.emoji}
                </div>

                <h3
                  className="font-display font-black text-xl md:text-2xl mb-3 tracking-tight"
                  style={{ color: "#1A1009" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(26,16,9,0.58)" }}>
                  {step.desc}
                </p>

                {/* Bottom coral accent */}
                <div
                  className="mt-6 pt-5 flex items-center gap-2"
                  style={{ borderTop: "1px solid rgba(26,16,9,0.06)" }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: "linear-gradient(135deg, #FF4E74, #E63860)" }}
                  >
                    ✓
                  </div>
                  <span className="text-xs font-bold" style={{ color: "rgba(26,16,9,0.45)" }}>
                    Step {i + 1} of 3
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(217,138,44,0.18), transparent)" }} />
    </section>
  );
}
