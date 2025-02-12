import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'], // Include .glb files as assets
  server: {
    port: 5173,
    hmr: {
      overlay: true, // Enable error overlay for better debugging
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Generate sourcemaps for easier debugging in production
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
