/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        regularM: 'Montserrat_400Regular',
        mediumM: 'Montserrat_500Medium',
        boldM: 'Montserrat_700Bold',
      },
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
      },
    },
  },
  plugins: [],
};
