import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import pluginChecker from 'vite-plugin-checker';

export default defineConfig(() => {
  return {
    optimizeDeps: {
      include: ['@emotion/react', '@emotion/styled'],
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
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
      port: parseInt(process.env.PORT || '3000'),
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/tests/setup.js',
    },
  };
});
