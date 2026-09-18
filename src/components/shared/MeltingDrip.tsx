"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export interface MeltingDripProps {
  className?: string;
  color?: string;
  /** 
   * Total pixel height of the drip zone. 
   * Make this TALL (300–600px) so drips reach into section text. 
   */
  height?: number | string;
  variant?: "random" | "left-heavy" | "right-heavy" | "center-heavy" | "default";
}

/**
 * MeltingDrip — Realistic downward-flowing ice cream drip.
 *
 * HOW TO USE:
 *   Place this as `position: absolute; top: 0; left: 0; right: 0; z-index: 0`
 *   inside the RECEIVING section. Give it a TALL height (300-600px) so the
 *   longest drips reach all the way down into the text content.
 *   The `color` must match the BACKGROUND OF THE SECTION ABOVE.
 *   Text content should be `relative z-10` so it sits ON TOP of the drips.
 *
 * Ice cream NEVER melts upwards!
 */
export default function MeltingDrip({
  className,
  color = "#FFFBF5",
  height = 320,
  variant = "default",
}: MeltingDripProps) {

  const dripPath = useMemo(() => {
    const width = 1440;
    // The solid "ceiling" from which drips hang. Small so the drip starts immediately.
    const baseY = 12;
    // Max drip length within the SVG viewBox (viewBox height is 600)
    const maxDripLength = 580;

    // Drip length ratios (0–1). 1.0 = full maxDripLength
    const dripsDefault = [
      0.25, 0.80, 0.45, 0.95, 0.35, 0.72, 1.00, 0.48, 0.65, 0.22,
      0.88, 0.55, 0.78, 0.32, 0.70, 0.18, 0.62, 0.90, 0.42, 0.75,
      0.30, 0.85, 0.50, 0.20, 0.68
    ];

    const dripsLeftHeavy = [
      1.00, 0.95, 0.90, 0.85, 0.80, 0.70, 0.60, 0.50, 0.40, 0.55,
      0.45, 0.35, 0.28, 0.20, 0.38, 0.30, 0.18, 0.12, 0.22, 0.10,
      0.18, 0.08, 0.05, 0.10, 0.04
    ];

    const dripsRightHeavy = [...dripsLeftHeavy].reverse();

    const dripsCenterHeavy = [
      0.08, 0.18, 0.32, 0.48, 0.58, 0.70, 0.82, 0.90, 0.96, 1.00,
      1.00, 0.96, 0.90, 1.00, 0.92, 0.80, 0.68, 0.55, 0.45, 0.35,
      0.25, 0.16, 0.08, 0.18, 0.08
    ];

    // Static "random" array — no Math.random() to avoid SSR hydration mismatch
    const dripsRandom = [
      0.80, 0.20, 0.95, 0.42, 0.30, 0.75, 1.00, 0.60, 0.18, 0.88,
      0.50, 0.82, 0.38, 0.68, 0.22, 0.65, 0.92, 0.35, 0.78, 0.45,
      0.90, 0.55, 0.28, 0.72, 0.15
    ];

    let drips = dripsDefault;
    if (variant === "left-heavy")    drips = dripsLeftHeavy;
    if (variant === "right-heavy")   drips = dripsRightHeavy;
    if (variant === "center-heavy")  drips = dripsCenterHeavy;
    if (variant === "random")        drips = dripsRandom;

    const numDrips = drips.length;
    const spacing = width / numDrips;

    // Start: full-width top rectangle
    let d = `M 0 0 L ${width} 0 L ${width} ${baseY} `;

    // Draw individual drips right → left using cubic beziers
    for (let i = numDrips - 1; i >= 0; i--) {
      const startX = (i + 1) * spacing;
      const endX   = i       * spacing;
      const midX   = (startX + endX) / 2;

      const dripY = baseY + maxDripLength * drips[i];

      // Narrow, rounded teardrop shape
      d += `C ${startX - spacing * 0.08} ${baseY}, ${midX + spacing * 0.18} ${dripY}, ${midX} ${dripY} `;
      d += `C ${midX - spacing * 0.18} ${dripY}, ${endX   + spacing * 0.08} ${baseY}, ${endX}   ${baseY} `;
    }

    d += `L 0 0 Z`;
    return d;
  }, [variant]);

  const svgHeight = 600;

  return (
    <div
      className={cn(
        "w-full pointer-events-none select-none",
        className
      )}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        // Let SVG overflow below the div so long drips are always visible
        overflow: "visible",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1440 ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
      >
        <path d={dripPath} fill={color} />
      </svg>
    </div>
  );
}
