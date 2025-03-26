# javascript-movie-review

FE 레벨1 영화 리뷰 미션

## 기능 목록

**영화 목록 보여주기**

- [x] 영화 목록을 불러온다
- [x] 불러온 영화 목록을 한번에 20 개씩 보여준다
- [x] 더보기 버튼을 누르면 추가로 20개를 보여준다
- [x] 더 불러온 정보가 없으면 더보기 버튼을 지운다
- [x] 영화 목록 아이템에 대한 skeleton ui를 구현한다

**영화 상세정보 조회**
- [ ] 영화 포스터나 제목 클릭시 정보를 보여주는 모달이 나타난다
- [ ] 상세정보에서 내 별점을 매길 수 있다
  - [ ] 별1개당 2점이 채워진다
  - [ ] 새로고침해도 별점은 유지되어야한다

**영화 검색 기능**

- [x] 검색창에 영화이름을 검색할 수 있다
- [x] 엔터키를 눌러 검색할 수 있다
- [x] 검색 버튼을 클릭하여 검색할 수 있다

**UI/UX 개선하기**
- [ ] 디바이스의 너비에 따라 한 줄에 나타나는 영화 개수가 줄어든다. 
- [ ] 디바이스의 너비에 따라 모달의 배치가 변한다. 

**오류**

- [x] 오류가 발생했을때 사용자를 위한 오류 메세지를 띄워준다.
- [x] 검색 결과가 없을때 "검색 결과가 없습니다" 이미지를 보여준다.

TODO

- [x] Header 분리하기 (logo, search만 포함되도록)

## E2E 시나리오

**인기 있는 영화 페이지**

- [x] 처음 로드됐을 때 영화가 최대 20개 목록에 보여야 한다.
- [x] 더보기 버튼을 누르면 최대 20개가 목록에 추가되어야 한다.
- [x] 마지막 페이지이면 더보기 버튼이 사라져야 한다.
- [x] 가장 인기있는 영화가 상단에 떠야 한다.

**영화 검색 페이지**

- [x] 검색창에 검색어를 입력하고 엔터를 치면 검색 결과가 최대 20개 보여야 한다.
- [x] 검색창에 검색어를 입력하고 돋보기 버튼을 클릭하면 검색 결과가 최대 20개 보여야 한다.
- [x] 더보기 버튼을 누르면 최대 20개가 목록에 추가되어야 한다.
- [x] 마지막 페이지이면 더보기 버튼이 사라져야 한다.
- [x] 검색 결과가 없을때 "검색 결과가 없습니다" 이미지를 보여준다.
