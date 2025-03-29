# javascript-movie-review

FE 레벨1 영화 리뷰 미션

## step1

### 요구사항

- [x] 영화 목록의 1페이지를 불러온다.

- [x] 더보기 버튼을 누르면 그 다음의 영화 목록을 불러올 수 있다.

  - [x] 영화는 한 번의 요청당 20개씩 보여준다.
  - [x] 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.

- [x] 영화목록 아이템에 대한 스켈레톤 UI를 구현한다.

- [x] 엔터키를 누르거나 검색 버튼을 클릭하여 검색할 수 있다.

- [x] 오류가 발생하는 경우에 사용자를 위한 오류 메세지를 띄워 준다.
  - [x] 서버와의 통신 오류 (GET POST 실패)
  - [x] 이벤트 핸들러에 대한 오류

### 작업순서

- [x] render 함수로 App 컴포넌트 렌더링(App은 최상위 컴포넌트)
- [x] domHelper 함수 작성(selector가 없을 때의 예외처리)
- [x] 공통 버튼 컴포넌트 구현

- [x] Header 구현

  - 별점, 제목, 해당 영화 이미지를 props로 받는다.

- [x] 영화 리스트 GET

  - [x] 환경 변수 세팅
  - [x] fetch 이용하여 GET

- [x] GET 해온 영화리스트를 map하는 컴포넌트 생성

## step2

### 기능 요구 사항

- [x] 영화 상세 정보 조회
  - [x] API에서 제공하는 항목을 활용하여 상세 정보를 보여주는 모달 창을 구현한다.
  - [x] 키보드의 ESC 키를 누르면 모달 창을 닫을 수 있는 등 사용성을 고려한다.
- [x] 별점 매기기
  - [x] 사용자는 영화에 대해 별점을 줄 수 있으며 새로고침하더라도 사용자가 남긴 별점은 유지되어야 한다.
  - [x] 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않는다.
    - 2점: 최악이예요
    - 4점: 별로예요
    - 6점: 보통이에요
    - 8점: 재미있어요
    - 10점: 명작이에요
- [ ] UI/UX 개선하기
  - [ ] 영화 목록과 영화 상세 정보가 뜨는 모달창에 대한 반응형 레이아웃을 구성한다.
  - [x] 영화 목록에서 더보기 버튼을 눌렀을 때 페이징하는 방식에서 무한 스크롤 방식으로 변경한다.
  - [x] 검색 결과 화면에서 사용자가 브라우저 화면의 끝에 도달하면 그 다음 20개의 목록을 서버에 요청하여 추가로 불러올 수 있다.
