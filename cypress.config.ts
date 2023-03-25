import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
  },
  viewportWidth: 1400,
  viewportHeight: 850,
});
