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
        // Nike-Style Professional Palette
        'ultra': {
          'black': '#000000',
          'white': '#FFFFFF',
          'gold': '#F59E0B',
          'gray': {
            '900': '#0A0A0A',
            '800': '#1A1A1A',
            '700': '#2A2A2A',
            '600': '#3A3A3A',
            '500': '#5A5A5A',
            '400': '#7A7A7A',
            '300': '#9A9A9A',
            '200': '#BABABA',
            '100': '#DADADA',
          },
          'success': '#10B981',
          'danger': '#DC2626',
          'warning': '#F59E0B',
        },
        // Legacy support
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