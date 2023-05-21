/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      tablet: { max: '768px' },

      laptop: { max: '1024px' },

      desktop: { max: '1280px' },
    },
    colors: {
      'btn-blue': '#0095F6',
      'btn-gray': '#EFEFEF',
      'underline-gray': '#DBDBDB',
      'bg-gray': '#121212',
      'bg-black': '#000000',
      'font-white': '#F5F5F5',
    },
  },
  plugins: [],
};
