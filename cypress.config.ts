import { defineConfig } from 'cypress';
import { POPULAR_MOVIES_URL } from './src/constants/tmdbConstants';
require('dotenv').config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    POPULAR_MOVIES_URL: POPULAR_MOVIES_URL,
  },
});
