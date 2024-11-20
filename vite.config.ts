import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'node_modules/process/browser'),
      buffer: path.resolve(__dirname, 'node_modules/buffer'),
    },
  },
  define: {
    'process.env': {},
    global: 'window', // Impostiamo `global` su `window` per simulare l'ambiente Node.js
  },
});