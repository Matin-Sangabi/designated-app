/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors :{
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#f8fafc',
      'primary': '#645CBB',
      'secondary': '#A084DC',
      'metal': '#BFACE2',
      'tahiti': '#EBC7E6',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'slate' : '#1f2937',
      'gray' : '#e5e7eb',
    }
  },
  plugins: [],
}