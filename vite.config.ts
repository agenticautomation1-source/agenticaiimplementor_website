import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  define: {
    // Vite performs static string replacement for process.env.API_KEY during build
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY || ""),
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-genai": ["@google/genai"],
        },
      },
    },
  },

  server: {
    port: 3000,
    host: true,

    // /api/* proxy for local dev
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
