import { defineConfig } from 'cypress';
import config from './cypress.env.json';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    env: {
      ACCESS_TOKEN: config.ACCESS_TOKEN
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
