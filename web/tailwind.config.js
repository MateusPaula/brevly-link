import { theme } from 'tailwindcss/defaultConfig'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...theme.fontFamily.sans]
      },
      colors: {
        'blue-base': '#2C4091'
      }
    },
  },
  plugins: [],
}

