# javascript-movie-review

FE 레벨1 영화 리뷰 미션

## 1단계 기능 요구 사항

- [x] 영화 목록 조회(인기순)

  - [x] 영화 목록은 한 번의 요청 당 `20개`씩 보여준다.
  - [x] `더보기` 버튼을 누르면 그 다음 영화 목록을 불러올 수 있다.
  - [x] 페이지 끝에 도달한 경우 `더보기` 버튼을 화면에 출력하지 않는다.
  - [x] 영화 목록 아이템에 대한 스켈레톤 UI를 구현한다.

- [x] 검색

  - [x] 사용자가 키워드를 입력하면 해당 API에 키워드를 이용하여 영화 검색 결과를 요청한다.
  - [x] 검색 결과 데이터가 없는 경우 `검색 결과 없음 UI`를 통해 사용자에게 보여준다.
  - [x] 검색 요청
    - [x] 엔터키를 눌러서 검색할 수 있다.
    - [x] 검색 버튼을 클릭하여 검색할 수 있다.

- [x] 오류
  - [x] 오류에 맞는 에러 UI를 보여준다.

## 2단계 기능 요구 사항

- [ ] 영화 상세 정보 조회

  - [ ] 영화 포스터나 제목을 클릭하면 자세한 예고편이나 줄거리 등의 정보를 보여준다.
  - [ ] 키보드의 ESC 키를 누르면 모달 창을 닫을 수 있는 등 사용성을 고려한다.

- [ ] 별점 매기기

  - [ ] 사용자는 영화에 대해 별점을 줄 수 있으며 새로고침하더라도 사용자가 남긴 별점은 유지되어야 한다.
  - [ ] 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않는다.

- [ ] UI/UX 개선
  - [ ] 배너 UI 2단계 ver로 수정한다.
  - [ ] 반응형 웹 구상하여 디바이스의 너비에 따라 유동적으로 레이아웃이 조절되도록 UI 수정한다.
  - [ ] 영화 목록과 영화 상세 정보가 뜨는 모달창에 대한 반응형 레이아웃을 구성한다.
  - [ ] 영화 목록에서 더보기 버튼을 눌렀을 때 페이징하는 방식에서 무한 스크롤 방식으로 변경한다.
    - [ ] 검색 결과 화면에서 사용자가 브라우저 화면의 끝에 도달하면 그 다음 20개의 목록을 서버에 요청하여 추가로 불러올 수 있다.
