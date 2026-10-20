import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Rutas relativas: la página funciona en GitHub Pages dentro de /notebook-IAstudio/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: { outDir: "../docs", emptyOutDir: true },
});
