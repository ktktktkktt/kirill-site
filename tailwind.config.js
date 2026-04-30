/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#0A0A0A',
        surface: '#151515',
        card:    '#1E1E1E',
        border:  '#2A2A2A',
        muted:   '#888884',
        light:   '#F5F5F0',
        accent:  '#C8F135',
      },
      fontFamily: {
        display: ['var(--font-unbounded)', 'sans-serif'],
        mono:    ['var(--font-space-mono)', 'monospace'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      })
    },
  ],
}
