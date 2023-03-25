import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false,
  },
  viewportWidth: 1600,
  viewportHeight: 1000,
});
