// ============================================================
// FRAMER MOTION ANIMATION VARIANTS — GLOBAL ANIMATION LIBRARY
// Use these consistently across every component
// ============================================================

import type { Variants, Transition } from "framer-motion";

// ─── TRANSITIONS ─────────────────────────────────────────────

export const transitions = {
  smooth: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } satisfies Transition,
  spring: { type: "spring", stiffness: 300, damping: 30 } satisfies Transition,
  springBounce: { type: "spring", stiffness: 400, damping: 20 } satisfies Transition,
  slow: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } satisfies Transition,
  fast: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } satisfies Transition,
} as const;

// ─── ENTRANCE VARIANTS ───────────────────────────────────────

/** Fade up — primary entrance animation for sections */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] },
  },
};

/** Fade in — simple opacity reveal */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

/** Scale in — cards, badges, floating elements */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
  },
};

/** Slide in from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
  },
};

/** Hero headline — blur to sharp reveal */
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] },
  },
};

// ─── CONTAINER VARIANTS (stagger children) ──────────────────

/** Stagger container — wrap around cards/items to stagger */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container — slower stagger for hero elements */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── HOVER VARIANTS ──────────────────────────────────────────

/** Card lift — used on all hoverable cards */
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: transitions.spring,
  },
};

/** Subtle lift — for small interactive elements */
export const liftHover = {
  rest: { y: 0 },
  hover: { y: -3, transition: transitions.spring },
};

/** Button hover — CTA buttons */
export const buttonHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -2,
    scale: 1.02,
    transition: { duration: 0.15, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  },
  tap: { scale: 0.97 },
};

// ─── FLOATING ANIMATIONS ─────────────────────────────────────

/** Gentle float — 3D decorative elements */
export const floatAnimation = {
  y: [0, -14, 0],
  rotate: [-2, 2, -2],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
  },
};

/** Slow float — subtle background elements */
export const slowFloatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
  },
};

/** Pulse — trust badges, beacons */
export const pulseAnimation = {
  scale: [1, 1.06, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
    delay: 0.5,
  },
};

// ─── SCROLL REVEAL PRESETS ───────────────────────────────────

/** Default viewport config for scroll-triggered animations */
export const scrollViewport = {
  once: true,
  margin: "-80px",
} as const;

/** Standard scroll reveal — most components */
export const scrollReveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: scrollViewport,
};

// ─── PAGE TRANSITIONS ─────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

// ─── UTILITY ─────────────────────────────────────────────────

/** Get stagger delay for nth item */
export function getStaggerDelay(index: number, base = 0.08): number {
  return index * base;
}
