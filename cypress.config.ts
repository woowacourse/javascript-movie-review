import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    API_KEY: '16ea9f2f02c6eae37704341df50c30f0',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
