import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solid()],
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 6464,
  },
  preview: {
    port: 6363,
    strictPort: true,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
    },
    conditions: ['development', 'browser'],
  },
});
