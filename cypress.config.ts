import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: process.env.VITE_BASE_URL ?? 'http://localhost:5173',
  },
});
