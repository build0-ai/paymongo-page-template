import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
