import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 6464,
  },
  preview: {
    port: 6363,
    strictPort: true,
  },
});
