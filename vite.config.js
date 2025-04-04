import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  server: {
    historyApiFallback: true,
  },
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  define: {
    global: "window", // global을 window 객체로 매핑
  },
});
