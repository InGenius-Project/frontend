import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
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
      // @ts-ignore
      port: import.meta.env.PORT || 3000,
    },
  };
});
