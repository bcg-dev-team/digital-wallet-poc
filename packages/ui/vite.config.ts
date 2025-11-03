import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
      defaultImport: 'component',
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: false, // 순환참조 방지를 위해 false로 변경
      outDir: 'dist',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TemplateUI',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      external: ['vue', '@template/types', '@template/theme', '@template/utils'],
      output: {
        globals: {
          vue: 'Vue',
          '@template/types': 'TemplateTypes',
          '@template/theme': 'TemplateTheme',
          '@template/utils': 'TemplateUtils',
        },
        exports: 'named',
        preserveModules: true,
      },
    },
    cssCodeSplit: false,
    outDir: 'dist',
    assetsDir: '.',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
