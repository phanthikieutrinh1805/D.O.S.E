import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./pages/**/*.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dose: {
          bg: "var(--bg)",
          surface: "var(--surface)",
          text: "var(--text)",
          muted: "var(--text-muted)",
          heading: "var(--heading)",
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          mint: "var(--mint)"
        }
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "Atkinson Hyperlegible", "Segoe UI", "sans-serif"],
        heading: ["Noto Serif Display", "Times New Roman", "serif"]
      },
      boxShadow: {
        dose: "var(--shadow-sm)",
        "dose-md": "var(--shadow-md)"
      },
      borderRadius: {
        dose: "var(--radius-md)",
        "dose-lg": "var(--radius-lg)"
      }
    }
  },
  plugins: [forms]
};
