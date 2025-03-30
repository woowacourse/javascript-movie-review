# javascript-movie-review

FE 레벨1 영화 리뷰 미션

# 기능 목록

[x] 영화 목록 첫 로딩 시 20개의 영화 리스트가 보여진다.

    - [x] 더보기 버튼을 누르면 다음 영화 목록 20개 리스트가 추가로 보여진다.

    - [x] 페이지 끝에 도달한 경우, 더보기 버튼을 화면에 출력하지 않는다.20개

[x] 데이터 로딩 동안 스켈레톤UI가 출력된다.
[x] 영화를 검색하면 해당 검색 목록이 출력된다.

    - [x] 엔터키로 검색할 수 있다.

    - [x] 검색 버튼을 클릭하여 검색할 수 있다.

    - [x] 검색 결과가 없을 경우 화면에 표시한다.

[x] 오류 발생 시 사용자를 위한 오류 메세지를 띄워준다.

    - [x] 통신 에러 사용자 메세지 등록

[x] 로고 클릭 시 페이지 새로고침

[x] 검색 시 스크롤 맨 위로 이동

[x] 영화 상세 정보 조회

[x] 별점 매기기

[x] 반응형 웹

[x] 무한 스크롤

[] 자세히 보기 클릭 시 상세 정보 조회

# 컴포넌트

[common]

- [x] StarRating.js
- [x] TabButton.js
- [x] Input.js
- [x] SerchInput.js
- [x] MovieItem.js
- [x] Footer.js
- [x] Header.js
- [x] MovieList.js
- [x] MovieLayout.js
- [x] Banner.js
- [x] Modal.js
- [x] MovieDetail.js
- [x] StartButton.js

[feature]

- [x] MyRating.js
- [x] MovieList.ts

# e2e

- [x] 첫 화면에 20개의 영화 목록이 보여지는지 확인
- [x] 영화 제목, 포스터, 평점이 올바르게 보여지는지 확인
- [x] 스크롤을 내리면 20개의 영화가 추가로 보여지는지 확인
- [x] 영화 목록의 영화 클릭 시 상세 정보 모달이 띄워지는지 확인
- [x] 별점 버튼 클릭 시 올바르게 점수가 매겨지는지 확인
