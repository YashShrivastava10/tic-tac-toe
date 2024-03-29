import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        draw: 'draw 1s ease forwards',
        win: 'win 1s ease-in alternate infinite'
      },
      keyframes: {
        draw: {
          to: {
            "stroke-dashoffset": "0"
          }
        },
        win: {
          "0%, 100%": {
            transform: "translateY(-20%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
            opacity: "0.5",
          },
        },
      },
    },
    colors: {
      yellow: "#f9d459",
      orange: "#f8b630",
      red: "#f22853",
      white: "#ffffff",
      black: "#000",
      pink: "#fee3ea",
      gray: "#9c9395",
    }
  },
  plugins: [],
}
export default config
