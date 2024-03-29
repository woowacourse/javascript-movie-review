# javascript-movie-review

FE 레벨1 영화관 미션

---

# 1단계 구현 사항

## Domain

- [x] Movie : 개별 영화 데이터 객체
  - [x] 각각의 Movie는 영화 id, title, posterUrl, voteAverage가 담긴 movie 필드를 갖는다.
  - [x] movie 필드 안의 posterUrl는 절대경로로 변환된 URL 주소의 문자열값을 갖는다.
  - [x] getter를 통해 id, title, posterUrl, averageScore를 반환할 수 있다.
- [x] pageNumberManager
  - [x] 필요한 페이지 각각의 로드된 페이지 상태를 기억한다.

## Service

- [x] MovieService
  - [x] TMDB API를 통해 필요한 영화 목록을 요청하고 수신한다.
  - [x] TMDB API를 통해 수신한 영화 목록을 도메인 객체의 배열 형태로 반환한다.
    - [x] "지금 인기 있는 영화" 목록을 생성하여 반환할 수 있다.
    - [x] 검색 키워드가 포함된 영화에 대한 "검색 결과" 목록을 생성하여 반환할 수 있다.

## Controller

- [x] MovieService를 통해 영화 데이터를 받아 컴포넌트로 넘긴다.
  - [x] 검색어 입력폼을 통해 검색어가 입력되면 해당 검색어가 포함된 영화 데이터를 받아 컴포넌트로 넘긴다.
  - [x] 영화 데이터 fetching이 실패하면 에러 메시지와 함께 재시도 버튼을 띄운다.
  - [x] 5회를 초과하여 실패시 에러 메시지와 함께 재시도 버튼을 제거한다.

## UI

- [x] Header

  - [x] 로고 이미지를 누르면 앱의 첫 화면으로 돌아간다.
  - [x] 영화 검색어 입력폼을 구현한다.

- [x] MovieContainer

  - [x] AppController로부터 받은 영화 데이터를 화면에 출력한다.
    - [x] "지금 인기 있는 영화", "키워드 검색 결과"에 따라 섹션 제목을 채운다.
    - [x] 각 영화 별로 데이터가 완전히 로드되기 전까지는 스켈레톤 UI를 생성하여 유지한다.
    - [x] 각 영화 별로 데이터가 완전히 로드되면 스켈레톤 UI 영역을 실제 영화 데이터로 대체한다.
    - [x] 포스터 이미지가 존재하지 않는 영화에는 포스터 영역에 placeholder 이미지를 채운다.
  - [x] 다음에 불러올 영화 데이터가 존재한다면 영화 목록 하단에 "더 보기" 버튼을 출력한다.
    - [x] "더 보기" 버튼을 누르면 다음 영화 데이터를 가져와 출력한다.
  - [x] 다음에 불러올 영화 데이터가 없다면 "더 보기" 버튼을 출력하지 않는다.
  - [x] 검색 결과가 없다면 화면의 스켈레톤 UI를 모두 없애고 안내 문구를 출력한다.

- [x] Button

  - [x] 타입, 크기, 형식, 이름을 입력받아 버튼을 생성해 반환한다.

- [x] Toast

  - [x] 문구를 받아 하단에 잠시 머물렀다 사라진다.

- [x] MovieItem

  - [x] 스켈레톤 아이템을 만들어 반환한다.
  - [x] 스켈레톤 아이템에 비동기로 받은 데이터를 주입해 업데이트 한다.

- [x] MovieList
  - [x] 스켈레톤 아이템 배열을 만들어 반환한다.

# test

- 오류 테스트

  - [x] 에러가 발생한 경우 toast를 띄워 안내한다.
  - [x] 에러가 발생한 경우 재요청 버튼을 눌러 다시 api를 요청할 수 있다.
  - [x] 5번을 초과한 재요청 시도시 더 이상 요청할 수 없게 제한한다.

