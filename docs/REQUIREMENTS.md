## 도메인

- [x] API를 이용해 전체 영화 중 상위 20개씩 불러온다.
- [x] 더보기 버튼 클릭시 다음 페이지 영화를 불러온다
- [x] 더 불러올 정보가 없으면 더보기 버튼이 사라진다.(total-page)
- [x] 불러올 정보가 있으면 더보기 버튼이 사라지지 않는다.
- [x] 검색어를 입력하면 해당되는 영화를 불러온다
- [x] 엔터키를 눌러 검색할 수 있다.
- [ ] 오류 (try-catch)
- [x] 존재하지 않는 영화 이름 검색 시 화면에 문구를 출력한다.

## 유틸

- [x] fetch(url)
- [x] url 유틸 (검색, 인기순 총 2개)

## 컴포넌트(커스텀 엘리먼트)

- [x] header
- [x] 헤더 누르면 기본 화면으로 새로고침한다.
- [x] movieContainer가 리렌더링 된다.
- [x] searchInput
- [x] 엔터키를 누르거나 검색 아이콘을 클릭하면 movieContainer가 리렌더링 된다.
- [x] movieContainer
- [x] movieList
- [x] movieItem
- [x] showMoreButton
- [x] 버튼을 누르면 movieList가 리렌더링된다.
- [x] 영화 목록 아이템에 대한 Skeleton UI 구현

## 통신오류 처리

- [ ] 401에러: api키가 유효하지 않을 때
