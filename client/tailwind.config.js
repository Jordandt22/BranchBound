/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["var(--font-family-merriweather)"],
        inter: ["var(--font-family-inter)"],
        oswald: ["var(--font-family-oswald)"],
        playfair: ["var(--font-family-playfair)"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        button: "var(--shadow-button)",
        "button-hover": "var(--shadow-button-hover)",
        error: "var(--shadow-error)",
        logo: "var(--shadow-logo)",
      },
      colors: {
        "base-bg": "var(--color-base-bg)",
        surface: "var(--color-surface)",
        "surface-hover": "var(--color-surface-hover)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "accent-primary": "var(--color-accent-primary)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-subtle": "var(--color-accent-subtle)",
        "accent-secondary": "var(--color-accent-secondary)",
        error: "var(--color-error)",
        orange: "var(--color-orange)",
      },
    },
  },
  plugins: [],
};
