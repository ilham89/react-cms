import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { type PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    splitVendorChunkPlugin(),
    visualizer() as PluginOption,
  ],
  server: {
    proxy: {
      "/dev": {
        target: "https://reqres.in/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dev/, ""),
      },
    },
  },
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          dll: ["react", "react-dom", "react-router-dom", "axios", "js-cookie"],
          rc: [
            "rc-table",
            "rc-select",
            "rc-pagination",
            "rc-dialog",
            "rc-notification",
            "rc-input",
            "rc-field-form",
          ],
          antd: [
            "antd/es/table",
            "antd/es/date-picker",
            "antd/es/modal",
            "antd/es/layout",
            "antd/es/grid",
            "antd/es/col",
            "antd/es/row",
            "antd/es/progress",
            "antd/es/tag",
            "antd/es/icon",
            "antd/es/spin",
          ],
        },
      },
    },
  },
});
