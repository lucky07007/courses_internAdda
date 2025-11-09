// postcss.config.js
module.exports = {
  plugins: {
    // 1. Run Tailwind CSS to process the directives in globals.css and generate styles.
    tailwindcss: {},
    // 2. Run Autoprefixer to ensure styles work across all major browsers.
    autoprefixer: {},
  },
}
