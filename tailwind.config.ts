import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── American Legend Brand Palette ──────────────────────
        // Primary Palette
        navy: {
          DEFAULT: "#071B3A", // Deep Navy
          mid:     "#0D2B57", // Mid Navy
          light:   "#123E73", // Heritage Blue
        },
        red: {
          DEFAULT: "#C9232D", // American Red
          dark:    "#A31B24", // Dark Red
          light:   "#E03040", // Light Red
        },

        // Cream & Warm Whites
        cream:       "#FFF4D6", // Vanilla Cream
        "warm-white": "#FFFDF8", // Warm White
        parchment:   "#F5EAC8", // Parchment
        ivory:       "#FAF6EC", // Ivory
        white:       "#FFFFFF",

        // Gold Accents
        gold: {
          DEFAULT: "#C99A3D", // Antique Gold
          light:   "#E8C06A", // Light Gold
          dark:    "#A67C28", // Dark Gold
        },

        // Neutrals
        charcoal:    "#171717",
        gray: {
          700: "#2D2D2D",
          500: "#6B6B6B",
          300: "#BDBDBD",
          100: "#F5F5F0",
        },

        // Semantic Colors
        success:     "#2A7A4B",
        error:       "#C9232D",
        warning:     "#C99A3D",

        // Aliases for backward compatibility in codebase
        coral: {
          DEFAULT: "#C9232D",
          dark:    "#A31B24",
          light:   "#E03040",
        },
        mint: {
          DEFAULT: "#2A7A4B",
          light:   "#E8F5EE",
        },
        chocolate: "#171717",
        cocoa: {
          DEFAULT: "#171717",
          mid: "#2D2D2D",
          light: "#6B6B6B",
        }
      },

      fontFamily: {
        sans:    ["var(--font-outfit)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      boxShadow: {
        soft:       "0 4px 20px -2px rgba(7, 27, 58, 0.05)",
        lift:       "0 10px 40px -10px rgba(7, 27, 58, 0.1)",
        drip:       "0 12px 28px -6px rgba(7, 27, 58, 0.15)",
        coral:      "0 8px 32px rgba(201, 35, 45, 0.35)",
        "coral-lg": "0 16px 48px rgba(201, 35, 45, 0.40)",
        gold:       "0 4px 20px rgba(201, 154, 61, 0.30)",
        float:      "0 20px 40px -15px rgba(7, 27, 58, 0.06)",
      },

      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.33%)" },
        },
        "marquee-up": {
          "0%":   { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-down": {
          "0%":   { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0%)" },
        },
        blob: {
          "0%":   { transform: "translate(0,0) scale(1)",     borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" },
          "33%":  { transform: "translate(30px,-50px) scale(1.1)", borderRadius: "70% 30% 50% 50% / 30% 30% 70% 70%" },
          "66%":  { transform: "translate(-20px,20px) scale(0.9)", borderRadius: "100% 60% 60% 100% / 100% 100% 60% 60%" },
          "100%": { transform: "translate(0,0) scale(1)",     borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-15px)" },
        },
        dripFlow: {
          "0%, 100%": { transform: "translateY(0px) scaleY(1)" },
          "50%":      { transform: "translateY(6px) scaleY(1.08)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      animation: {
        marquee:   "marquee 30s linear infinite",
        "marquee-up": "marquee-up 40s linear infinite",
        "marquee-down": "marquee-down 40s linear infinite",
        blob:      "blob 20s infinite ease-in-out alternate",
        float:     "float 4s ease-in-out infinite",
        dripFlow:  "dripFlow 6s ease-in-out infinite",
        shimmer:   "shimmer 2.5s linear infinite",
        fadeUp:    "fadeUp 0.6s ease-out both",
        scaleIn:   "scaleIn 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
