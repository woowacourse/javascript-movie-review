# javascript-movie-review

FE 레벨1 영화관 미션

## 배포

#### [✨ 배포 페이지 바로가기](https://badahertz52.github.io/javascript-movie-review/dist)

### 구현 모습

<img src="./movie_review.gif" width="600px" />

## 웹팩 빌드,서버 열기

```dash
// 빌드
npm run build
// 서버 열기
npm run start
```

## 테스트

```dash
// cypress
npm run test-e2e
```

## 기능 목록

### 도메인 로직

#### APIClient

- api 데이터 받아오기
- 더보기 버튼 숨길지 보일지 결정

#### DataStateStore

- 데이터 관리
- 스택으로 관리
- 이전 데이터와 합쳐짐

### 영화 리스트 구현

- DataStateStore의 데이터를 받아와서 영화 리스트를 보여줌
- 스크롤: 스롤링 기능

### 영화 검색 기능

#### 검색 입력창

- enter 키, 검색 아이콘 클릭 시 검색 진행

#### 검색 결과에 따른 영화 리스트

- 검색 결과에 따라 영화 리스트와 타이틀 변경

### 더보기 버튼

- api를 통해 데이터를 불어올때, 다음 검색 대상이 존재하는지 여부에 따라 더보기 버튼을 숨기거나 보여줌

## 파일 구조

<details>
<summary>파일 구조 보기</summary>
<div markdown="1">

```
src
 ┣ components
 ┃ ┣ ErrorView.ts
 ┃ ┣ Header.ts
 ┃ ┣ ItemCard.ts
 ┃ ┣ ItemList.ts
 ┃ ┣ ItemView.ts
 ┃ ┣ MoreButton.ts
 ┃ ┣ MovieImg.ts
 ┃ ┣ MovieScore.ts
 ┃ ┣ MovieTitle.ts
 ┃ ┣ SearchBox.ts
 ┃ ┣ SkeletonList.ts
 ┃ ┗ Title.ts
 ┣ constants
 ┃ ┗ system.ts
 ┣ model
 ┃ ┣ APIClient.ts
 ┃ ┣ DataStateStore.ts
 ┃ ┗ index.ts
 ┣ service
 ┃ ┗ handleSkeletonAndAPI.ts
 ┣ type
 ┃ ┣ global.d.ts
 ┃ ┗ movie.ts
 ┣ utils
 ┃ ┣ createElementWithAttribute.ts
 ┃ ┣ debouneFunc.ts
 ┃ ┗ index.ts
 ┣ app.ts
 ┣ config.ts
 ┗ index.js
```

</div>
</details>

## 모듈 구조

<img src="./모듈구조.png" alt="모둘 구조" width="700px" />
