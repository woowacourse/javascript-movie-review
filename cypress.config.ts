import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //implementnodeeventlistenershere
    },
    baseUrl: "http://localhost:8080",
  },
});
