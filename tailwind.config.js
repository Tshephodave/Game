/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        run: {
          '0%': { 'background-position': '0' },
          '100%': { 'background-position': '-320px' }, // Ensure this matches the total width of your sprite sheet
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-30px)' },
          '60%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        run: 'run 1s steps(10) infinite', // Adjust duration and steps
        bounce: 'bounce 1s infinite', // Added bounce animation
      },
    },
  },
  plugins: [],
};
