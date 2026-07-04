import type { Config } from "tailwindcss";

/**
 * RetailPOS.biz design tokens.
 * Palette: "ink" navy for text/dark sections, "brand" commerce blue,
 * "accent" tangerine for primary CTAs, "ledger" green for positive metrics,
 * "paper" neutrals and a warm "receipt" tone for the signature receipt motif.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F1B2D",
          soft: "#33415C",
          muted: "#5B677D",
        },
        brand: {
          50: "#EDF2FE",
          100: "#DCE6FD",
          200: "#B6CBFA",
          400: "#4D79E8",
          500: "#2F5FDC",
          600: "#2050C8",
          700: "#1B419F",
          800: "#16357F",
          900: "#122A63",
        },
        accent: {
          400: "#FB8A3C",
          500: "#F26B1D",
          600: "#DA5A10",
        },
        ledger: {
          500: "#0E9F6E",
          600: "#0B855C",
        },
        paper: {
          DEFAULT: "#F7F8FA",
          deep: "#EFF1F5",
        },
        line: "#E5E8EF",
        receipt: "#FDFBF4",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.125rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      maxWidth: { site: "76rem" },
      borderRadius: { xs: "0.25rem", sm: "0.375rem", DEFAULT: "0.5rem", lg: "0.75rem", xl: "1rem" },
      boxShadow: {
        card: "0 1px 2px rgba(15,27,45,0.06), 0 4px 16px rgba(15,27,45,0.06)",
        raised: "0 2px 4px rgba(15,27,45,0.08), 0 12px 32px rgba(15,27,45,0.10)",
        menu: "0 8px 40px rgba(15,27,45,0.14)",
      },
      backgroundImage: {
        barcode:
          "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 5px, currentColor 5px 6px, transparent 6px 11px, currentColor 11px 14px, transparent 14px 18px)",
      },
    },
  },
  plugins: [],
};

export default config;
