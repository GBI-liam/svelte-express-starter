import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      // Resolve aliases
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        home: 'src/pages/home/home.svelte', 
        page1: 'src/pages/page1/page1.svelte', 
      }
    }
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
