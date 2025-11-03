import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { commonAlias, createCommonConfig } from '../../shared/config/vite.common';
import { visualizer } from 'rollup-plugin-visualizer';
import VueInspector from 'vite-plugin-vue-inspector';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isAnalyze = process.env.ANALYZE === 'true';
  const commonConfig = createCommonConfig();
  
  return {
    ...commonConfig,
    plugins: [
      vue(),
      VueInspector({
        toggleComboKey: 'alt',
        enabled: false,
        launchEditor: 'cursor'
      }),
      // Bundle Analyzer - 분석 모드에서만 활성화
      ...(isAnalyze ? [
        visualizer({
          filename: 'dist/bundle-analysis.html',
          open: true, // 분석 모드에서만 자동으로 브라우저에서 열기
          gzipSize: true,
          brotliSize: true,
          template: 'treemap', // 'treemap', 'sunburst', 'network'
        })
      ] : []),
    ],
    resolve: {
      alias: {
        ...commonAlias,
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      ...commonConfig.server,
      proxy: {
        '/main/v1': {
          target: env.VITE_MODA_API,
          changeOrigin: true,
          secure: false,
        },
        '/ws': {
          target: env.VITE_MODA_WEBSOCKET,
          changeOrigin: true,
          secure: false,
          ws: true,
        }
      }
    },
    build: {
      ...commonConfig.build,
      outDir: 'dist',
    },  
  };
});
