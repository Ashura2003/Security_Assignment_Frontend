// vite.config.js
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  build: {
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),
    },
    port: 5173,
  },
});
