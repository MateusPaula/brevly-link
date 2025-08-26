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
        'blue-base': '#2C46B1',
        'blue-dark': '#2C4091',
        'danger': '#B12C4D'
      },
      animation: {
        'loading-line': 'loading-line 1.2s ease-in-out infinite'
      },
      keyframes: {
        'loading-line': {
          '0%': { transform: 'translateX(-100%) scaleX(0.3)', opacity: '0' },
          '100%': { transform: 'translateX(100%) scaleX(0.3)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}

