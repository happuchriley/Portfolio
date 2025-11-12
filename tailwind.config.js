/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        "bolt-black": "#000000",
        "bolt-white": "#ffffff",
        "bolt-green": "#00d12d",
        "bolt-blue": "#0066ff",
        "bolt-gray": "#f5f5f5",
        "bolt-dark-gray": "#1a1a1a",
        "bolt-text": "#333333",
        "bolt-text-light": "#666666",
        "bolt-border": "rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

