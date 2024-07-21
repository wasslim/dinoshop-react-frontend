/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        darkgreen: '#274c02',
        green: '#54801d',
        lightbeige: '#ffe9ad',
        darkbeige: '#d3b271',
        offwhite: '#fdffdf',
      },
      fontFamily: {
        norwester: ['Norwester', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
