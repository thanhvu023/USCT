/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  plugins: [daisyui],

};
