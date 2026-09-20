/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.875rem',
        sm: '1.25rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        background: '#F7F0E4',
        foreground: '#2C2824',
        primary: '#E12D2D',
        secondary: '#EDE4D4',
        dark: '#1A1814',
        ink: '#1A1814',
        cream: '#F7F0E4',
        paper: '#EDE4D4',
        charcoal: '#2B2B2B',
        'charcoal-lift': '#3A3A3A',
        surface: '#3A3A3A',
        ochre: '#E8A017',
        teal: '#1F8A7A',
        cobalt: '#2B5EA8',
        coral: '#E85D4C',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        josefin: ['"Archivo Black"', 'sans-serif'],
        work: ['"Source Sans 3"', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideInDown': 'slideInDown 0.9s ease-out',
        'slideInUp': 'slideInUp 0.9s ease-out',
        'fadeInUp': 'fadeInUp 0.9s ease-out',
        'fadeInRight': 'fadeInRight 0.9s ease-out',
        'fadeInLeft': 'fadeInLeft 0.9s ease-out',
        'collage-in': 'collageIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'collage-drift': 'collageDrift 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translate3d(0, -100%, 0)', visibility: 'visible' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        slideInUp: {
          '0%': { transform: 'translate3d(0, 100%, 0)', visibility: 'visible' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 100%, 0)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translate3d(100%, 0, 0)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translate3d(-100%, 0, 0)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        collageIn: {
          '0%': { opacity: '0', transform: 'translateY(28px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        collageDrift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