- E2E 테스트

  - [x] 로고를 클릭하면 메인 페이지로 돌아간다.
  - [x] 더 보기를 누르면 영화 리스트를 더 불러온다.
  - [x] 더 불러올 영화 목록이 없으면 더 보기 버튼을 띄우지 않는다.
  - [x] 키워드로 검색하면 검색 페이지로 전환된다.
  - [x] 키워드와 일치하는 영화가 없으면 검색 결과가 없다고 안내한다.
  - [x] 검색어를 입력하지 않으면 검색어가 없다고 안내한다.

# 2단계 구현 사항

## Domain

- [ ] MovieDetail : 개별 영화에 대한 상세 내용 데이터 객체
  - [ ] MovieDetail은 영화 id, title, genres, posterUrl, voteAverage, userScore가 담긴 데이터 필드를 갖는다.
  - [ ] getter를 통해 id, title, genres, posterUrl, averageScore, userScore를 반환할 수 있다.

## Service

- [ ] MovieService
  - [ ] TMDB API를 통해 특정 영화 ID에 대한 영화 상세 정보를 요청하고 수신하여 반환한다.
    - [ ] 장르에 대한 정보는 string[] 형태로 가공한다.
    - [ ] 해당 영화 ID에 대한 사용자 별점 정보가 localStorage에 존재할 경우 해당 내용을 userScore 필드에 포함하여 반환한다.
  - [ ] 특정 영화 ID에 대한 사용자 별점 정보 입력이 들어왔을 경우 이를 localStorage에 저장한다.

## Controller

- [ ] MovieList 컴포넌트에서의 특정 영화에 대한 상세 조회 요청을 처리한다.

  - [ ] MovieService를 통해 해당 영화의 상세 정보를 받아 모달 컴포넌트로 넘긴다.
  - [ ] 영화 데이터 fetching이 실패하면 에러 메시지와 함께 재시도를 안내한다.
  - [ ] 같은 작업이 5회를 초과하여 실패시 에러 메시지와 함께 이후의 재시도를 막는다.

- [ ] MovieDetailModal 컴포넌트에서의 특정 영화에 대한 사용자 별점 추가 요청을 처리한다.
  - [ ] MovieService를 통해 해당 영화에 대한 사용자 별점 정보를 localStorage에 저장하도록 한다.

## UI

- [ ] MovieDetailModal: 영화 상세 정보 모달을 구현한다.

  - [ ] 모달 안에는 제목, 포스터, 장르 목록, 별점, 줄거리가 포함되어야 한다.
  - [ ] 모달 상단 중앙에는 제목이 위치하며, 상단 우측에는 모달을 닫을 수 있는 'X' 버튼이 위치해야 한다.
  - [ ] 모달은 'X'버튼이나 ESC키, 또는 배경영역 클릭으로 닫을 수 있어야 한다.

  - [ ] 해당 영화에 대한 사용자 별점 추가 기능을 구현한다.

    - [ ] 별점은 5개로 구성되고 하나당 2점이며 1점 단위는 고려하지 않는다.
    - [ ] 각 별의 위치에 커서를 올릴 때 별점의 성격을 나타내는 안내 텍스트를 표기해야 한다.

  - [ ] 반응형 레이아웃을 구현해야 한다.
    - [ ] PC/태블릿 화면에서는 모달이 스크린 영역의 정중앙에 위치해야 한다.
      - [ ] 포스터 이미지는 모달의 좌측 영역에, 나머지 내용은 우측 영역에 배치한다.
    - [ ] 모바일 화면에서는 모달이 스크린 영역의 하단에 위치해야 한다.
      - [ ] 포스터 이미지는 숨김 처리 되어야 한다.

- [ ] MovieContainer, MovieList
  - [ ] 영화 목록에 대한 무한 스크롤 기능을 구현한다.
    - [ ] 기존에 있던 "더 보기" 버튼은 제거한다.
