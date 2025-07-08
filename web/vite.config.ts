import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3001,
    strictPort: true,
    host: true
  },
  plugins: [
    tailwindcss(),
  ],
});