# Architecture

## 진입점 흐름

```
DOMContentLoaded
        ↓
Router.init()
        ↓
location.pathname
  ├── '/'       → MainPage.render()
  ├── '/search' → SearchPage.render()
  └── 그 외     → navigate('/')
```

---

## 레이어 구조

### Router

- `navigate(path)`: `pushState()`로 URL 업데이트 후 `init()` 호출
- `init()`: `pathname` 기준으로 페이지 렌더 함수 호출 (switch 분기)
- 알 수 없는 경로는 `/`로 리다이렉트

### Network

- `src/utils/fetch.ts`: Bearer 토큰 인증, `accept: application/json` 헤더 포함
- GET 요청만 사용

### Transform Layer

- `src/utils/transform.ts`: `TMDBMovie` → `MovieItem` 변환
- 필드: `title`, `posterSrc`, `rating`

---

## 컴포넌트 트리

### MainPage

```
MainPage
├── Header
│   ├── Logo (클릭 시 ROUTES.MAIN으로 navigate)
│   └── SearchForm (submit 시 ROUTES.SEARCH?query=...로 navigate)
├── Hero (MovieList 구독 → 첫 번째 영화 표시, page === 1만 반응)
├── main
│   ├── MovieList (MovieList 구독 → 페이지별 ul 추가, display:contents 그리드)
│   └── MoreButton (MovieList 구독 → isPending/isLastPage 반응)
└── Footer
```

### SearchPage

```
SearchPage
├── Header
├── main
│   ├── MovieList (검색 결과, URL query 파라미터 사용)
│   └── MoreButton
└── Footer
```

### 사이드 컴포넌트

| 컴포넌트      | 설명                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| DetailButton  | size: s, width: fit                                                    |
| MoreButton    | size: m, width: full, 콜백 수신                                        |
| Button (공통) | width: full \| fit / size: s \| m / text: string / onClick: () => void |
| MovieCard     | title, posterSrc, rating / 이미지 로드 실패 시 fallback div 표시       |
| SkeletonCard  | 로딩 중 shimmer 애니메이션 placeholder                                 |
| Empty         | 검색 결과 없을 때 행성 이미지 + 안내 텍스트                            |

---

## 도메인 설계

### MovieList (이벤트 버스 패턴)

```
isPending: boolean
currentPage: number
totalPages: number
currentQuery: string | null
subscribers: Set<Subscriber>

공개 메서드:
  - load(query?)   ← 첫 페이지 로드 (popular or search)
  - loadMore()     ← 다음 페이지 로드
  - isLastPage()   ← currentPage >= totalPages
  - subscribe()
  - unsubscribe()

구독 이벤트 (MoviePageEvent):
  - movies: MovieItem[]  ← 해당 페이지 결과만 전달 (누적 없음)
  - isPending: boolean
  - page: number
```

> 영화 목록 누적은 DOM(`movie-list` 컴포넌트)이 담당

### Movie (step2 구현 예정)

```
movie: TMDBMovie | null
isPending: boolean
subscribers: Set<Subscriber>

공개 메서드:
  - load(id)
  - subscribe()
  - unsubscribe()
```

---

## API

### Popular API

```
GET https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1
```

| 파라미터 | 타입   | 기본값  | 설명        |
| -------- | ------ | ------- | ----------- |
| language | string | `ko-KR` | 응답 언어   |
| page     | number | `1`     | 페이지 번호 |

### Search API

```
GET https://api.themoviedb.org/3/search/movie?query=:query&include_adult=false&language=ko-KR&page=1
```

| 파라미터      | 타입    | 기본값  | 설명                  |
| ------------- | ------- | ------- | --------------------- |
| query         | string  | —       | 검색어 (URL 인코딩)   |
| include_adult | boolean | `false` | 성인 콘텐츠 포함 여부 |
| language      | string  | `ko-KR` | 응답 언어             |
| page          | number  | `1`     | 페이지 번호           |

> Response Type: `src/api/types.ts`의 `TMDBMovieListResponse` 참고

---

## 폴더 구조

```
src/
  api/
    types.ts          ← TMDBMovie, TMDBMovieListResponse, Params 타입
    constants.ts      ← API base URL, 이미지 base URL, 엔드포인트 상수
    movies.ts         ← fetchPopularMovies, fetchSearchMovies
  components/
    button.ts         ← 공통 버튼 (width, size 옵션)
    header.ts
    hero.ts
    movie-list.ts     ← MovieList 구독, 페이지별 ul, display:contents 그리드
    movie-card.ts     ← 카드 UI, 이미지 fallback
    skeleton-card.ts  ← shimmer 스켈레톤
    empty.ts          ← 검색 결과 없음
    more-button.ts
    detail-button.ts
    modal.ts          ← step2 구현 예정
    logo.ts
    footer.ts
    search-form.ts
  pages/
    mainPage.ts
    searchPage.ts
  domains/
    movie/
      MovieList.ts    ← 이벤트 버스 패턴, load/loadMore/subscribe
      Movie.ts        ← step2 구현 예정
      index.ts
  utils/
    fetch.ts          ← Bearer 인증 fetch 유틸
    transform.ts      ← TMDBMovie → MovieItem 변환
  route/
    router.ts         ← pushState 기반 SPA 라우터
    constants.ts      ← ROUTES 상수
  main.ts
```
