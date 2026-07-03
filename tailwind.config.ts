import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FEECEA",
          100: "#FBCFCA",
          200: "#F7A69C",
          300: "#F27F72",
          400: "#EF5949",
          500: "#ED3425",
          600: "#C7220F",
          700: "#9C1B0C",
          800: "#711309",
          900: "#470B05",
        },
        // Accent cool para el metáfora "vidrio" (usado solo en el SVG del DVH
        // y en el foco accesible, no en CTAs).
        aqua: {
          400: "#67E8F9",
          500: "#22D3EE",
          600: "#0891B2",
        },
        ink: {
          DEFAULT: "#0A1420",
          soft: "#1A2536",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 10px 30px -12px rgba(10,20,32,0.25)",
        glow: "0 0 0 1px rgba(237,52,37,0.35), 0 20px 60px -20px rgba(237,52,37,0.35)",
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(to right, rgba(237,52,37,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,52,37,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
