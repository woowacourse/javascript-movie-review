# javascript-movie-review

## 기능 요구사항

- [ ] 영화 목록 조회 (인기순)
  - [x] [영화 목록](https://developers.themoviedb.org/3/movies/get-popular-movies)의 1페이지를 불러온다.
    - [x] **`더보기`** 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
    - [x] 단, 페이지 끝에 도달한 경우에는 **`더보기`** 버튼을 화면에 출력하지 않는다.
    - [x] ⚠️ **`인기순`**은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
    - [x] 영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
  - [ ] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
    - [ ] Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.
- [x] 검색
  - [x] [영화 검색 API](https://developers.themoviedb.org/3/search/search-movies)를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
    - [x] 엔터키를 눌러 검색할 수 있다
    - [x] 검색 버튼을 클릭하여 검색할 수 있다
    - [x] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다
    - [x] 검색 결과 텍스트를 보여준다.
    - [x] 검색 창 초기화
    - [x] 검색 결과 없을 때 화면
    - [x] 검색 결과 화면에서 뒷 배경 배너 없애기
- [ ] 오류
  - [ ] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
    - [ ] 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.
- [ ] UX
  - [ ] default 이미지 넣기
  - [ ] 헤더 배경 화면 정보 넣기
