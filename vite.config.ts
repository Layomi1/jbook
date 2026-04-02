import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ["assert", "path", "util", "process", "buffer"],
      globals: {
        process: true,
        Buffer: true,
      },
    }),
  ],
  server: {
    fs: {
      allow: ["."],
    },
  },
  define: {
    "process.env": {},
  },
});
