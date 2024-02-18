/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', // purge all unused styles in these files
    './public/index.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

