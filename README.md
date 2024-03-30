# javascript-movie-review

# STEP 1

FE 레벨1 영화관 미션

## 영화

- [x] 제목, 평점, 이미지, 장르, 설명, id를 속성으로 갖는다.

## 영화API서비스

- [x] 영화 목록의 1페이지를 인기순으로 불러온다.
- [x] 20개씩 영화 목록을 보여준다.
- [x] 영화 검색 API를 이용하여 제목으로 영화를 검색할 수 있다.

## UI (조회, 검색 동일)

- [x] 더보기 버튼을 누르면 그 다음의 영화 목록을 20개 불러와서 화면에 출력한다.
  - [x] 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
- [x] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
- [x] 엔터키를 눌러 검색할 수 있다
- [x] 검색 버튼을 클릭하여 검색할 수 있다

## 에러 핸들링

- [x] 오류가 발생하는 경우에는 사용자에게 오류 메시지를 띄워 준다.
- [x] 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.
  - [x] Toast UI 로 에러 메시지를 출력

# STEP 2

## 📺 영화 상세 정보 조회

- [x] API에서 제공하는 항목을 활용하여 상세 정보를 보여주는 모달 창을 구현한다.
- [ ] 키보드의 ESC 키를 누르면 모달 창을 닫을 수 있는 등 사용성을 고려한다.

## ⭐️ 별점 매기기

- [ ] 사용자는 영화에 대해 별점을 줄 수 있으며 새로고침하더라도 사용자가 남긴 별점은 유지되어야 한다.
- [x] 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않는다.
  - 2점: 최악이예요
  - 4점: 별로예요
  - 6점: 보통이에요
  - 8점: 재미있어요
  - 10점: 명작이에요

## 📐 UI/UX 개선하기

- [ ] 영화 목록과 영화 상세 정보가 뜨는 모달창에 대한 반응형 레이아웃을 구성한다.
- [ ] 영화 목록에서 더보기 버튼을 눌렀을 때 페이징하는 방식에서 무한 스크롤 방식으로 변경한다.
  - 검색 결과 화면에서 사용자가 브라우저 화면의 끝에 도달하면 그 다음 20개의 목록을 서버에 요청하여 추가로 불러올 수 있다.
