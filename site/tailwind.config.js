/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Markenakzent — exakt aus dem Wallner-Logo (#AAC527)
        lime: {
          DEFAULT: '#AAC527',
          bright: '#C3E02E',
          soft: '#BCD647',
          deep: '#86A017',
          dark: '#5F730F',
        },
        // Dunkle Sections (ersetzt das Navy von BP Marine)
        forest: {
          950: '#060D06',
          900: '#0A140A',
          850: '#0E1C0E',
          800: '#142614',
          700: '#1D341B',
          600: '#2A4726',
        },
        moss: {
          900: '#22401C', // Headline auf hellem Grund (ersetzt #123363)
          700: '#35521F',
          500: '#5A7A3A',
        },
        mist: {
          DEFAULT: '#F3F7EE',
          200: '#E7EEDD',
          400: '#CBD8B8',
        },
      },
      fontFamily: {
        display: ['Rokkitt', 'Rockwell', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '1280px' },
      boxShadow: {
        plate: '0 30px 80px -30px rgba(0,0,0,.65)',
        lift: '0 18px 45px -18px rgba(0,0,0,.5)',
        limeGlow: '0 14px 40px -12px rgba(170,197,39,.45)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        fadeUp: 'fadeUp .6s ease-out both',
      },
    },
  },
  plugins: [],
}
