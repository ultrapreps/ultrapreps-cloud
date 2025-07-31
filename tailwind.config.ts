import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'dna-blue': '#1E3A8A',
        'dna-gold': '#F59E0B',
        'dna-orange': '#F97316',
        'dna-black': '#111827',
        'dna-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}

export default config