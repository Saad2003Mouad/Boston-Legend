"use client";

import { Sparkles, Bot, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";
import MeltingDrip from "@/components/shared/MeltingDrip";

export default function AIConciergeTeaser() {
  const handleLaunch = () => {
    window.dispatchEvent(new Event("open-ai-chat"));
  };

  const features = [
    { icon: Zap, label: "60-second match" },
    { icon: Clock, label: "Instant quote" },
    { icon: Bot, label: "AI-powered" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#071B3A]">
      {/* Cream drip coming DOWN from CityMap into this dark section */}
      <MeltingDrip
        color="#FFF4D6"
        height={100}
        variant="center-heavy"
      />

      <section
        className="relative w-full py-16 md:py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071B3A 0%, #2C1A0F 50%, #071B3A 100%)" }}
      >
        {/* Strawberry ambient glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(255,78,116,0.15) 0%, transparent 60%)" }}
        />
        {/* Caramel ambient glow */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(217,138,44,0.10) 0%, transparent 65%)" }}
        />

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,78,116,0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Drip decoration overlapping into the card */}
            <div className="absolute -top-4 left-20 pointer-events-none opacity-60">
              <svg width="24" height="80" viewBox="0 0 24 80" fill="none">
                <path d="M12 0 Q14 25 12 50 Q10 68 12 80" stroke="rgba(255,78,116,0.5)" strokeWidth="6" strokeLinecap="round"/>
                <circle cx="12" cy="80" r="6" fill="rgba(255,78,116,0.4)" />
              </svg>
            </div>
            <div className="absolute -top-2 right-32 pointer-events-none opacity-40">
              <svg width="16" height="60" viewBox="0 0 16 60" fill="none">
                <path d="M8 0 Q10 18 8 36 Q6 52 8 60" stroke="rgba(217,138,44,0.6)" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="8" cy="60" r="4" fill="rgba(217,138,44,0.5)" />
              </svg>
            </div>

            <div className="relative z-10 p-10 md:p-14 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              
              {/* Left content */}
              <div className="flex-1">
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[0.68rem] font-black tracking-[0.2em] uppercase mb-6"
                  style={{
                    background: "rgba(255,78,116,0.15)",
                    border: "1px solid rgba(255,78,116,0.30)",
                    color: "#C9232D",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  AI Event Concierge
                </div>

                <h2
                  className="font-display font-black leading-[1.06] tracking-tight mb-5"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#FFF4D6" }}
                >
                  Not Sure Which{" "}
                  <span
                    className="italic"
                    style={{
                      background: "linear-gradient(135deg, #C9232D, #C99A3D)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Package Fits?
                  </span>
                </h2>

                <p className="text-base md:text-lg leading-relaxed max-w-lg mb-8" style={{ color: "rgba(255,251,245,0.65)" }}>
                  Answer 3 quick questions — our AI concierge analyzes your guest count, budget, and event type to find your perfect match and fill out your quote automatically.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-3">
                  {features.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,251,245,0.75)",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: "#C99A3D" }} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <button
                  onClick={handleLaunch}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white text-base overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
                  style={{
                    background: "linear-gradient(135deg, #C9232D, #A31B24)",
                    boxShadow: "0 8px 32px rgba(255,78,116,0.50)",
                    minWidth: 220,
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Launch Concierge</span>
                  {/* Shine */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                </button>
                <p className="text-[0.68rem] font-semibold text-center" style={{ color: "rgba(255,251,245,0.35)" }}>
                  Free • No commitment required
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


