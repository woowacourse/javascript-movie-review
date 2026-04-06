import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        search: resolve(__dirname, "search.html"), // search 페이지 추가
      },
    },
  },
});
