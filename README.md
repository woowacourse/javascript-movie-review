# javascript-movie-review

FE 레벨1 영화관 미션

## TODO List

- ### UI

  - Header
    - [x] 검색창
  - Main
    - [x] Movie List
    - [x] Movie Item
    - [x] 더보기 버튼

- ### UI Refactoring
- [x] Header
- [x] Movie List
- [x] Movie Item
- [x] 더보기 버튼

### UI Logic

- [x] 검색기능
  - [ ] input에 required 추가.
  - [ ] 검색 결과 없을 시 "검색 결과가 없습니다" 리스팅
- [x] 더보기 기능

### State

- [x] 검색 버튼을 누르면
  - page -> 1
- [x] 더보기를 누르면
  - page -> page + 1
- [x] total Page랑 page가 같으면 더보기 삭제

### others

- [ ] 로고 눌렀을 시 새로고침
- [x] 추가 영화 스켈레톤UI 적용
- [x] 에러 핸들링
- [x] 별점 반올림

## cypress

- [x] 검색 기능 테스트
- [x] 더보기 테스트

## Feedback

- 다른 더 쉬운 방식으로도 input에 해당 속성들을 넣어줄 수 있음.
- <input type="search">도 있음
- getButton이라는 네이밍은 너무 제너럴
- 앱의 규모가 지금처럼 크지 않을 땐 전역변수로 관리하는 것이 큰 문제가 되진 않겠지만, 확장성을 고려하였을 때 언제 어디서 값이 변경될지 모르는 이와 같은 방식은 매우 위험합니다.
