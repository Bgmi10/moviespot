module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add any other paths to your source files
  ],
  theme: {
    extend: {
      keyframes: {
        scrollText: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        'scroll-text': 'scrollText 5s linear infinite', // Corrected name and added duration
        fadeIn: 'fadeIn 0.7s ease-in-out forwards', // Removed extra curly braces
      },
    },
  },
  plugins: [],
};
