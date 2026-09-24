"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MeltingDripProps {
  className?: string;
  color?: string;
  height?: number | string;
  variant?: "random" | "left-heavy" | "right-heavy" | "center-heavy" | "default";
}

/**
 * High-End Styled Shape Divider
 * Replaces the cartoonish drip with a fluid, elegant, premium liquid wave 
 * that maintains the ice cream theme but looks like a million bucks.
 */
export default function MeltingDrip({
  className,
  color = "#FFF4D6",
  height = 100, // Reduced height for elegance
}: MeltingDripProps) {
  // A perfectly smooth, Bezier-curved liquid wave. 
  // It gives the feeling of melting cream, but controlled and artistic.
  const pathData = "M0,0 V40 Q150,100 300,50 T600,60 T900,40 T1200,80 V0 Z";

  return (
    <div 
      className={cn("absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none transform -translate-y-[1px]", className)}
      style={{ height: `${height}px` }}
    >
      {/* Animated fluid wave */}
      <motion.svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-[200%] sm:w-[120%] h-full block"
        initial={{ x: "-10%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{
          filter: "drop-shadow(0 10px 15px rgba(7, 27, 58, 0.05))"
        }}
      >
        <path d={pathData} fill={color} />
      </motion.svg>

      {/* A second delayed wave for a luxurious 3D layered liquid effect */}
      <motion.svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-[200%] sm:w-[120%] h-full block opacity-40"
        initial={{ x: "0%" }}
        animate={{ x: "-10%" }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <path d="M0,0 V60 Q200,20 400,70 T800,30 T1200,60 V0 Z" fill={color} />
      </motion.svg>
      
      {/* Solid cap to prevent 1px gaps */}
      <div 
        className="absolute top-0 left-0 right-0 h-[4px] -translate-y-1"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
