import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";

export default defineConfig({
  base: "./",
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
  resolve: {
    alias: {
      react: resolve(__dirname, "node_modules/react"),
      "react-dom": resolve(__dirname, "node_modules/react-dom"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    esbuildOptions: {
      target: "es2020",
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    commonjsOptions: {
      include: [/node_modules/],
    },
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
    "process.env": {}, // evita errores si alguna dependencia usa process.env en entornos no-Node
  },
});
