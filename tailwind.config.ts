import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-open-sans)", "sans-serif"]
      },
      maxWidth: {
        content: "1280px"
      }
    }
  },
  plugins: []
};

export default config;
