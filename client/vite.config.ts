import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@theme': path.resolve(__dirname, 'src/theme'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@api': path.resolve(__dirname, 'src/api'),
      },
    },
    define: {
      'process.env.VITE_PUBLIC_BASE_URL': JSON.stringify(
        env.VITE_PUBLIC_BASE_URL
      ),
    },
    build: {
      target: 'esnext',           
      outDir: 'dist',             
      sourcemap: true,            
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
      },
    },
  };
});
