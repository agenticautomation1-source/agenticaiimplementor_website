/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        /* === Stitch design tokens === */
        primary: "#00f5ff",
		'accent-cyan': '#14b8c4',
        obsidian: "#050505",
        charcoal: "#0f1115",
        "slate-panel": "#1a1d23",

        /* === Existing app === */
        "background-dark": "#020203",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        h1: ["4rem", { lineHeight: "1.15" }],
        h2: ["3rem", { lineHeight: "1.2" }],
        h3: ["2.25rem", { lineHeight: "1.3" }],
        h4: ["1.75rem", { lineHeight: "1.4" }],
        base: ["1rem", { lineHeight: "1.6" }]
      }
    }
  },
  plugins: []
};
