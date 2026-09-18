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
        // ─── Core Brand Palette ───────────────────────────────────
        // Artisanal Dessert — STRICTLY ZERO blue/navy
        cream:      "#FFFBF5",
        sand:       "#F5EDE3",

        // Rich Dark Belgian Chocolate (replaces navy)
        navy:       "#1A1009",
        "navy-mid": "#2C1A10",
        cocoa: {
          DEFAULT: "#1A1009",
          mid:     "#2C1A10",
          light:   "#4A3022",
        },
        chocolate:  "#2C1A10",

        // Strawberry / Raspberry Glaze
        coral: {
          DEFAULT: "#FF4E74",
          dark:    "#E63860",
          light:   "#FF7B99",
        },
        strawberry: "#FF4E74",

        // Caramel / Golden Waffle Cone
        gold: {
          DEFAULT: "#D98A2C",
          light:   "#F7D7A0",
          warm:    "#E5A84B",
        },
        caramel:    "#D98A2C",
        waffle:     "#E5A84B",

        // Pistachio Cream Mint
        mint: {
          DEFAULT: "#2E9365",
          light:   "#E7F6EF",
        },
        pistachio:  "#2E9365",

        // Neutrals / Espresso
        charcoal:   "#241812",

        // Status
        success:    "#2E9365",
        error:      "#E63860",
        warning:    "#D98A2C",
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
        soft:       "0 4px 20px -2px rgba(26, 16, 9, 0.05)",
        lift:       "0 10px 40px -10px rgba(26, 16, 9, 0.1)",
        drip:       "0 12px 28px -6px rgba(26, 16, 9, 0.18)",
        coral:      "0 8px 32px rgba(255, 78, 116, 0.35)",
        "coral-lg": "0 16px 48px rgba(255, 78, 116, 0.40)",
        gold:       "0 4px 20px rgba(217, 138, 44, 0.30)",
        float:      "0 20px 40px -15px rgba(26, 16, 9, 0.06)",
      },

      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.33%)" },
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
