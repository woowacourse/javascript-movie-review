# javascript-movie-review

FE 레벨1 영화 리뷰 미션 (step-2)

## step-2 기능 목록

### 영화 상세 정보 모달

[기본 기능]

- [x] 영화 카드를 클릭하면 상세 정보 모달이 뜬다
- [x] 상세 정보 모달에는 포스터, 제목, 장르, 평점, 줄거리가 표시된다
- [x] 닫기 버튼을 클릭하면 모달이 닫힌다
- [x] ESC 키를 눌러도 모달이 닫힌다

[UX]

- [x] 헤더의 "자세히 보기" 버튼을 클릭해도 모달이 뜬다
- [x] 모달이 열리는 동안 로딩 스피너를 표시한다
- [x] 모달이 열리면 닫기 버튼으로 포커스가 이동한다

### 별점 매기기

[기본 기능]

- [x] 상세 정보 모달에서 영화에 별점을 줄 수 있다
- [x] 별은 5개이며 한 개당 2점이다 (최소 2점, 최대 10점)
- [x] 별점에 따라 텍스트가 달라진다
  - 2점: 최악이에요
  - 4점: 별로예요
  - 6점: 보통이에요
  - 8점: 재미있어요
  - 10점: 명작이에요
- [x] 새로고침 후에도 별점이 유지된다

[UX]

- [x] 별점을 매기기 전에는 "평가하기" 텍스트가 표시된다
- [x] 별에 hover를 하면 해당 별까지 채워진 상태를 미리 보여준다
- [x] hover 중에는 옆 텍스트(평가하기 / 최악이에요 등)가 변경되지 않는다
- [x] 별을 클릭하면 별점이 확정되고 그때 텍스트가 변경된다
- [x] 별에서 hover를 벗어나면 기존 별점 상태로 돌아온다

### 무한스크롤

[기본 기능]

- [x] 더보기 버튼을 제거하고 무한스크롤로 변경한다
- [x] 목록 맨 아래에 도달하면 다음 페이지를 자동으로 불러온다
- [x] 검색 결과에서도 무한스크롤이 동작한다
- [x] 마지막 페이지에 도달하면 추가 요청을 하지 않는다

### 반응형 레이아웃

[기본 기능]

- [x] 디바이스 너비에 따라 영화 목록 카드 열 수가 달라진다
- [x] 디바이스 너비에 따라 모달 레이아웃이 달라진다

---

## step-2 핵심 설계 결정

### 별점 hover — CSS only

`star_empty.png`와 `star_filled.png`를 하나의 이미지(`stars_sprite.png`)로 합쳐서,
`background-position`만으로 빈 별 / 채운 별 상태를 전환하도록 설계했다.

```
stars_sprite.png: [ 빈 별 | 채운 별 ]
background-size: 200% 100%  →  한 번에 절반만 보이게
background-position: 0%    →  빈 별
background-position: 100%  →  채운 별
```

hover 방향 처리는 CSS `:has()` + `flex-direction: row-reverse` + `~` 형제 선택자 조합으로 구현했다.
DOM 순서는 별 5→1 (역순)이고 `flex-direction: row-reverse`로 화면에 1→5로 표시한다.
`~` 선택자가 "이후 형제"만 선택하는 특성을 역순 배치와 조합해 hover 시 왼쪽 별을 채운다.

```css
.star-list:has(label:hover) label:hover,
.star-list label:hover ~ label {
  background-position: 100% 0%;
}
```

### 별점 저장소 — 의존성 주입

`IRatingRepository` 인터페이스를 정의하고 `Modal`이 구현체를 주입받는 구조로 설계했다.
현재는 `LocalStorageRatingRepository`를 사용하지만, 서버 API 구현체로 교체해도 `StarRating`과 `Modal` 코드는 변경이 없도록 설계했다.

`localStorage`는 동기 API라 `async`일 이유가 없지만, 나중에 서버 API로 교체할 때 호출부를 바꾸지 않아도 되도록
인터페이스의 `save` / `load`를 `Promise`를 반환하는 형태로 미리 맞춰두었다.

### 무한스크롤 — observer 생명주기

로딩 중 또는 모달이 열린 동안 sentinel이 뷰포트에 진입해도 중복 요청이 발생하지 않도록,
`LOAD_START`와 `MOVIE_SELECTED` 이벤트에서 observer를 disconnect하고 렌더 완료 후 재등록한다.
