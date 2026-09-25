"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Curated professional Unsplash images (Ice cream, summer, parties, happy people)
// Using random query params or specific IDs to ensure high quality
const MEMORY_IMAGES = [
  "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=600&q=80", // kids eating ice cream
  "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80", // ice cream cone
  "https://images.unsplash.com/photo-1517242027094-631f8c218a0f?auto=format&fit=crop&w=600&q=80", // party / event
  "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80", // colorful
  "https://images.unsplash.com/photo-1517260911058-0fcfd7337c2f?auto=format&fit=crop&w=600&q=80", // celebration
  "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80", // vintage truck/van vibe
  "https://images.unsplash.com/photo-1558231587-0b1a0fa2e3c0?auto=format&fit=crop&w=600&q=80", // kids summer
  "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=600&q=80", // ice cream
  "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80", // friends eating ice cream
];

export default function MemoryWall() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Container for the masonry effect */}
      <div className="absolute inset-0 flex gap-4 md:gap-8 opacity-[0.15] mix-blend-luminosity rotate-[-5deg] scale-125 -translate-y-20">
        {/* Column 1 - Marquee Up */}
        <div className="w-1/3 md:w-1/4 flex flex-col gap-4 md:gap-8 animate-marquee-up">
          {[...MEMORY_IMAGES, ...MEMORY_IMAGES].slice(0, 6).map((src, i) => (
            <div key={`col1-${i}`} className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={src} alt="Memory" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>

        {/* Column 2 - Marquee Down */}
        <div className="w-1/3 md:w-1/4 flex flex-col gap-4 md:gap-8 animate-marquee-down -translate-y-1/2">
          {[...MEMORY_IMAGES, ...MEMORY_IMAGES].slice(3, 9).map((src, i) => (
            <div key={`col2-${i}`} className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image src={src} alt="Memory" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>

        {/* Column 3 - Marquee Up */}
        <div className="w-1/3 md:w-1/4 flex flex-col gap-4 md:gap-8 animate-marquee-up animation-delay-500">
          {[...MEMORY_IMAGES, ...MEMORY_IMAGES].slice(6, 12).map((src, i) => (
            <div key={`col3-${i}`} className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={src} alt="Memory" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>

        {/* Column 4 - Marquee Down (Hidden on mobile) */}
        <div className="hidden md:flex w-1/4 flex-col gap-8 animate-marquee-down -translate-y-1/4">
          {[...MEMORY_IMAGES, ...MEMORY_IMAGES].slice(1, 7).map((src, i) => (
            <div key={`col4-${i}`} className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={src} alt="Memory" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays to blur and fade the edges into the background color */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-cream via-transparent to-cream" />
    </div>
  );
}