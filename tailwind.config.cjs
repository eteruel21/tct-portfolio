/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseLight: {
          "0%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
          "100%": { opacity: "0.3", transform: "scale(1)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-out forwards",
        fadeInUpSlow: "fadeInUp 1.8s ease-out forwards",
        pulseLight: "pulseLight 2.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
