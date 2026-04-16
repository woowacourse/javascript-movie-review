# 요구 사항 목록

## 영상 목록 조회

- [x] 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
- [x] 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
- [x] 영화는 한 번의 요청당 20개씩 영화 목록을 보여준다.
- [x] 영화 목록을 불러오는 동안 Skeleton UI 를 보여준다
  - [x] Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

## 검색

- [x] 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - [x] 엔터키를 눌러 검색할 수 있다
  - [x] 검색 버튼을 클릭하여 검색할 수 있다
  - [x] 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다

## 오류

- [x] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
  - [x] 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.

---

# 기능 목록

## 퍼블리싱

### 기본 UI

- [x] 영화 목록 검색 input
- [x] 정렬 버튼 삭제
- [x] 더보기 버튼
  - [x] 다음 페이지 없으면 제거
- [x] 영화 리스트 background 변경

### 검색 시 UI

- [x] 검색 시(엔터, 검색 버튼 클릭) 인기 영화 배너 hidden
- [x] 검색 결과 없을 때 영화 배열 및 더 보기 버튼 hidden
- [x] 검색 결과 없음 UI

### 조회 에러 UI

- [x] 검색 결과가 없음 UI에서 텍스트 변경 + 재시도 버튼 추가

## 기능

### 메인 페이지

- [x] 최초 접근 시 인기순 영화 20개 렌더링

### 더보기 버튼

- [x] api 함수 받아서 호출

### 검색

- [x] 검색 버튼 클릭 or 엔터 입력 시 검색 api 호출
- [x] 검색 버튼 클릭 시 keyword 파라미터 추가
  - [x] 이전 검색 기록 남아있는 버그 수정

### 로고

- [x] 클릭 시 기본 UI로

---

## 미룬이

- [ ] getElementById로 가져온 html 요소 타입 좁혀주는 유틸
- [x] TMDBError class 사용에 대해 논의
- [x] 빈 keyword 검색 시 기본 UI로 변경
- [ ] parameter로 관리하는 page가 1일 때도 보여지게 하는게 맞을까? 안 보이게 할까?
- [x] E2E 테스트
- [ ] 돔 접근을 어디서 할 것인지 기준 세우기 (인자로 받기 vs 함수 안에서 호출하기)
- [ ] 동일 검색어 api 요청 막기

## E2E 테스트 목록

- [x] 처음 앱에 도달했을 때 메인 구성 요소가 렌더링 되는지 테스트
  - given: 없음
  - when: 페이지 진입
  - then
    - main-thumbnail-list 렌더링
    - banner 렌더링
    - logo 렌더링
    - search input 렌더링

- [x] 더 보기 기능 (main)
  - given: 페이지 진입, 더 보기 버튼
  - when: 더 보기 버튼 클릭
  - then: 기존 영화 목록에 추가 영화 목록이 append됨

- [x] 더 보기 기능 (search)
  - given: 검색어 입력 후 검색, 더 보기 버튼
  - when: 더 보기 버튼 클릭
  - then: 기존 검색 결과 목록에 추가 결과가 append됨

- [x] 검색 기능 - 버튼 클릭
  - given: 영화 검색 input에 검색어 입력
  - when: 검색 버튼 클릭
  - then
    - search-thumbnail-list 렌더링
    - URL에 keyword parameter 추가
    - subtitle이 "${검색어} 검색 결과"로 변경

- [x] 검색 기능 - 엔터 입력
  - given: 영화 검색 input에 검색어 입력
  - when: 엔터 키 입력
  - then
    - search-thumbnail-list 렌더링
    - URL에 keyword parameter 추가
    - subtitle이 "${검색어} 검색 결과"로 변경

- [x] 검색 후 메인으로 복귀(logo 클릭)
  - given: 검색 결과 화면
  - when: 로고 클릭
  - then
    - main-thumbnail-list 렌더
    - banner 렌더링
    - keyword parameter 제거

- [x] 검색 후 메인으로 복귀(빈 문자열 검색)
  - given: 검색 결과 화면
  - when: 빈 문자열 검색
  - then
    - main-thumbnail-list 렌더링
    - banner 렌더링
    - keyword parameter 제거

---

# 상세 정보 & UI/UX 개선하기

- [x] 더 보기 -> 무한스크롤
  - 메인 페이지
  - 검색 페이지
- [x] 영화 상세정보 조회
  - 상세정보 UI
    - ESC키를 누르면 닫히는 모달 창
  - 상세정보 요청 API
- [x] 별점 매기기
  - 2점 단위 별 5개로 구성
  - API 연동 고려한 localsStorage 활용
- [x] 반응형 웹
  - 데스크톱
  - 태블릿
  - 모바일
