// ../theme/tailwind.config.cjs의 설정을 불러와 확장
const themeConfig = require('../theme/tailwind.config.cjs');

module.exports = {
  ...themeConfig,
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/stories/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
  ],
};
