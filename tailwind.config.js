/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "/index.html",
    "./src/**/*.{html,js,jsx}"
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      gap:{
        86: "24rem"
      },
      colors: {
        'primary': 'rgb(174, 123, 143)',
        'secondary': '#A7C7B5'
      }
    },
  },
  plugins: [],
}

