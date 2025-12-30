import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages hosts the site at https://user.github.io/repo-name/
  // Setting base to './' ensures all assets (js, css) are loaded relative to index.html
  // regardless of the repository name.
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});