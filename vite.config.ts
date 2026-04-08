import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 💡 1. 깃허브 레포지토리 주소 (이전에 하신 것)
  base: '/javascript-movie-review/',

  // 💡 2. 멀티 페이지(MPA) 빌드 설정 추가!
  build: {
    rollupOptions: {
      input: {
        // 메인 페이지와 검색 페이지 모두 짐(build)을 싸도록 명시해줍니다.
        main: resolve(__dirname, 'index.html'),
        search: resolve(__dirname, 'search.html'),
      },
    },
  },
});