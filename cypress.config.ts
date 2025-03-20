import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    TMDB_TOKEN:
      "eyJhdWQiOiJhOWEwZmY0MWMzZWEwYzgzZDM4NzUyMDEyMDZjZTQ4OCIsIm5iZiI6MTc0MjI3MTM3OS4yNjksInN1YiI6IjY3ZDhmMzkzMzU3MmFmNWJjYzA4N2YzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ", // ✅ 환경 변수 추가
  },
});
