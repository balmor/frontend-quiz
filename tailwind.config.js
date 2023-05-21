const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'var(--font-baloo)',...fontFamily.sans],
        baloo: 'var(--font-baloo)',
      },
      colors: {
        third: 'var(--bg-logo-color)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        quiz: {
          primary: '#38bdf8',
          secondary: '#1a1c34',
          'secondary-focus': '#20233f',
          'secondary-content': '#0d1027',
          accent: '#fcda01',
          'accent-focus': '#5e5700',
          neutral: '#151a3b',
          'neutral-content': '#aaaaaa',
          'base-100': '#3d3d3e',
          info: '#6cabd5',
          success: 'rgb(21, 128, 61)',
          'success-content': 'rgb(20, 83, 45)',
          warning: '#f0d456',
          error: 'rgb(185, 28, 28)',
          'error-content': 'rgb(127, 29, 29)',
        }
      },
      'night',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
