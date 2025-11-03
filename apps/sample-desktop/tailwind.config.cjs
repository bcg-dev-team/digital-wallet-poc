// ../../packages/theme/tailwind.config.cjs의 설정을 불러와 확장
const themeConfig = require('../../packages/theme/tailwind.config.cjs');

module.exports = {
  ...themeConfig,
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{vue,js,ts,scss}'],
};
