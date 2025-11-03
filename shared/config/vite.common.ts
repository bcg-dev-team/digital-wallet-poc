import { resolve } from 'path';
import path from 'path';

/**
 * 공통 Vite 설정
 * 모든 앱에서 공유할 수 있는 기본 설정
 */
export const createCommonConfig = () => {
  return {
    css: {
      preprocessorOptions: {
        scss: {
          // Sass modern API 사용
          // - legacy JS API deprecation 경고 해결
          // @see https://vitejs.dev/config/shared-options.html#css-preprocessoroptions
          // @see https://sass-lang.com/documentation/breaking-changes/legacy-js-api/
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      sourcemap: true,
      target: 'esnext',
      minify: 'esbuild' as const,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            'template-ui': ['@template/ui'],
            'template-utils': ['@template/utils'],
            'template-api': ['@template/api'],
            'template-types': ['@template/types'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia'],
      exclude: ['@template/ui', '@template/utils', '@template/api', '@template/types'],
    },
  };
};

export const commonAlias = {
  '@template/ui': path.resolve(__dirname, '../../packages/ui/dist'),
  '@template/types': path.resolve(__dirname, '../../packages/types/dist'),
  '@template/theme': path.resolve(__dirname, '../../packages/theme/dist'),
  '@template/utils': path.resolve(__dirname, '../../packages/utils/dist'),
  '@template/api': path.resolve(__dirname, '../../packages/api/dist'),
};
