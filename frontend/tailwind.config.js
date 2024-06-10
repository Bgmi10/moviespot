// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add any other paths to your source files
  ],
  theme: {
    extend: {
      keyframes: {
        'scroll-text': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'scroll-text': 'scroll-text linear infinite',
      },
    },
  },
  plugins: [],
};
