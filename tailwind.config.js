import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./src/**/*.{ts,tsx,js}"
  ],
  darkMode: ["selector", "body.dark"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--color-bg)",
          soft: "var(--color-bg-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          strong: "var(--color-surface-strong)",
          accent: "var(--color-surface-accent)",
        },
        "c-border": {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        "c-text": {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
        heading: "var(--color-heading)",
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          soft: "var(--color-primary-soft)",
        },
        secondary: "var(--color-secondary)",
        "c-focus": "var(--color-focus)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        /* Static brand colors */
        dose: {
          blue: "#2563eb",
          sky: "#93c5fd",
          ice: "#eff6ff",
          white: "#ffffff",
          navy: "#101827",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "Atkinson Hyperlegible", "Segoe UI", "Tahoma", "sans-serif"],
        heading: ["Be Vietnam Pro", "Atkinson Hyperlegible", "Segoe UI", "Tahoma", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.2" }],
        sm: ["0.875rem", { lineHeight: "1.35" }],
        base: ["1rem", { lineHeight: "1.65" }],
        md: ["1.125rem", { lineHeight: "1.65" }],
        lg: ["1.25rem", { lineHeight: "1.35" }],
        xl: ["1.5rem", { lineHeight: "1.2" }],
        "2xl": ["1.875rem", { lineHeight: "1.2" }],
        "3xl": ["2.4rem", { lineHeight: "1.2" }],
        "4xl": ["3.5rem", { lineHeight: "1.2" }],
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
      },
      borderRadius: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        pill: "999px",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
      maxWidth: {
        container: "74rem",
      },
      gridTemplateColumns: {
        hero: "minmax(0, 1.2fr) minmax(20rem, 0.8fr)",
        "hero-2col": "minmax(0, 1.05fr) minmax(20rem, 0.95fr)",
        framework: "repeat(12, minmax(0, 1fr))",
        "stories-3": "1.15fr 1fr 0.95fr",
        "footer-2": "1fr auto",
        "sidebar-layout": "18.25rem minmax(0, 1fr)",
      },
      transitionProperty: {
        DEFAULT: "transform, box-shadow, border-color, background-color, color, opacity",
      },
    },
  },
  plugins: [
    forms,
    function ({ addVariant, addUtilities }) {
      /* Accessibility variants */
      addVariant("hc", "body.high-contrast &");
      addVariant("simple", "body.simple-mode &");
      addVariant("rm", "body.reduce-motion &");
      /* Utility for screen-reader only + large text */
      addUtilities({
        ".large-text-active": {
          fontSize: "var(--font-scale, 100%)",
        },
      });
    },
  ],
};
