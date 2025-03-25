# javascript-movie-review

FE 레벨1 영화 리뷰 미션

# 구현 사항

- [x] 컴포넌트 분리
  - [x] 헤더
  - [x] 검색창
  - [x] 썸네일 리스트
  - [x] 평점
  - [x] 버튼
  - [x] 푸터
  - [x] 영화 상세 정보 모달
  - [x] 내 별점
- [x] 기능
  - [x] 영화 목록 조회 (인기순)
    - [x] 로고 클릭시 첫 화면을 보여준다.
    - [x] 가장 상위 영화를 헤더 포스터에 보여준다.
    - [x] 한 번의 요청당 20개씩 영화 목록을 보여준다.
    - [x] 더보기 버튼을 누르면 그 다음의 영화 목록을 불러온다.
      - [x] 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
    - [x] Skeleton UI를 구현한다.
    - [x] 포스터가 없는 경우 기본 이미지를 보여준다.
    - [x] 영화를 클릭하면 모달로 해당 영화의 정보를 보여준다.
    - [ ] 영화 목록을 무한 스크롤 방식으로 보여준다. (사용자가 브라우저 화면의 끝에 도달하면 그 다음 20개의 목록을 추가로 불러온다.)
    - [ ] 영화에 별점을 남길 수 있다. (2점, 4점, 6점, 8점, 10점 중 택 1)
      - [ ] 새로고침을 해도 유지된다.
    - [ ] 반응형 웹을 구현한다. (PC, 태블릿, 모바일에서 레이아웃이 깨지지 않는다.)
  - [x] 검색
    - [x] 엔터키를 눌러 검색할 수 있다.
    - [x] 검색 버튼을 클릭하여 검색할 수 있다.
    - [x] 검색시 헤더 포스터가 없어진다.
  - [x] 오류
    - [x] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
      - [x] API 요청 실패
      - [x] 검색 결과가 없는 경우

# 테스트 항목

- 메인 화면 테스트
- [x] 영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.
- [x] 더보기 클릭시 다음 페이지의 영화 20개 가져와서 보여준다.
- [x] 헤더에 인기순 첫번째 영화의 포스터, 제목, 별점을 보여준다.
- [x] 오류 발생시 오류를 보여준다.

- 검색 화면 테스트
- [x] 돋보기 클릭시 해당 제목의 영화를 검색하여 보여준다.
- [x] 입력 후 엔터를 누르면 해당 제목의 영화를 검색하여 보여준다.
- [x] 오류가 발생시 오류를 보여준다.
- [x] 검색 결과가 없으면 결과 없음을 보여준다.