# javascript-movie-review

## `step1` 기능 요구사항

- [x] 영화 목록 조회 (인기순)
  - [x] [영화 목록](https://developers.themoviedb.org/3/movies/get-popular-movies)의 1페이지를 불러온다.
    - [x] **`더보기`** 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
    - [x] 단, 페이지 끝에 도달한 경우에는 **`더보기`** 버튼을 화면에 출력하지 않는다.
    - [x] ⚠️ **`인기순`**은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
    - [x] 영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
  - [x] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
    - [x] Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.
- [x] 검색
  - [x] [영화 검색 API](https://developers.themoviedb.org/3/search/search-movies)를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
    - [x] 엔터키를 눌러 검색할 수 있다
    - [x] 검색 버튼을 클릭하여 검색할 수 있다
    - [x] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다
    - [x] 검색 결과 텍스트를 보여준다.
    - [x] 검색 창 초기화
    - [x] 검색 결과 없을 때 화면
    - [x] 검색 결과 화면에서 뒷 배경 배너 없애기
- [x] 오류
  - [x] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
    - [x] 클라이언트 오류 (401, 400)
    - 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.
- [x] E2E 테스트 코드

  - [x] 목록
    - [x] 사용자가 영화 목록을 볼 수 있다.
    - [x] 사용자가 더 보기를 누르면 다음 목록을 보여준다.
  - [x] 검색
    - [x] 검색어를 입력했을 때 목록이 있다면 목록을 보여준다.
    - [x] 검색어를 입력했을 때 목록이 없다면 빈 화면을 보여준다.
      - “**검색 결과가 없습니다.”**

- [x] UX
  - [x] default 이미지 넣기
  - [x] 헤더 배경 화면 정보 넣기

## `step2` 기능 요구사항

- [ ] 영화 상세 정보 조회 모달창 구현
  - [ ] API에서 제공하는 항목을 활용하여 상세 정보를 보여주는 모달 창 구현
  - [ ] 키보드의 ESC 키를 누르면 모달 창 닫기
- [ ] 별점 매기는 기능 구현 (TMDB API 요청과 연관 X)
  - [ ] 사용자는 영화에 대해 별점 주기
  - [ ] 새로고침하더라도 사용자가 남긴 별점은 유지
  - [ ] 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않음
    ```jsx
    2점: 최악이예요
    4점: 별로예요
    6점: 보통이에요
    8점: 재미있어요
    10점: 명작이에요
    ```
- [ ] UI/UX 개선
  - [ ] 영화 목록과 영화 상세 정보가 뜨는 모달창에 대한 반응형 레이아웃을 구성
  - [ ] 영화 목록에서 더보기 버튼을 눌렀을 때 페이징하는 방식에서 무한 스크롤 방식으로 변경
  - [ ] 검색 결과 화면에서 사용자가 브라우저 화면의 끝에 도달하면 그 다음 20개의 목록을 서버에 요청하여 추가로 불러오기
