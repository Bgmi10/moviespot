module.exports = {
  content: [
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
        scrollText: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      boxShadow: {
        'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'scroll-text': 'scrollText 5s linear infinite',
        fadeIn: 'fadeIn 0.7s ease-in-out forwards',
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
         shake: 'shake 0.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
