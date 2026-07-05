import type { Config } from "tailwindcss";

// NEXUS design system — an "AI ops console" identity.
// Deep space base, violet + cyan signal colors, warm alert accent.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#05070C",
          900: "#0B0E14",
          800: "#11151F",
          700: "#181D2B",
          600: "#232941",
        },
        signal: {
          violet: "#7C5CFF",
          "violet-dim": "#5B42BF",
          cyan: "#00E5C7",
          amber: "#FF6B4A",
        },
        ink: {
          100: "#F2F3F8",
          300: "#C4C8D6",
          500: "#8890A6",
          700: "#565D75",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "mesh-glow":
          "radial-gradient(60% 50% at 20% 0%, rgba(124,92,255,0.18) 0%, rgba(124,92,255,0) 60%), radial-gradient(50% 40% at 85% 15%, rgba(0,229,199,0.14) 0%, rgba(0,229,199,0) 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        glow: "0 0 0 1px rgba(124,92,255,0.4), 0 0 24px rgba(124,92,255,0.25)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-400px 0" }, "100%": { backgroundPosition: "400px 0" } },
        "pulse-ring": { "0%": { transform: "scale(0.9)", opacity: "0.6" }, "100%": { transform: "scale(1.6)", opacity: "0" } },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
