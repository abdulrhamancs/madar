/** @type {import('tailwindcss').Config} */

// Semantic colours are driven by CSS custom properties defined in src/styles.css
// (space-separated RGB channels so Tailwind's <alpha-value> modifiers still work).
// A component never needs to know which theme is active — it writes `bg-surface`,
// and the `.dark` class on <html> swaps the underlying value.
const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        canvas: themed("canvas"),
        surface: themed("surface"),
        raised: themed("raised"),
        ink: themed("ink"),
        muted: themed("muted"),
        faint: themed("faint"),
        accent: themed("accent"),
        "accent-strong": themed("accent-strong"),
        "on-accent": themed("on-accent"),
        divider: themed("divider"),
        control: themed("control"),
        success: themed("success"),
        warning: themed("warning"),
        danger: themed("danger"),
        info: themed("info"),
        "on-status": themed("on-status"),
      },
      fontFamily: {
        // Both families ship Arabic + Latin, so the stack never swaps by language.
        display: ['"Noto Kufi Arabic"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
      },
      fontSize: {
        micro: ["0.75rem", { lineHeight: "1.4" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.7" }],
        h3: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        h2: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h1: ["2rem", { lineHeight: "1.25", fontWeight: "600" }],
        display: ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.12", fontWeight: "800" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        raised: "0 1px 2px rgb(16 32 64 / 0.06)",
        overlay: "0 16px 40px rgb(16 32 64 / 0.16)",
      },
      zIndex: {
        nav: "40",
        sticky: "50",
        drawer: "60",
        scrim: "70",
        modal: "80",
        toast: "90",
        intro: "100",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
        standard: "cubic-bezier(0.2, 0, 0.2, 1)",
      },
      transitionDuration: {
        instant: "100ms",
        quick: "160ms",
        settle: "240ms",
        enter: "320ms",
        exit: "200ms",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "none" },
        },
        "sheet-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "none" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "draw-orbit": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 240ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "sheet-up": "sheet-up 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 1.6s infinite",
        "draw-orbit": "draw-orbit 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
