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
    - [x] 무한 스크롤
    - [x] 영화 클릭시 상세 모달
      - [x] 영화 상세 정보 fetch
      - [x] 별점 매기기
      - [x] 별점 로컬스토리지 저장
      - [x] 모달 스켈레톤 구현
      - [x] 상세 설명이 없을 때의 UI 구현.
  - [x] 반응형 페이지 구현
    - [x] 영화 상세 모달 반응형
    - [x] 헤더 반응형 input

- ### UI Refactoring
- [x] Header
- [x] Movie List
- [x] Movie Item
- [x] 더보기 버튼

### UI Logic

- [x] 검색기능
  - [x] input에 required 추가.
  - [x] 현재 검색어와 같은 검색어라면 검색하지 않는다.
  - [x] 검색 결과 없을 시 "검색 결과가 없습니다" 리스팅
- [x] 더보기 기능
- [x] 스크롤 맨 위로 이동 버튼 추가
- [ ] 번쩍이는 느낌을 없애기 위한 스켈레톤 UI 애니메이션 적용
- [ ] 헤더 Search Form에 애니메이션 적용
- [ ] not을 사용하여 형제 요소 선택하기

### State

- [x] 검색 버튼을 누르면
  - page -> 1
- [x] 더보기를 누르면
  - page -> page + 1
- [x] total Page랑 page가 같으면 더보기 삭제

### others

- [x] 로고 눌렀을 시 새로고침
- [x] 추가 영화 스켈레톤UI 적용
- [x] 에러 핸들링
- [x] 별점 반올림
- [ ] LocalStorage에 영화정보 저장

## cypress

- [x] 검색 기능 테스트
- [x] 더보기 테스트
- [x] 모달창 오픈/클로즈 테스트
- [x] 별점 리뷰 테스트
- [x] 무한 스크롤 테스트

## Feedback

- 다른 더 쉬운 방식으로도 input에 해당 속성들을 넣어줄 수 있음.
- <input type="search">도 있음
- getButton이라는 네이밍은 너무 제너럴
- 앱의 규모가 지금처럼 크지 않을 땐 전역변수로 관리하는 것이 큰 문제가 되진 않겠지만, 확장성을 고려하였을 때 언제 어디서 값이 변경될지 모르는 이와 같은 방식은 매우 위험합니다.
- 어떤 submit을 핸들링 하는 함수인가요?
  - event의 타입을 구체적으로 줄 수는 없을까요?
- fetch 하는 로직이 view에 섞여 있는 부분 수정
- append 메서드 사용
- 적절한 await 사용
