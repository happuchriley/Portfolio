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
        background: '#FFFFFF',
        foreground: '#374151',
        primary: '#FF3E00',
        secondary: '#F3F4F6',
        dark: '#111827',
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
        'work': ['Work Sans', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideInDown': 'slideInDown 1s ease-out',
        'slideInUp': 'slideInUp 1s ease-out',
        'fadeInUp': 'fadeInUp 1s ease-out',
        'fadeInRight': 'fadeInRight 1s ease-out',
        'fadeInLeft': 'fadeInLeft 1s ease-out',
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
      },
    },
  },
  plugins: [],
}
