/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#dd4693',
          600: '#c2357e',
          700: '#a01d63',
          800: '#831652',
          900: '#6b1045',
        },
        background: {
          50: '#f5f7fa',
          100: '#e5e9f2',
          200: '#cfd6e3',
          300: '#aab4cf',
          400: '#64748b',
          500: '#0f172a',
          600: '#0c1424',
          700: '#0a101d',
          800: '#070c16',
          900: '#05080f',
        },
      },
    },
  },
  plugins: [],
};
