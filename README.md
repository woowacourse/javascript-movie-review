# javascript-movie-review

FE 레벨1 영화 리뷰 미션

## 기능 구현 목록

**영화 목록 조회**

- [x] 영화 목록의 1페이지를 불러온다.
- [x] 한 번의 요청당 20개씩 영화 목록을 데이터를 보여준다.
- [x] 더보기 버튼을 누르면 다음의 영화 목록을 불러온다.
  - [x] 페이지 끝에 도달한 경우에는 **`더보기`** 버튼을 화면에 출력하지 않는다.
- [x] 영화 목록 아이템을 불러오는 동안 Skeleton UI를 노출시킨다.

**검색**

- [x] 영화 검색 API를 사용해서 영화를 검색할 수 있다.
  - [x] 엔터키를 눌러 검색할 수 있다.
  - [x] 검색 버튼을 클릭하여 검색할 수 있다.
  - [x] 검색한 데이터가 없을 경우 `검색 결과 없음` 을 사용자에게 노출시킨다.

**오류**

- [x] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.

## UI (Component)

- [x] Icon
- [x] IconButton
- [x] Text
- [x] Button
- [x] Skeleton
- [x] Search Bar
- [x] MovieList
- [x] MovieItem
- [x] MovieSkeleton
- [x] Header
- [x] Footer

---

## 2단계 - 상세정보 & UI/UX 개선

## 기능 구현 목록

### 1. 영화 상세정보 조회

- API에서 제공하는 항목을 활용하여 상세 정보를 보여주는 모달 구현

### 2. 별점 매기기

- 사용자는 영화에 대해 별점을 줄 수 있으며 새로고침하더라도 사용자가 남긴 별점은 유지되어야 한다. 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않는다.

```
2점: 최악이예요
4점: 별로예요
6점: 보통이에요
8점: 재미있어요
10점: 명작이에요
```

### 3. UI/UX 개선하기

- 영화 목록과 영화 상세 정보가 뜨는 모달창에 대한 반응형 레이아웃을 구성한다.
- 영화 목록에서 더보기 버튼을 눌렀을 때 페이징하는 방식에서 무한 스크롤 방식으로 변경한다.
- 검색 결과 화면에서 사용자가 브라우저 화면의 끝에 도달하면 그 다음 20개의 목록을 서버에 요청하여 추가로 불러올 수 있다.
