"use client";

import { motion } from "framer-motion";
import { BUSINESS_CONFIG } from "@/lib/config";
import { Award, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";
import MeltingDrip from "@/components/shared/MeltingDrip";

const stats = [
  {
    value: "500",
    suffix: "+",
    label: "Events Catered",
    desc: "Birthday, corporate & wedding memories",
    icon: Award,
    gradient: "linear-gradient(135deg, #FF4E74, #E63860)",
    glow: "rgba(255,78,116,0.25)",
  },
  {
    value: "5.0",
    suffix: "★",
    label: "Client Rating",
    desc: "Consistently rated 5-star across MA",
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #D98A2C, #E5A84B)",
    glow: "rgba(217,138,44,0.25)",
  },
  {
    value: "50",
    suffix: "+",
    label: "Massachusetts Towns",
    desc: "Full statewide catering coverage",
    icon: MapPin,
    gradient: "linear-gradient(135deg, #2E9365, #3DB87A)",
    glow: "rgba(46,147,101,0.20)",
  },
  {
    value: "100",
    suffix: "%",
    label: "Licensed & Insured",
    desc: "Commercial liability & health permits",
    icon: HeartHandshake,
    gradient: "linear-gradient(135deg, #FF4E74, #D98A2C)",
    glow: "rgba(255,78,116,0.20)",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function TrustStats() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FFFBF5]">
      {/* Vanilla Drip from the Hero section pouring down into the section */}
      <div className="absolute top-0 left-0 right-0 z-0" style={{ height: "450px", overflow: "visible" }}>
        <MeltingDrip
          color="#FFFBF5"
          height={450}
          variant="right-heavy"
        />
      </div>

      <section
        className="relative w-full"
        style={{ background: "linear-gradient(180deg, #FFFBF5 0%, #FDF6EC 100%)" }}
      >
      <div className="container mx-auto px-5 md:px-10 lg:px-20 py-12 md:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[0.68rem] font-black tracking-[0.2em] uppercase mb-4"
            style={{
              background: "linear-gradient(90deg, rgba(255,78,116,0.12), rgba(217,138,44,0.12))",
              border: "1px solid rgba(255,78,116,0.20)",
              color: "#1A1009",
            }}
          >
            🏆 Why Massachusetts Trusts Us
          </span>
          <h2
            className="font-display font-black tracking-tight leading-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1A1009",
            }}
          >
            Legendary Service.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF4E74, #D98A2C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Unmatched Reliability.
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={card}
                className="group relative rounded-[2rem] p-6 sm:p-8 text-center flex flex-col items-center overflow-hidden cursor-default"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(26,16,9,0.06)",
                  boxShadow: "0 4px 24px rgba(26,16,9,0.05)",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${stat.glow}, 0 4px 16px rgba(26,16,9,0.08)`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,78,116,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(26,16,9,0.05)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,16,9,0.06)";
                }}
              >
                {/* Top accent bar with melting drip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]"
                  style={{ background: stat.gradient }}
                />
                {/* Tiny drip from the top bar */}
                <div
                  className="absolute top-[4px] left-1/2 -translate-x-1/2 w-3 h-5 opacity-80"
                  style={{ borderRadius: "0 0 50% 50%", background: stat.gradient }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mt-3"
                  style={{ background: stat.gradient, boxShadow: `0 6px 20px ${stat.glow}` }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Value */}
                <div
                  className="font-display font-black mb-1.5 leading-none"
                  style={{
                    fontSize: "clamp(3rem, 5vw, 3.75rem)",
                    background: stat.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                  <span style={{ fontSize: "60%" }}>{stat.suffix}</span>
                </div>

                <h3
                  className="font-black uppercase tracking-wider text-xs mb-2"
                  style={{ color: "#1A1009" }}
                >
                  {stat.label}
                </h3>

                <p className="text-xs leading-relaxed" style={{ color: "rgba(26,16,9,0.55)" }}>
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      </section>
    </div>
  );
}
