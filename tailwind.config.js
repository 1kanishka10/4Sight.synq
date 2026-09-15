/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#050B1E",
        surface: "#0C1631",
        sky: { DEFAULT: "#8FC0FF", 50: "#C3DCFF" },
        ocean: { DEFAULT: "#2F5FE0", light: "#4C7BF5", dark: "#1B3FA8" },
        slate: { DEFAULT: "#8494B8" },
        ink: "#EAF0FF",
        critical: "#FF6B5A",
        high: "#FFB547",
        medium: "#35D39A",
      },
      fontFamily: {
        display: ["Manrope", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: { xs: "2px" },
      boxShadow: {
        panel: "inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 44px -24px rgba(0,0,0,0.95)",
        lift: "inset 0 1px 0 rgba(255,255,255,0.08), 0 28px 60px -28px rgba(0,0,0,1)",
        glow: "0 10px 30px -12px rgba(47,95,224,0.85)",
      },
      borderRadius: { xl2: "20px" },
      letterSpacing: { tightest: "-0.028em" },
    },
  },
  plugins: [],
};
