"use client";

import { useState } from "react";
import Link from "next/link";
import { getTopCities, MASSACHUSETTS_CITIES } from "@/lib/cities-data";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import MeltingDrip from "@/components/shared/MeltingDrip";

// Bounding box for Massachusetts
const MA_BOUNDS = {
  minLng: -73.5,
  maxLng: -69.9,
  minLat: 41.2,
  maxLat: 42.9,
};

function getMapCoords(lat: number, lng: number) {
  const x = ((lng - MA_BOUNDS.minLng) / (MA_BOUNDS.maxLng - MA_BOUNDS.minLng)) * 100;
  const y = 100 - ((lat - MA_BOUNDS.minLat) / (MA_BOUNDS.maxLat - MA_BOUNDS.minLat)) * 100;
  return { x, y };
}

export default function CityMapSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const allCities = MASSACHUSETTS_CITIES;
  const topCities = getTopCities();
  const boston = allCities.find(c => c.slug === "boston");

  return (
    <section className="relative w-full py-12 md:py-32 overflow-hidden" style={{ background: "#FFF4D6" }}>
      {/* Drip from Navy Testimonials Section above */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <MeltingDrip color="#0A2348" height={130} variant="random" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 relative z-10 pt-6 md:pt-10">

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
              <span className="italic font-serif" style={{ color: "#C9232D" }}>Massachusetts</span>
            </h2>
            <p className="font-sans text-[clamp(0.95rem,1.4vw,1.25rem)] leading-relaxed" style={{ color: "rgba(26,16,9,0.7)" }}>
              From downtown Boston and Cambridge to Cape Cod, Worcester, and the North Shore. We bring the legendary celebration to your doorstep.
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

        {/* ─── Interactive Map — Dark Premium Theme ─── */}
        <div
          className="relative w-full max-w-5xl mx-auto aspect-[4/3] sm:aspect-video md:aspect-[16/9] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl group transition-transform duration-700 hover:scale-[1.01]"
          style={{
            background: "linear-gradient(145deg, #1A0A1E 0%, #12071A 40%, #1C0D10 100%)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,78,116,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,78,116,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "5% 5%",
            }}
          />

          {/* Ambient glow — Boston area */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "57%",
              top: "55%",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,78,116,0.18) 0%, transparent 70%)",
              transform: "translate(-50%,-50%)",
            }}
          />
          {/* Ambient glow — West MA */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "15%",
              top: "45%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(217,138,44,0.10) 0%, transparent 70%)",
              transform: "translate(-50%,-50%)",
            }}
          />

          {/* Top Control Bar */}
          <div className="absolute top-0 left-0 w-full p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 z-20 pointer-events-none">
            <div className="flex items-center gap-2 text-white/40 text-[0.65rem] font-bold tracking-widest uppercase">
              <Navigation size={12} style={{ color: "#C9232D" }} />
              Live American Legend Route Network
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-400" />
              <span className="text-white/60 text-[0.6rem] font-bold tracking-widest uppercase">Trucks Active Statewide</span>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-1000">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {boston && topCities.map((city) => {
                if (city.slug === "boston") return null;
                const bCoords = getMapCoords(boston.lat, boston.lng);
                const cCoords = getMapCoords(city.lat, city.lng);
                const isActive = hoveredCity === city.slug || hoveredCity === "boston";

                return (
                  <path
                    key={`line-${city.slug}`}
                    d={`M ${bCoords.x} ${bCoords.y} Q ${(bCoords.x + cCoords.x) / 2} ${(bCoords.y + cCoords.y) / 2 - 6} ${cCoords.x} ${cCoords.y}`}
                    fill="none"
                    stroke={isActive ? "#C9232D" : "rgba(255,78,116,0.35)"}
                    strokeWidth={isActive ? "0.35" : "0.18"}
                    filter={isActive ? "url(#glow)" : undefined}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>

          {/* City Pins */}
          <div className="absolute inset-0 z-10">
            {allCities.map((city) => {
              const coords = getMapCoords(city.lat, city.lng);
              const isHovered = hoveredCity === city.slug;
              const isBoston = city.slug === "boston";
              const isTop = city.isTopCity;

              return (
                <div
                  key={city.slug}
                  className="absolute"
                  style={{
                    left: `${coords.x}%`,
                    top: `${coords.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isHovered ? 50 : isBoston ? 40 : isTop ? 30 : 10,
                  }}
                  onMouseEnter={() => setHoveredCity(city.slug)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <Link href={`/cities/${city.slug}`} className="relative group/pin block">
                    {/* Boston pulse ring */}
                    {isBoston && (
                      <>
                        <div
                          className="absolute rounded-full animate-ping"
                          style={{
                            width: "28px",
                            height: "28px",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            background: "rgba(255,78,116,0.25)",
                          }}
                        />
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: "20px",
                            height: "20px",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            background: "rgba(255,78,116,0.15)",
                            boxShadow: "0 0 20px rgba(255,78,116,0.5)",
                          }}
                        />
                      </>
                    )}

                    {/* The Pin dot */}
                    <div
                      className={cn(
                        "rounded-full transition-all duration-300 relative z-20",
                        isBoston
                          ? "w-3.5 h-3.5 border-2 border-white"
                          : isHovered
                          ? "w-3 h-3 border border-white/80 scale-150"
                          : isTop
                          ? "w-2 h-2 border border-white/30"
                          : "w-1 h-1"
                      )}
                      style={{
                        background: isBoston
                          ? "#C9232D"
                          : isHovered
                          ? "#C99A3D"
                          : isTop
                          ? "rgba(255,78,116,0.7)"
                          : "rgba(255,255,255,0.25)",
                        boxShadow: isBoston
                          ? "0 0 16px rgba(255,78,116,0.8)"
                          : isHovered
                          ? "0 0 12px rgba(217,138,44,0.8)"
                          : isTop
                          ? "0 0 6px rgba(255,78,116,0.4)"
                          : "none",
                      }}
                    />

                    {/* Tooltip - Only render when hovered or for Boston to save 90% of DOM nodes and fix crash */}
                    {(isHovered || (isBoston && !hoveredCity)) && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-lg text-[0.6rem] uppercase tracking-widest font-black whitespace-nowrap shadow-xl pointer-events-none z-30"
                        style={{
                          background: isBoston && !hoveredCity ? "transparent" : "rgba(20,8,28,0.98)",
                          color: isBoston && !hoveredCity ? "#C9232D" : "#fff",
                          border: isBoston && !hoveredCity ? "none" : "1px solid rgba(255,78,116,0.3)",
                        }}
                      >
                        {isBoston && !hoveredCity ? "Boston Area" : city.name}
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bottom hint bar */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-[0.65rem] font-bold tracking-widest uppercase flex items-center gap-2 pointer-events-none px-5 py-2 rounded-full z-20"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <MapPin size={11} style={{ color: "#C9232D" }} /> Hover points to explore coverage
          </div>
        </div>

      </div>
    </section>
  );
}


