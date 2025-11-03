import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TemplateUtils',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      external: ['vue', '@template/types', 'date-fns', 'date-fns-tz'],
      output: {
        globals: {
          vue: 'Vue',
          '@template/types': 'TemplateTypes',
          'date-fns': 'dateFns',
          'date-fns-tz': 'dateFnsTz',
        },
        exports: 'named',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
