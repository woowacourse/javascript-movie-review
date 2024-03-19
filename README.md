# javascript-movie-review

FE 레벨1 영화관 미션

---

# 1단계 구현 사항

## Domain

- [x] Movie : 개별 영화 데이터 객체
  - [x] 각각의 Movie는 영화 id, title, posterUrl, voteAverage가 담긴 movie 필드를 갖는다.
  - [x] movie 필드 안의 posterUrl는 절대경로로 변환된 URL 주소의 문자열값을 갖는다.
  - [x] getter를 통해 id, title, posterUrl, averageScore를 반환할 수 있다.

## Service

- [ ] MovieService
  - [ ] TMDB API를 통해 영화 목록을 요청한다.
    - [ ] 영화 데이터 수신에 성공하면 데이터를 처리한다.
      - [ ] 필요 데이터 : page(현재 페이지), total_pages(전체 페이지수), results.id, results.title, results.poster-path, results.score,
      - [ ] 이중 results에 해당하는 데이터를 모아 개별 Movie 객체를 만든다.
      - [ ] 페이지 정보는, "더 보기" 버튼을 활성화하여 다음 API 호출을 연결하는 조건으로 활용한다.
    - [ ] 영화 데이터 수신에 실패하면? error를 토해낸다.
  - [ ] TMDB API를 통해 영화 키워드 검색 결과를 요청한다.
    - [ ] 영화 데이터 수신에 성공하면 데이터를 처리한다.
      - [ ] 필요 데이터 : page(현재 페이지), total_pages(전체 페이지수), results.id, results.title, results.poster-path, results.score,
      - [ ] 이중 results에 해당하는 데이터를 모아 개별 Movie 객체를 만든다.
      - [ ] 페이지 정보는, "더 보기" 버튼을 활성화하여 다음 API 호출을 연결하는 조건으로 활용한다.
    - [ ] 영화 데이터 수신에 실패하면? error를 토해낸다.
