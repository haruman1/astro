module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    'node_modules/preline/dist/*.js',
  ],

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
  plugins: [require('preline/plugin')],
};
