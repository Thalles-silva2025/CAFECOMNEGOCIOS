import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        espresso: "#1c1917",
        latte: "#f8f4f1",
        accent: "#b45309"
      }
    }
  },
  plugins: []
};

export default config;
