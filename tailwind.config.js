/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/app.vue",
    "./src/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0B2447',
        'secondary': '#0D2952',
        'accent': '#051831',
        'tint': '#DD00D4',
        'primary-bg': '#0B2447',
        'secondary-bg': '#0D2952'
      },
      screens: {
        'sm': '564px',
        'md': '864px',
        'lg': '1024px',
        'xl': '1240px'
      },
      animation: {
        "progress-bar": "progress ",
        "accordion-down": "accordion-down .2s ease-out",
        "accordion-up": "accordion-up .5s ease-out",
        "slide-left": "slide-left 0.3s ease-out",
        "slide-right": "slide-right 0.3s ease-out",
      },
      keyframes: {
        "progress": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "accordion-down": {
          from: { transform: "translateY(-5%)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "slide-left": {
          from: { transform: "translateX(-40%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "slide-right": {
          from: { transform: "translateX(40%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "accordion-up": {
          from: { transform: "translateY(5%)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        }
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDuration') }
      )
    }),
  ],
}

