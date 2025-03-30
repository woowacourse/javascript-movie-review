## 2단계 기능 구현 목록

### 📺 영화 상세정보 모달

- [x] 영화 포스터 또는 제목 클릭 시 상세정보 모달 띄우기
- [x] 모달에 영화 썸네일, 제목, 카테고리, 줄거리, 평균 평점 표시
- [x] ESC 키 또는 닫기 버튼 클릭 또는 모달 바깥 클릭 시 모달 닫기
- [x] 배경 블러 처리
- [x] TMDB 상세정보 API 연동 (`/movie/{movie_id}`)

### ⭐️ 별점 매기기 기능

- [x] 영화 상세 모달에서 내 별점 선택 UI 구현 (별 5개)
- [x] 클릭한 별점 localStorage에 저장
- [x] 새로고침 후에도 별점 유지
- [x] 별점 점수에 따라 문구 표시
  - 2점: 최악이에요
  - 4점: 별로예요
  - 6점: 보통이에요
  - 8점: 재미있어요
  - 10점: 명작이에요

### 🔁 무한 스크롤

- [x] 영화 목록 하단에 도달 시 다음 페이지 영화 자동 로딩
- [x] 기존 ‘더보기’ 버튼 제거

### 📐 반응형 레이아웃

- [x] 데스크탑: 1줄에 4개 / 가운데 모달
- [x] 태블릿: 1줄에 3개 / 모달 아래에서 올라오기
- [x] 모바일: 1줄에 1개 / 썸네일 없이 모달 아래에서 올라오기
- [x] media query를 통한 유동적인 그리드 구성

### E2E 테스트

##### 모달 테스트

- [x] 지금 인기 있는 영화 리스트의 영화를 클릭하면 해당 영화 상세 정보 모달 창이 뜬다
- [x] 영화를 검색한 후 리스트에 있는 영화를 클릭하면 해당 영화 상세 정보 모달 창이 뜬다
- [x] 닫기 버튼을 누르면 모달 창이 닫힌다.
- [x] ESC 버튼을 누르면 모달 창이 닫힌다.
- [x] 모달 창 바깥을 클릭하면 모달 창이 닫힌다.

##### 별점 테스트

- [x] 영화를 클릭한 후 모달에 있는 별을 클릭하면 문구가 추가된다.
- [x] 영화를 클릭한 후 모달에 있는 별을 클릭하여 별점을 준 후 새로고침을 하고 다시 그 영화를 클릭하면 별점이 초기화 되지 않고 저장된 별점을 볼 수 있다.

##### 무한 스크롤 테스트

- [x] 지금 인기 있는 영화 리스트에서 스크롤을 리스트의 끝으로 내리면 영화 20개가 추가된다.
- [x] 영화를 검색한 후 리스트에서 스크롤을 리스트의 끝으로 내리면 영화 20개가 추가된다.

##### 반응형 테스트

- [x] 화면 너비를 1440px 이상으로 설정하면, 영화 리스트가 한 줄에 4개로 표시된다.
- [x] 화면 너비를 1024px 이하로 설정하면, 영화 리스트가 한 줄에 3개로 표시되고, 모달은 화면 아래에서 올라온다.
- [x] 화면 너비를 768px 이하로 설정하면, 영화 리스트가 한 줄에 1개로 표시되고, 모달은 썸네일 없이 아래에서 올라온다.
