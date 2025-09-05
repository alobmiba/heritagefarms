import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
  ],
  darkMode: ["class"],
  important: true,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "1rem",
        xl: "3rem",
        '2xl': '8rem',
      },
    },
    fontFamily: {
      'gilroy': ['Gilroy', 'sans-serif'],
      'gilroy-light': ['Gilroy-Light', 'sans-serif'],
      'gilroy-extrabold': ['Gilroy-Extrabold', 'sans-serif'],
      'dm': ['"DM Sans", sans-serif'],
      // Legacy font mappings for backward compatibility
      'signika': ['Gilroy-Extrabold', 'sans-serif'],
      'roboto': ['Gilroy', 'sans-serif'],
    },
    extend: {
      colors: {
        'heritage': {
          'dark-green': '#00312D',
          'forest-green': '#3A7817',
          'lime-slice': '#EAFDE7',
          'leafy-lemon': '#BFF106',
        },
        // Figma design colors
        'figma': {
          'primary': '#5B8C51',
          'secondary': '#00312D',
          'dark': '#00312D',
          'light': '#EAFDE7',
          'yellow': '#FDCF00',
          'gray': '#666666',
          'light-gray': '#999999',
        },
        // Evea template colors
        primary: "#5d87ff",
        primaryDark: "#2a5ceb",
        secondary: "#191A15",
        dark: "#212121",
        light: "#747474",
        black: "#000000",
        muted: "#707070",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        countUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'count-up': 'countUp 2s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      spacing: {
        0.75: "0.1875rem",
        3.25: "0.8125rem",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        999: "999",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin')
  ],
};

export default config; 