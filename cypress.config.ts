import { defineConfig } from 'cypress';
require('dotenv').config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
});
