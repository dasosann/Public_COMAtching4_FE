// vite.config.ts 또는 vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  server: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost', // 또는 실제 개발서버의 IP
      port: 5173,
    },
  },
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  define: {
    global: "window",
  },
});
