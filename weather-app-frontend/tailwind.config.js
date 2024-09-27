/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: {
          100: '#d0e1f9',
          200: '#a1c2f3',
          300: '#72a4ed',
          400: '#4385e7',
          500: '#1566e1',
          600: '#0f4bb0',
          700: '#0a3390',
          800: '#061f70',
          900: '#030b50',
        },
        nightSky: {
          DEFAULT: '#0a192f',
        },
        daySky: {
          DEFAULT: '#87ceeb',
        },
      },
      backgroundImage: {
        'night-sky': "url('/images/sky-night.webp')",
        'day-sky': "url('/images/blue-sky.webp')",
      },
    },
  },
  plugins: [],
};
