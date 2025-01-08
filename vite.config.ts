import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  assetsInclude: ["**/*.riv"],
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/animation/*.riv",
          dest: "assets/animation",
        },
      ],
    }),
  ],
});
