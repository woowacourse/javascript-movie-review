# javascript-movie-review

# FE 레벨1 영화 리뷰 미션

### 구현 사항

- [x] 컴포넌트 분리
  - [x] 헤더
  - [x] 검색창
  - [x] 썸네일 리스트
  - [x] 평점
  - [x] 버튼
  - [x] 푸터
- [x] 기능
  - [x] 영화 목록 조회 (인기순)
    - [x] 로고 클릭시 첫 화면을 보여준다.
    - [x] 가장 상위 영화를 헤더 포스터에 보여준다.
    - [x] 한 번의 요청당 20개씩 영화 목록을 보여준다.
    - [x] 더보기 버튼을 누르면 그 다음의 영화 목록을 불러온다.
      - [x] 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
    - [x] Skeleton UI를 구현한다.
    - [x] 포스터가 없는 경우 기본 이미지를 보여준다.
  - [x] 검색
    - [x] 엔터키를 눌러 검색할 수 있다.
    - [x] 검색 버튼을 클릭하여 검색할 수 있다.
    - [x] 검색시 헤더 포스터가 없어진다.
  - [x] 오류
    - [x] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
      - [x] API 요청 실패
      - [x] 검색 결과가 없는 경우

### 테스트 항목

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

---

# FE 레벨2 영화 리뷰 미션

### 구현 사항

- [x] 영화 상세정보 조회

  - [x] 영화 아이템 클릭시 해당 영화의 상세정보를 불러온다.
  - [x] 상세정보를 모달을 통해 보여준다.
  - [x] 키보드의 ESC 키를 누르면 모달 창을 닫을 수 있다.

- [x] 별점 매기기
  - [x] 각 영화의 상세 정보 모달에서 별점 기능을 추가한다.
  - [x] 새로고침하더라도 별점은 유지되어야 한다.
  - [x] 별점은 5개로 구성되어 있으며 한 개당 2점이다.
  ```
  2점: 최악이예요
  4점: 별로예요
  6점: 보통이에요
  8점: 재미있어요
  10점: 명작이에요
  ```
- [x] 무한 스크롤
  - [x] 더보기 버튼을 눌렀을 때 페이징하는 방식을 무한 스크롤 방식으로 변경한다.
- [x] 반응형 레이아웃 구성
  - [x] 태블릿 화면
  - [x] 모바일 화면

### 테스트 항목

- [ ] 모달창 여닫힘

  - [ ] `자세히 보기` 버튼 클릭시 헤더에 있는 영화의 디테일 모달창이 열린다.
  - [ ] 영화 아이템 클릭시 해당 영화의 디테일 모달창이 열린다.
  - [ ] 클로즈(X)버튼 클릭시 모달창이 닫힌다.
  - [ ] 모달 뒷배경 클릭시 모달창이 닫힌다.
  - [ ] ESC를 누르면 모달창이 닫힌다.

- [ ] 영화 디테일 화면

  - [ ] 클릭한 별점대로 별점 설명서가 바뀐다.
  - [ ] 클릭한 별점대로 별점 점수가 바뀐다.
  - [ ] 별점을 한번 등록한 후 모달창을 껐다 켜도 해당 별점이 표시되어 있다.

- [ ] 반응형 레이아웃
  - [ ] 태블릿 화면(768px)일 때 모달창이 아래로 열린다.(바톰 시트)
  - [ ] 모바일 화면(479px)일 때 모달창 내 포스터 이미지가 사라진다.
