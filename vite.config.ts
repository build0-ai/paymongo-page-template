import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // esbuild is faster than SWC for JSX transformation
    jsx: "automatic",
  },
  build: {
    // Optimize for faster builds
    minify: "esbuild", // esbuild minification is faster than terser
    sourcemap: false, // Skip sourcemaps for production speed
    target: "es2020", // Modern target for smaller output
  },
  server: {
    proxy: {
      "/api": {
        target: "https://paymongo-page-backend.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
