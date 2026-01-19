import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        espresso: "#18130f",
        latte: "#f7f4f0",
        accent: "#d97706",
        cacao: "#2a1d17",
        sand: "#f3efe9",
        glow: "#fcd34d"
      }
    }
  },
  plugins: []
};

export default config;
