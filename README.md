# javascript-movie-review

FE 레벨1 영화 리뷰 미션

- 접속 링크:

## 🎯 기능 요구사항

1. 🎬 영화 목록 조회 (인기순)

- [x] 영화 목록의 1페이지를 불러온다.
  - [x] 영화 데이터를 영화 아이템으로 표시한다.
  - [x] TMDB에 영화 목록 API를 요청하고 그 값을 받아온다.
  - [x] 받아온 내용으로 영화 목록 컴포넌트를 구성한다.
- [x] 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
  - [x] 영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
  - [x] 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
  - ⚠️ 인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
- [ ] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
  - Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

2. 🔎 검색

- [x] 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - [x] 검색 버튼을 클릭하여 검색할 수 있다.
  - [x] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다.
  - [x] 검색한 결과가 하나도 없을 경우 안내 UI를 표시한다.
  - [x] 엔터키를 눌러 검색할 수 있다.
- [ ] 검색 결과에서 메인 로고를 누르면 영화 목록 조회로 돌아온다.

3. ⚠️ 오류

- [ ] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
  - [ ] alert로 해당하는 오류 메세지를 띄운다.
  - [ ] 인터넷이 되지 않는 환경에서 요청을 보내는 경우

4. UI/UX

- [ ] 영화 포스터를 불러오지 못한 경우 기본 이미지를 적용한다.

5. 배포

- [ ] 실행 가능한 페이지에 접근할 수 있도록 github page 기능을 이용하고, 해당 링크를 PR과 README에 작성한다.
