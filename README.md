# javascript-movie-review

FE 레벨1 영화 리뷰 미션

## 📍 학습 목표

이번 미션의 주요 목표는 웹 프론트엔드에서의 비동기에 대해 이해하고,
API 통신을 처리할 때 고려해야 하는 다양한 문제를 직접 경험해보면서 해결 방법을 고민해보는 것입니다

- API 연동을 위한 테스트 환경 경험
- 실제 동작하는 API를 통한 비동기 통신
- UX 경험 개선을 위한 더 보기(페이징) 구현

### 1. 🎬 영화 목록 조회 (인기순)

- [x] 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
  - [x] 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
  - [x] 인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
  - [x] 영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
- [x] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
  - Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

### 2. 🔎 검색

- [x] 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - [x] 엔터키를 눌러 검색할 수 있다
  - [x] 검색 버튼을 클릭하여 검색할 수 있다
- [x] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다

### 3. ⚠️ 오류

- [x] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
  - 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.

## 📁 폴더구조

📦cypress
┣ 📂e2e
┃ ┣ 📜popularMovie.cy.ts : 인기 있는 영화 테스트
┃ ┗ 📜searchMovie.cy.ts : 영화 검색 테스트
📦src
┣ 📂apis
┃ ┣ 📜getPopularMovies.ts : 인기 있는 영화 api
┃ ┗ 📜getSearchedMovies.ts : 영화 검색 api
┣ 📂components
┃ ┣ 📂movie
┃ ┃ ┣ 📜movieContainer.ts : 영화 관련 타이틀, 영화 리스트를 담은 컴포넌트
┃ ┃ ┣ 📜movieItem.ts : 영화 1개
┃ ┃ ┣ 📜movieList.ts : 영화 리스트
┃ ┃ ┗ 📜types.ts : 영화 관련 타입
┃ ┣ 📂skeleton
┃ ┃ ┣ 📜skeletonContainer.ts : 스켈레톤
┃ ┃ ┗ 📜skeletonTitleContainer.ts : 스켈레톤 타이틀
┃ ┣ 📂utils
┃ ┃ ┣ 📜createElementWithAttributes.ts : DOM 요소를 생성하기 위한 유틸 함수
┃ ┃ ┗ 📜selectors.ts : DOM 요소 select 하기 위한 유틸 함수
┃ ┗ 📜backgroundContainer.ts : 헤더에 포함될 인기 있는 영화 사진, 정보
┣ 📂styles
┃ ┣ 📜colors.css
┃ ┣ 📜index.css
┃ ┣ 📜main.css
┃ ┣ 📜modal.css
┃ ┣ 📜reset.css
┃ ┣ 📜searchBar.css
┃ ┣ 📜skeleton.css
┃ ┣ 📜tab.css
┃ ┗ 📜thumbnail.css
┗ 📜main.ts : 진입점
