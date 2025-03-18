## 1단계 기능목록 작성

#### 영화 목록 조회 (인기순)
- [ ]영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
- [ ]페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
- [ ]인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않는다.
- [ ]영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
- [ ]영화 목록 아이템에 대한 Skeleton UI를 구현한다.

#### 검색
- [ ] 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
- [ ] 엔터키를 눌러 검색할 수 있다
- [ ] 검색 버튼을 클릭하여 검색할 수 있다

#### 오류
- [ ]오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.




#### 프로그래밍 요구사항
- [ ]API key를 공개된 저장소에 포함하지 않는다.
- [ ]비동기 통신에서 실패할 경우를 대비한다.
- [ ]비동기 통신에서 일어날 수 있는 다양한 상황을 고려해 본다.
- [ ]비동기 호출을 포함한 사용자 기능 플로우를 선정하고 기능을 포함하여 E2E 테스트를 작성한다.
- [ ]특정한 패턴에 사고를 끼워 맞추지 않고 단지 역할과 책임에 따라 관심사를 분리한다.
- [ ]어떠한 관점에서 역할과 책임에 따라 관심사를 분리하였는지 리뷰어에게 설명할 수 있어야 한다.
- [ ]도메인 영역을 TypeScript를 사용해 구현한다. (UI 영역은 선택)
- [ ]any를 사용하지 않는다.
- [ ]API에서 응답한 데이터의 규격을 문자열 그대로 활용하지 않고 도메인 객체를 만들어 활용한다.