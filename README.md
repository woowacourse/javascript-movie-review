# javascript-movie-review

FE 레벨1 영화 리뷰 미션

## 2단계 구현 요구 사항

- [ ] 썸네일 + 서치바 디자인 변경
- [x] 영화 상세 조회 모달
  - [ ] ESC 누를 시 모달 닫기
- [x] 반응형
  - [x] 태블릿 크기 이하는 모달 대신 바텀시트가 뜨도록 구현
- [ ] 별점 매기기
  - [ ] 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않는다.
  - [ ] 사용자는 영화에 대해 별점을 줄 수 있으며 새로고침하더라도 사용자가 남긴 별점은 유지되어야 한다.
- [ ] 영화 목록에서 더보기 버튼을 눌렀을 때 페이징하는 방식에서 무한 스크롤 방식으로 변경

## 기능 요구 사항

- [x] 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
  - [x] 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
  - [x] ⚠️ 인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
    - [x] 영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
- [x] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
  - [x] Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

2. 🔎 검색

- [x]영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - [x]엔터키를 눌러 검색할 수 있다
  - [x]검색 버튼을 클릭하여 검색할 수 있다
  - [x]영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다

3. ⚠️ 오류

- [x] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.

## 구현 요구 사항

### 기능

- [x] 검색기능
- [x] 페이지네이션
  - [x] 마지막 페이지는 더보기 버튼 없음
- [x] 영화 렌더링
  - [x] 스켈레톤 UI
- [x] 오류 발생시 오류 메시지

### 기본 UI 구현

- [x] 썸네일 이미지 박스(헤더)
- [x] 검색창 + 사이트제목
- [x] 메인
  - [x] 영화섹션(title, data 받아오게)
  - [x] 영화아이템 li
  - [x] 더보기 버튼
- [x] 푸터

### 도메인

- [x] 영화 목록 불러오기
- [x] 검색

Co-authored-by: kimyou1102 <kimyou1102@users.noreply.github.com>
