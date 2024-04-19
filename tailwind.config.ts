import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 0.5s forwards',
      },
      keyframes: {
        slideInRight: {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

