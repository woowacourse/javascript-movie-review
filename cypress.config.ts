import { defineConfig } from 'cypress';
import { POPULAR_MOVIES_URL } from './src/constants/tmdbConstants';

require('dotenv').config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    POPULAR_MOVIES_URL,
  },
});
