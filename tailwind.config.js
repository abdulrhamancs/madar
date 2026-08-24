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
        deep: themed("deep"),
        ink: themed("ink"),
        muted: themed("muted"),
        faint: themed("faint"),
        accent: themed("accent"),
        "accent-strong": themed("accent-strong"),
        "on-accent": themed("on-accent"),
        espresso: themed("espresso"),
        cherry: themed("cherry"),
        "cherry-soft": themed("cherry-soft"),
        "on-espresso": themed("on-espresso"),
        divider: themed("divider"),
        control: themed("control"),
        success: themed("success"),
        warning: themed("warning"),
        danger: themed("danger"),
        info: themed("info"),
        "on-status": themed("on-status"),
      },
      fontFamily: {
        // One typeface carries the identity, in two optical cuts.
        // Latin is scoped to tracked labels and numerals.
        brand: ["var(--font-brand)"],
        display: ["var(--font-display)"],
        ui: ["var(--font-ui)"],
        latin: ["var(--font-latin)"],
      },
      // Editorial scale. Arabic carries more ink per line than Latin, so every
      // step keeps a generous leading and headings stay off the heaviest weights.
      fontSize: {
        micro: ["0.8125rem", { lineHeight: "1.55" }],
        small: ["0.9375rem", { lineHeight: "1.7" }],
        body: ["1.0625rem", { lineHeight: "1.85" }],
        lead: ["1.25rem", { lineHeight: "1.9", fontWeight: "300" }],
        h4: ["1.1875rem", { lineHeight: "1.5", fontWeight: "500" }],
        h3: ["1.375rem", { lineHeight: "1.45", fontWeight: "500" }],
        h2: ["clamp(1.625rem, 3vw, 2.125rem)", { lineHeight: "1.3", fontWeight: "500" }],
        h1: ["clamp(2rem, 4vw, 2.75rem)", { lineHeight: "1.2", fontWeight: "500" }],
        display: ["clamp(2.5rem, 5.5vw, 4rem)", { lineHeight: "1.16", fontWeight: "500" }],
        hero: ["clamp(3rem, 7.5vw, 5rem)", { lineHeight: "1.1", fontWeight: "500" }],
      },
      maxWidth: {
        shell: "78rem",
        measure: "62ch",
      },
      spacing: {
        gutter: "var(--gutter)",
        section: "clamp(4.5rem, 9vw, 8.5rem)",
      },
      borderRadius: {
        sm: "3px",
        md: "6px",
        lg: "10px",
        xl: "16px",
        card: "14px",
      },
      // Minimal by design: depth comes from hairlines and warm fills, not shadow.
      boxShadow: {
        raised: "0 1px 2px rgb(43 33 27 / 0.04)",
        lift: "0 12px 32px -18px rgb(43 33 27 / 0.28)",
        overlay: "0 24px 60px -20px rgb(43 33 27 / 0.35)",
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
        standard: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      transitionDuration: {
        quick: "180ms",
        settle: "320ms",
        enter: "620ms",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 18px, 0)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "none" },
        },
        "sheet-up": {
          from: { transform: "translate3d(0, 100%, 0)" },
          to: { transform: "none" },
        },
      },
      animation: {
        "fade-up": "fade-up 620ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "sheet-up": "sheet-up 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
