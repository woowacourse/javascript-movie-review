import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    AutoImport({
      include: [/src\/components\/.+\.ts$/],
      imports: [
        {
          "@/utils/dom.ts": ["createElement", "wrapFragment"],
        },
      ],
      dirs: ["src/components"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
