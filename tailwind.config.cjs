module.exports = {
  content: ['./src/**/*.{astro,jsx,js,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'premium-slide': {
          '0%': { opacity: 0, transform: 'translateX(20px) scale(0.95)' },
          '100%': { opacity: 1, transform: 'translateX(0) scale(1)' },
        },
      },
      animation: {
        'premium-slide': 'premium-slide 0.25s ease-out',
      },
    },
  },
};
