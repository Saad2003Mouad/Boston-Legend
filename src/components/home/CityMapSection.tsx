"use client";

import Link from "next/link";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import MeltingDrip from "@/components/shared/MeltingDrip";

/**
 * New England SVG map — hand-crafted paths that represent each state's
 * relative shape and position, projected onto a 200×160 viewBox.
 * States: ME, NH, VT, MA (highlighted), RI, CT
 */
const STATE_PATHS: Record<string, { path: string; label: string; lx: number; ly: number }> = {
  ME: {
    path: "M 112,2 L 132,2 L 148,10 L 158,22 L 162,38 L 164,54 L 158,68 L 148,74 L 140,78 L 132,78 L 128,72 L 122,66 L 114,62 L 108,58 L 106,46 L 104,34 L 106,20 Z",
    label: "ME",
    lx: 135,
    ly: 42,
  },
  NH: {
    path: "M 106,20 L 104,34 L 106,46 L 108,58 L 114,62 L 108,66 L 102,70 L 96,72 L 90,70 L 86,64 L 84,56 L 84,44 L 84,32 L 86,24 L 92,20 L 100,18 Z",
    label: "NH",
    lx: 96,
    ly: 46,
  },
  VT: {
    path: "M 86,24 L 84,32 L 84,44 L 84,56 L 86,64 L 80,68 L 74,70 L 68,70 L 62,66 L 60,58 L 60,48 L 60,38 L 62,28 L 66,20 L 72,18 L 80,18 Z",
    label: "VT",
    lx: 72,
    ly: 46,
  },
  MA: {
    path: "M 84,74 L 90,70 L 96,72 L 102,70 L 108,66 L 114,62 L 122,66 L 128,72 L 132,78 L 130,84 L 124,88 L 116,90 L 108,92 L 100,92 L 92,90 L 84,88 L 78,84 L 76,78 L 78,72 Z",
    label: "MA",
    lx: 106,
    ly: 80,
  },
  RI: {
    path: "M 108,92 L 116,90 L 120,94 L 122,102 L 118,108 L 112,110 L 106,106 L 104,98 Z",
    label: "RI",
    lx: 113,
    ly: 100,
  },
  CT: {
    path: "M 78,88 L 84,88 L 92,90 L 100,92 L 104,98 L 106,106 L 100,110 L 90,112 L 80,110 L 74,104 L 74,96 L 76,90 Z",
    label: "CT",
    lx: 90,
    ly: 101,
  },
};

// Boston's approximate SVG position (on MA path)
const BOSTON = { x: 120, y: 82 };

