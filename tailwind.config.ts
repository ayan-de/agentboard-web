import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#0a0a0a',
        },
        foreground: {
          light: '#1a1a1a',
          dark: '#eeeeee',
        },
        muted: {
          light: '#8a8a8a',
          dark: '#808080',
        },
        accent: {
          light: '#3b7dd8',
          dark: '#fab283',
        },
        secondary: {
          light: '#7b5bb6',
          dark: '#5c9cf5',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
