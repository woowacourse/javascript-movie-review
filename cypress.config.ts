import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 2000,
  viewportHeight: 2000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
