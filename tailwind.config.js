/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#151823",
        canvas: "#0B0D14",
        sky: {
          DEFAULT: "#83B3CA",
          50: "#EDF4F7",
        },
        ocean: {
          DEFAULT: "#19719C",
          light: "#2489BB",
          dark: "#125277",
        },
        slate: {
          DEFAULT: "#5C5C68",
        },
        ink: "#F4F5F7",
        critical: "#C1442D",
        high: "#C17A1F",
        medium: "#1F7A5C",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        panel: "0 8px 30px rgba(0, 0, 19, 0.08)",
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};
