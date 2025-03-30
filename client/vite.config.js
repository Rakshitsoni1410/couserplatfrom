import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // cleaner alias
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://couserplatfrom.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: './', // ✅ IMPORTANT for proper asset paths in production
});
