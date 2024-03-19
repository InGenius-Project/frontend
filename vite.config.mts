import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { lazy } from 'react';
import pluginChecker from 'vite-plugin-checker';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr(),
      pluginChecker({
        typescript: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'build',
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    server: {
      host: '0.0.0.0',
      port: process.env.PORT || 3000,
    },
  };
});