export default function CityMapSection() {
  return (
    <section className="relative w-full py-12 md:py-32 overflow-hidden" style={{ background: "#FFF4D6" }}>
      {/* Drip from navy section above */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <MeltingDrip color="#0A2348" height={130} variant="random" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 relative z-10 pt-6 md:pt-10">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-20">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{ background: "rgba(255,78,116,0.15)", color: "#C9232D" }}
            >
              <Sparkles className="w-3.5 h-3.5" /> Statewide Catering Fleet
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] text-[#071B3A] mb-4 sm:mb-6 tracking-tight">
              Serving All of<br />
              <span className="italic font-serif" style={{ color: "#C9232D" }}>New England</span>
            </h2>
            <p className="font-sans text-[clamp(0.95rem,1.4vw,1.25rem)] leading-relaxed" style={{ color: "rgba(26,16,9,0.7)" }}>
              From downtown Boston and Cambridge to Cape Cod, Worcester, the North Shore, and across all New England states. We bring the legendary celebration to your doorstep.
            </p>
          </div>
          <Link
            href="/cities"
            className="font-sans font-bold uppercase tracking-widest text-xs border-b-2 pb-2 transition-colors inline-block"
            style={{ color: "#071B3A", borderColor: "#C9232D" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9232D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#071B3A")}
          >
            Explore 500+ Cities We Serve &rarr;
          </Link>
        </div>

        {/* ─── Map Card ─── */}
        <div
          className="relative w-full max-w-5xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(145deg, #0d1e3a 0%, #071325 50%, #0a1a30 100%)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,78,116,0.3) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />

          {/* Top status bar */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-white/40 text-[0.65rem] font-bold tracking-widest uppercase">
              <Navigation size={12} style={{ color: "#C9232D" }} />
              American Legend — New England Service Map
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-400" />
              <span className="text-white/60 text-[0.6rem] font-bold tracking-widest uppercase">Trucks Active Statewide</span>
            </div>
          </div>

          {/* Map + sidebar */}
          <div className="relative z-10 flex flex-col md:flex-row">

            {/* SVG Map */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
              <div className="relative w-full max-w-sm mx-auto">
                {/* "NEW ENGLAND" badge floating above */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span
                    className="text-[0.55rem] font-black tracking-[0.4em] uppercase px-5 py-1.5 rounded-full"
                    style={{
                      background: "rgba(201,35,45,0.15)",
                      border: "1px solid rgba(201,35,45,0.5)",
                      color: "#e8687a",
                    }}
                  >
                    New England
                  </span>
                </div>

                <svg
                  viewBox="55 0 115 120"
                  className="w-full h-auto"
                  style={{ filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.6))" }}
                  aria-label="New England states map with Boston location"
                >
                  <defs>
                    <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0d2d52" />
                      <stop offset="100%" stopColor="#061520" />
                    </linearGradient>
                    <linearGradient id="stateFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e4278" />
                      <stop offset="100%" stopColor="#132d58" />
                    </linearGradient>
                    <linearGradient id="maFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2c5490" />
                      <stop offset="100%" stopColor="#1e3d70" />
                    </linearGradient>
                    <filter id="pinGlow" x="-150%" y="-150%" width="400%" height="400%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Ocean/background */}
                  <rect x="55" y="0" width="115" height="120" fill="url(#ocean)" />

                  {/* Subtle latitude lines */}
                  {[25, 50, 75, 100].map((y) => (
                    <line key={y} x1="55" y1={y} x2="170" y2={y}
                      stroke="rgba(100,160,255,0.05)" strokeWidth="0.6" />
                  ))}

                  {/* State fills */}
                  {Object.entries(STATE_PATHS).map(([id, s]) => (
                    <path
                      key={id}
                      d={s.path}
                      fill={id === "MA" ? "url(#maFill)" : "url(#stateFill)"}
                      stroke={id === "MA" ? "rgba(201,35,45,0.85)" : "rgba(100,180,255,0.25)"}
                      strokeWidth={id === "MA" ? "1" : "0.6"}
                      strokeLinejoin="round"
                    />
                  ))}

                  {/* State labels */}
                  {Object.entries(STATE_PATHS).map(([id, s]) => (
                    <text
                      key={`lbl-${id}`}
                      x={s.lx}
                      y={s.ly}
                      textAnchor="middle"
                      fontSize={id === "RI" ? "4" : "4.8"}
                      fontWeight="800"
                      fill={id === "MA" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)"}
                      fontFamily="'Inter', sans-serif"
                      letterSpacing="0.1em"
                    >
                      {s.label}
                    </text>
                  ))}

                  {/* Boston pin — animated rings */}
                  <circle cx={BOSTON.x} cy={BOSTON.y} r="12" fill="rgba(201,35,45,0.08)">
                    <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={BOSTON.x} cy={BOSTON.y} r="7" fill="rgba(201,35,45,0.15)" />
                  {/* Pin body */}
                  <circle
                    cx={BOSTON.x} cy={BOSTON.y} r="4"
                    fill="#C9232D"
                    stroke="white" strokeWidth="1.2"
                    filter="url(#pinGlow)"
                  />
                  {/* Inner white dot */}
                  <circle cx={BOSTON.x} cy={BOSTON.y} r="1.5" fill="white" />

                  {/* Boston text */}
                  <text
                    x={BOSTON.x} y={BOSTON.y + 11}
                    textAnchor="middle"
                    fontSize="4.5"
                    fontWeight="900"
                    fill="#ffffff"
                    fontFamily="'Inter', sans-serif"
                    letterSpacing="0.12em"
                    filter="url(#textGlow)"
                  >
                    BOSTON
                  </text>
                  <text
                    x={BOSTON.x} y={BOSTON.y + 17}
                    textAnchor="middle"
                    fontSize="3"
                    fontWeight="600"
                    fill="#e8687a"
                    fontFamily="'Inter', sans-serif"
                  >
                    ● Our Location
                  </text>
                </svg>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="md:w-64 shrink-0 flex flex-col justify-center gap-4 px-6 md:px-8 py-8 border-t md:border-t-0 md:border-l border-white/[0.06]">
              <p className="text-white/30 text-[0.6rem] font-black tracking-[0.3em] uppercase mb-1">Service Coverage</p>

              {[
                { state: "Massachusetts", note: "Full statewide", highlight: true },
                { state: "Connecticut", note: "All major cities" },
                { state: "Rhode Island", note: "Providence & beyond" },
                { state: "Vermont", note: "Available statewide" },
                { state: "New Hampshire", note: "Seacoast to Lakes Region" },
                { state: "Maine", note: "Portland & surrounding" },
              ].map(({ state, note, highlight }) => (
                <div key={state} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: highlight ? "#C9232D" : "rgba(100,160,255,0.4)",
                      boxShadow: highlight ? "0 0 8px rgba(201,35,45,0.7)" : "none",
                    }}
                  />
                  <div>
                    <p className="text-[0.75rem] font-black tracking-wide leading-tight"
                      style={{ color: highlight ? "#fff" : "rgba(255,255,255,0.65)" }}>
                      {state}
                    </p>
                    <p className="text-[0.62rem] font-medium" style={{ color: "rgba(255,255,255,0.28)" }}>{note}</p>
                  </div>
                </div>
              ))}

              <Link
                href="/cities"
                className="mt-3 w-full text-center px-4 py-3 rounded-xl text-[0.7rem] font-black uppercase tracking-widest transition-all"
                style={{
                  background: "rgba(201,35,45,0.12)",
                  border: "1px solid rgba(201,35,45,0.35)",
                  color: "#e8687a",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,35,45,0.28)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,35,45,0.12)";
                  (e.currentTarget as HTMLElement).style.color = "#e8687a";
                }}
              >
                <MapPin className="inline w-3 h-3 mr-1.5" />
                View All Cities
              </Link>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="relative z-10 flex items-center justify-center gap-2 py-4 border-t border-white/[0.05] text-white/25 text-[0.6rem] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            500+ Cities · All 6 New England States · Year-Round Service
          </div>
        </div>

      </div>
    </section>
  );
}

