module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        DARKTHEME_LIGHT_GREEN_COLOR: '#38CD2B',
        DARKTHEME_BACKGROUND_COLOR: '#181616',
        DARKTHEME_DARK_GREEN_COLOR: '#1b2818',
      },
      fontFamily: {
        ALMENDRA: ['Almendra'],
      },
      rotate: {
        270: '270deg',
      },
      width: {
        '380px': '380px',
      },
      height: {
        '380px': '380px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
  content: ['../node_modules/flowbite/**/*.js'],
};
