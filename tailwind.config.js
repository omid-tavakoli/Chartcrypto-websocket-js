/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        changeBackground: 'changeBackground 2s ease-in-out ',
      },
      keyframes: {
        changeBackground: {
          '0%' : {  background : '#fff'},
          '100%': { background : '#ffd2df' },
        }
      }
    },
  },
  plugins: [],
}

