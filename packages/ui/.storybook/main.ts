import type { StorybookConfig } from '@storybook/vue3-vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // 모듈 해석 설정
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': resolve(__dirname, '../dist'),
        '@template/theme': resolve(__dirname, '../../theme/dist'),
        '@template/types': resolve(__dirname, '../../types/dist'),
        '@template/utils': resolve(__dirname, '../../utils/dist'),
        '@template/api': resolve(__dirname, '../../api/dist'),
      },
    };

    // TypeScript 지원
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: ['vue', '@template/types', '@template/theme'],
      force: true,
    };

    // PostCSS 설정 추가
    config.css = {
      ...config.css,
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    };

    // 환경 변수 설정
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': '"development"',
    };

    return config;
  },
};

export default config;
