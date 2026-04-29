import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF5A1F",
          primaryDark: "#E14D16",
          primarySoft: "#FFF0E8",
          background: "#FCFAF7",
          surface: "#FFFFFF",
          surfaceAlt: "#F6F1EB",
          text: "#171311",
          textSoft: "#4F4742",
          muted: "#8A7F77",
          border: "#E7DED6",
          gold: "#FFB84D",
          lime: "#C7F36B"
        }
      },
      borderRadius: {
        xl2: "20px"
      }
    },
  },
  plugins: [],
} satisfies Config;
