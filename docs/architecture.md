# Architecture

## 진입점 흐름 (load vs. DOMContentLoaded)

```
eventListener: DOMContentLoaded
        ↓
location.pathname === '/'?
  ├── YES → Fetch '인기영화'
  └── NO  → pathname === '/search', URLSearchParams → Fetch '영화 검색'
```

---

## 레이어 구조

### Router

- form submit의 기본 동작(페이지 이동+새로고침)을 preventDefault()로 막고, pushState()로 URL 업데이트
- 전체 DOM 초기화
- 페이지 로드

### Network

- fetch 유틸 함수
- GET

### transform layer

- title
- posterSrc
- star
- …

---

## 컴포넌트 트리 (MainPage)

```
MainPage
├── openModal() / closeModal()
├── Header
│   ├── 로고
│   └── 검색폼 (actions/search)
├── Hero
├── MovieList
├── MoreButton
├── Modal (step2 구현 예정, 메서드만 선언)
└── Footer
```

### 사이드 컴포넌트

| 컴포넌트      | 설명                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| DetailButton  | modal open                                                                |
| MovieCard     | title, star, posterSrc                                                    |
| Button (공통) | width: full, fit / disabled: boolean / text: string / onClick: () => void |

---

## 클래스 설계

### MovieList

```
Movie[] movies
boolean isPending
Set subscribers

Network 모듈 사용:
  - getter()
  - setter()
  - load()
  - loadMore()
```

### Movie

```
Movie movie
boolean isPending
Set subscribers

Network 모듈 사용:
  - getter()
  - setter()
  - load()
```

---

## API

### Popular API

```
https://api.themoviedb.org/3/movie/popular?language=ko-kr&page=1
```

| 파라미터 | 타입   | 기본값  | 설명        |
| -------- | ------ | ------- | ----------- |
| language | string | `ko-KR` | 응답 언어   |
| page     | number | `1`     | 페이지 번호 |

### Search API

```
https://api.themoviedb.org/3/search/movie?query=:query%20&include_adult=false&language=ko-KR&page=1
```

| 파라미터      | 타입    | 기본값  | 설명                  |
| ------------- | ------- | ------- | --------------------- |
| query         | string  | —       | 검색어 (URL 인코딩)   |
| include_adult | boolean | `false` | 성인 콘텐츠 포함 여부 |
| language      | string  | `ko-KR` | 응답 언어             |
| page          | number  | `1`     | 페이지 번호           |

> Response Type은 `src/api/types.ts`의 `TMDBMovieListResponse` 참고

---

## 폴더 구조

```
src/
  api/
    types.ts          ← PopularMoviesParams, SearchMoviesParams, TMDBMovie, TMDBMovieListResponse
    constants.ts      ← API base URL, endpoint 경로 상수
    movies.ts         ← 영화 관련 API 호출 함수 (popular, search)
  components/
    button.ts
    modal.ts          ← step2 구현 예정
    …
  pages/
    mainPage.ts
    searchPage.ts
  domains/
    movie/
      MovieList.ts    ← 목록 (Movie[] movies, load, loadMore)
      Movie.ts        ← 단건 상세 (Movie movie, load)
      index.ts        ← re-export
  utils/
    fetch.ts
    transform.ts      ← title, posterSrc, star 변환
    …
  route/
    router.ts
  main.ts
```
