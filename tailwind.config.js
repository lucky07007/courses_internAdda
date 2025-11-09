// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // The 'content' array tells Tailwind where your HTML/JS files are located.
  // We specify the 'pages' and 'components' folders.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
