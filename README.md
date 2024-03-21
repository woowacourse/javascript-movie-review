# javascript-movie-review

FE 레벨1 영화관 미션

## 실행 방법

> :흰색*확인*표시: 이번 미션은 환경 변수 사용으로 인해 로컬 실행, 테스트가 정상 작동하지 않을 수 있습니다!
> :흰색*확인*표시: 로컬 실행은 .env 파일을, 테스트 실행은 .cypress.env.json 파일 생성이 필요합니다.

```bash
// .env
AUTHORIZSTION_KEY={YOUR_AUTH_KEY}
API_KEY={YOUR_API_KEY}

// cypress.env.json
{
  "API_KEY": {YOUR_API_KEY}
}
```

```bash
# 로컬 실행
npm run start
# 테스트 실행
npm run test-e2e
```

[:링크: 배포 링크](https://llqqssttyy.github.io/javascript-movie-review/)
<br/>

---

## :둥근\_압핀: 학습 목표

- 웹 프론트엔드에서의 비동기에 대해 이해한다.
- API 통신을 처리할 때 고려해야 하는 다양한 문제를 직접 경험해보면서 해결 방법을 고민해본다.
  - API 연동을 위한 테스트 환경 경험
  - 실제 동작하는 API를 통한 비동기 통신
  - UX 경험 개선을 위한 `더 보기`(페이징) 구현

## :다트: 구현한 기능

### 1. :클래퍼: 영화 목록 조회 (인기순)

- 영화 목록의 1페이지를 불러오며 `더보기` 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
  - 페이지 끝에 도달한 경우에는 `더보기` 버튼을 화면에 출력하지 않는다.
  - 영화 목록은 20개씩 보여준다.
- 영화 목록 아이템에 대한 Skeleton UI를 구현한다.

### 2. :렌즈가*오른쪽*위에*있는*확대경: 검색

- 내가 보고 싶은 영화를 검색할 수 있다.
  - 화면 요구사항은 영화 목록 조회와 동일하다.
    - 엔터키를 눌러 검색할 수 있다.
    - 검색 버튼을 클릭하여 검색할 수 있다.
    - 검색어를 입력한 후 검색어를 모두 지우면 인기 영화 목록 조회로 돌아온다.

### 3. :경고: 오류

- 영화를 검색할 때 검색 결과가 없으면 오류 메세지를 출력한다.
- API 통신 결과 400, 500번대 에러가 발생한 경우 오류 메세지를 출력한다.
  <br/>

---

## :열린*파일*폴더: 폴더 구조

| 폴더명       | 설명                                    |
| ------------ | --------------------------------------- |
| components   | 컴포넌트를 관리                         |
| constants    | 상수(API 요청에 필요한 값)을 관리       |
| services     | API 요청을 관리                         |
| statics/imgs | 이미지 파일을 관리                      |
| stores       | 여러 컴포넌트에서 사용하는 state를 관리 |
| types        | 프로젝트에서 사용되는 type을 관리       |
| utils        | 유틸리티 함수를 관리                    |

<br/>
<details>
<summary>:스크롤: 파일 트리 보기</summary>
<div markdown=“1”>
```bash
src
 ┣ components
 ┃ ┣ ErrorMessage
 ┃ ┃ ┣ ErrorMessage.css
 ┃ ┃ ┗ ErrorMessage.ts
 ┃ ┣ Header
 ┃ ┃ ┣ Header.css
 ┃ ┃ ┗ Header.ts
 ┃ ┣ LoadMoreButton
 ┃ ┃ ┣ LoadMoreButton.css
 ┃ ┃ ┗ LoadMoreButton.ts
 ┃ ┣ Main
 ┃ ┃ ┗ Main.ts
 ┃ ┣ MovieItem
 ┃ ┃ ┣ MovieItem.css
 ┃ ┃ ┣ MovieItem.ts
 ┃ ┃ ┗ SkeletonMovieItem.ts
 ┃ ┣ MovieList
 ┃ ┃ ┣ MovieList.css
 ┃ ┃ ┣ MovieList.ts
 ┃ ┃ ┗ SkeletonMovieList.ts
 ┃ ┣ SearchInput
 ┃ ┃ ┗ SearchInput.ts
 ┃ ┗ App.ts
 ┣ constants
 ┃ ┗ requests.ts
 ┣ services
 ┃ ┗ MovieService.ts
 ┣ statics
 ┃ ┗ images
 ┃ ┃ ┣ logo.png
 ┃ ┃ ┣ search_button.png
 ┃ ┃ ┣ star_empty.png
 ┃ ┃ ┗ star_filled.png
 ┣ stores
 ┃ ┗ movieStore.ts
 ┣ styles
 ┃ ┣ main.css
 ┃ ┗ reset.css
 ┣ types
 ┃ ┗ movie.d.ts
 ┣ utils
 ┃ ┗ fetchData.ts
 ┣ custom.d.ts
 ┗ index.js
```
</div>
</details>
