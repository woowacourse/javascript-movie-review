# javascript-movie-review

FE 레벨1 영화 리뷰 미션

## 파일 구조

```
src/
├── main.ts                  # 앱 진입점 (초기화 및 이벤트 등록)
│
├── features/                # 도메인별 비즈니스 로직
│   ├── popular.ts             # 인기 영화 조회 로직
│   ├── search.ts              # 영화 검색 로직
│   └── movieRenderer.ts       # 영화 목록 렌더링
│
├── components/              # UI 구성 요소 (DOM 생성 함수)
│   ├── hero.ts                # 최고 평점 영화 히어로 배너
│   ├── movie.ts               # 영화 카드 컴포넌트
│   ├── button.ts              # 공통 버튼 컴포넌트
│   ├── search-form.ts         # 검색 폼 컴포넌트
│   └── skeleton.ts            # 스켈레톤 로딩 UI
│
├── utils/                   # 공통 유틸리티
│   ├── api.ts                 # TMDB API 호출 함수
│   └── constants.ts           # 상수 정의
│
└── types/                   # TypeScript 타입 정의
    └── api.ts                 # API 응답 타입
```

- 영화 목록 조회
  - [x] 인기있는 영화 목록을 조회한다.
    - [x] 더보기 버튼을 누르면 다음 영화 목록을 불러온다.
      - [x] 더 이상 요청할 페이지가 없는 경우 `더보기` 버튼을 노출하지 않는다.
      - [x] 버튼 클릭 시 데이터를 받아올 때까지 버튼 비활성화
    - [x] 한 번의 요청당 20개씩 영화 목록을 불러온다.
  - [x] 영화 목록을 불러오는 동안 Skeleton UI를 보여준다.
- 검색
  - [x] 내가 보고 싶은 영화를 검색한다.
    - [x] 검색한 결과가 없을 때 ‘검색 결과가 없습니다.’를 화면에 출력한다.
- e2e 테스트
  - [x] maxPage일 때(e.g. 500) 엣지 케이스
