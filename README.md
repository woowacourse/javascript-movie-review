# javascript-movie-review

우아한테크코스 레벨1 영화관 미션

## 웹 배포 사이트

<a href="https://gilpop8663.github.io/javascript-movie-review/" target="_blanck">배포 바로가기</a>

## 📌 실행 방법

1. git clone을 한다.

2. repository 로 폴더 이동

```
cd javascript-movie-review
```

3. step1의 브런치로 이동

```
git checkout step1
```

4. dependency 다운로드

```
npm install
```

5. 루트에 .env를 만든다. (tmdb의 API 키를 입력한다)

```
API_KEY= 값
```

6. 프로젝트 시작

```
npm run start
```

## 테스트 방법

1. 루트에 cypress.config.ts를 만든다. ( tmdb의 API 키를 입력한다)

```
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    API_KEY: 값
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
```

2. e2e test

   2-1. 로컬 서버를 실행시킨다.

   ```
   npm run start
   ```

   2-2. 테스트를 실행한다.

   ```
   npm run test-e2e
   ```
