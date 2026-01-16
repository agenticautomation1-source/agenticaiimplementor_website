import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Vite performs static string replacement for process.env.API_KEY
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || null)
  },
  build: {
    sourcemap: false,
    outDir: 'dist',
    // Ensures clean chunking for production deployment
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', '@google/genai']
        }
      }
    }
  }
});