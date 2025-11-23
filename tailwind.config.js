import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f5f8ff",
          100: "#e6effe",
          200: "#c1d8fd",
          300: "#8fb9fb",
          400: "#5694f8",
          500: "#2d72f5",
          600: "#1756d6",
          700: "#1244a6",
          800: "#143f85",
          900: "#173768",
        },
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [typography],
};
