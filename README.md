# 영화 리뷰

## 🎯 기능 요구 사항

> javascript-movie-review
> FE 레벨1 영화 리뷰 미션

[🔗 배포 주소](https://shinjungoh.github.io/javascript-movie-review/)

<br>

## 🍿 영화 목록 불러오기

### 1. 🎬 영화 목록 조회 (인기순)

- [x] 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
- [x] 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
- [x] 영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
  - [ ] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
  - [ ] Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

### 2. 🔎 검색

- [ ] 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - [ ] 엔터키를 눌러 검색할 수 있다.
  - [ ] 검색 버튼을 클릭하여 검색할 수 있다.
  - [ ] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다
  - [x] 검색 결과가 없을 경우, 검색 결과가 없다는 화면을 보여준다.

### 3. ⚠️ 오류

- [ ] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
- [ ] 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.

<br>

## ✅ 프로그래밍 요구사항

- [x] API key를 공개된 저장소에 포함하지 않는다.
- [x] 비동기 통신에서 실패할 경우를 대비한다.
  - [ ] 비동기 통신에서 일어날 수 있는 다양한 상황을 고려해 본다.
- [ ] 비동기 호출을 포함한 사용자 기능 플로우를 선정하고 기능을 포함하여 E2E 테스트를 작성한다.
- [ ] 특정한 패턴에 사고를 끼워 맞추지 않고 단지 역할과 책임에 따라 관심사를 분리한다.
  - [ ] 어떠한 관점에서 역할과 책임에 따라 관심사를 분리하였는지 리뷰어에게 설명할 수 있어야 한다.
- [x] 도메인 영역을 TypeScript를 사용해 구현한다. (UI 영역은 선택)
  - [ ] any를 사용하지 않는다.
  - [x] API에서 응답한 데이터의 규격을 문자열 그대로 활용하지 않고 도메인 객체를 만들어 활용한다.

<br>

## 📝 커밋 메시지

- feat : 새로운 기능을 추가한 경우
- fix : 버그 수정
- docs : 문서를 수정한 경우
- style : 코드 스타일, 포멧, 주석을 변경
- refactor : 코드 리팩토링
- test : 테스트 관련 코드를 수정한 경우
- chore : 코드 수정이 아닌, 단순 폴더명 파일명 등을 수정한 경우
- remove: 파일이나 로직을 삭제한 경우
