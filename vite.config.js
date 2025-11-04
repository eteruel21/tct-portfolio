import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "./", // 👈 importante para Cloudflare Pages (sirve desde raíz)
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      template: "treemap",
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  build: {
    sourcemap: false, // puedes desactivar en producción
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react")) return "vendor_react";
          if (id.includes("react-dom")) return "vendor_react_dom";
          if (id.includes("react-router") || id.includes("react-router-dom"))
            return "vendor_router";
          if (id.includes("lodash") || id.includes("lodash-es"))
            return "vendor_lodash";
          if (id.includes("axios")) return "vendor_axios";
          if (id.includes("three")) return "vendor_three";
          return "vendor_misc";
        },
      },
    },
  },
  define: {
    "process.env": {}, // 👈 evita errores en Cloudflare (no hay Node env)
  },
});
