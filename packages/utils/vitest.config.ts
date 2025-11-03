import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true
  },
  resolve: {
    alias: {
      '@template/types': resolve(__dirname, '../types/src'),
      '@template/utils': resolve(__dirname, './src')
    }
  }
}) 