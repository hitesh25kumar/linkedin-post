/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          blue: '#0A66C2',
          light: '#F3F6F8',
          hover: '#004182',
        }
      }
    },
  },
  plugins: [],
}