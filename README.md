# javascript-movie-review

## 1단계 - 영화 목록 불러오기 🎞

- 영화 목록 조회 (인기순)

  - [x] 영화 목록의 1페이지를 불러온다 (더보기 버튼을 누르면 추가 불러 올 수 있다)
  - [x] TMDB에서 인기순으로 정렬된 데이터를 제공받아 인기순 목록을 출력한다.
  - [x] 한 페이지당 20개씩 영화 목록을 보여준다.
  - [x] 로딩 가능한 마지막 페이지에 도달한 경우, 더보기 버튼을 없애고 마지막 페이지임을 안내한다.

- 검색

  - [x] 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - [x] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 영화 목록 조회 화면과 동일

- 오류
  - [x] 오류가 발생하는 경우, 사용자를 위한 오류 화면을 보여준다.

### 컴포넌트

- [x] MovieReviewHeader

  - 영화 리뷰 사이트의 헤더 컴포넌트
  - 영화 리뷰 로고와 영화 검색창을 가지고 있다.

- [x] MovieSearchInput

  - 영화 검색 컴포넌트
    - 엔터 키와 검색 버튼을 이용하여 검색할 수 있다.

- [x] MovieList
- 사용자 요청에 따른(지금 인기있는 영화 목록, 검색한 영화 목록) 영화 목록들을 보여주는 컴포넌트
- 각 영화 아이템을 포함한다.

- [x] MovieItem

  - 영화 정보를 보여주는 컴포넌트
  - 영화 포스터, 영화 제목, 별점을 포함한다.

- [x] MoreMoviesButton
  - 클릭 시 영화 목록 하단에 새 페이지(영화 20개 정보)를 추가한다.
  - 페이지 끝에 도달한 경우 더보기 버튼을 화면에 출력하지 않는다.

## 2단계 - 상세 정보 & UI/UX 개선하기

### 기능

- 영화 상세 정보 조회

  - [x] 영화 리스트에 있는 영화를 클릭하면 해당 영화에 대한 상세 정보 모달이 등장한다.
  - [x] 모달은 esc 키로도 닫을 수 있다.

- 내 별점 등록

  - [x] 영화 상세 정보 모달에서 별점 버튼을 통해 별점을 매길 수 있다.
    - 클릭한 별 버튼과 해당 버튼의 모든 왼쪽 버튼에 색이 칠해진다.
  - [x] 매긴 별점에 따라 해당 별점에 해당하는 점수와 문구를 출력한다.
    - 2점: 최악이예요
    - 4점: 별로예요
    - 6점: 보통이에요
    - 8점: 재미있어요
    - 10점: 명작이에요
  - [x] 등록한 별점 정보는 새로고침해도 사라지지 않는다.

- 반응형 UI 제작

  - [] 모달, 헤더에 반응형 UI를 적용한다.
    반응형 대상은 데스크탑, 태블릿, 모바일 환경이다.
  - [] 반응형 모달
    - [] 데스크탑, 태블릿: 보여지는 내용은 같으나 데스크탑 환경의 너비가 더 넓다.
    - [] 모바일: 영화 포스터를 제외한 나머지 요소만 보여준다.
  - [] 반응형 헤더
    - [] 데스크탑, 태블릿: 보여지는 내용은 같으나 데스크탑 환경의 로고 - 검색창 간 거리가 더 멀다.
    - [] 모바일: 로고와 단순 돋보기 버튼만 보여준다. 돋보기 버튼을 누르면 기존 검색창을 보여준다.
      - 이때 보여지는 검색창은 로고를 가릴 정도의 너비이다.

- 무한 스크롤
  - [x] 서버에서 불러오는 데이터가 20개 이상인 경우 더보기 버튼 대신 무한 스크롤을 이용해 남은 정보를 렌더링한다.

### 컴포넌트

- [x] MovieItemModal

  - 클릭한 영화의 상세 정보를 보여주는 컴포넌트
  - 제목, 포스터, 장르, 평점, 줄거리를 보여준다.
  - 추가적으로, '내 별점'을 등록할 수 있다.

- [x] MovieItemHeader

  - MovieItemModal의 일부로, 영화 제목과 모달 닫기 버튼을 포함한다.

- [x] MovieItemContent

  - MovieItemModal의 일부로, 영화 포스터, 장르, 평점, 줄거리, Myscore 요소를 포함한다.

- [x] Myscore

  - MovieItemContent의 일부로, 별점을 매길 수 있는 기능과 별점에 따른 문구를 출력한다.

- [x] StarRatingButton

  - Myscore의 일부로, 클릭하면 자신을 포함한 좌측 StarRatingButton의 배경색이 toggle된다.
