/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-black": "#2d2d2d",
      },
      keyframes: {
        slideInDown: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideInLeft: {
          from: {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInRight: {
          from: {
            transform: "translateX(100%)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInUp: {
          from: {
            transform: "translateY(100%)",
            opacity: 0,
          },
          to: {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        pulse: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        appear: {
          "0%, 100%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
        },
        "sun-to-moon": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(180deg)",
          },
        },
        "moon-to-sun": {
          "0%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        zoomOut: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.2)",
          },
        },
      },
      animation: {
        slideDown: "slideInDown 1s forwards",
        slideLeft: "slideInLeft 1s forwards",
        slideRight: "slideInRight 1s forwards",
        slideUp: "slideInUp 1s forwards",
        pulse: "pulse 1.5s infinite",
        appear: "appear 1.5s infinite",
        zoomOut: "zoomOut 0.3s ease forwards",
        "sun-to-moon": "sun-to-moon 0.3s ease forwards",
        "moon-to-sun": "moon-to-sun 0.3s ease forwards",
      },
    },
    fontFamily: {
      "custom-sans": ["Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
