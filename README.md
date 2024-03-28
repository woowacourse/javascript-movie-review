# javascript-movie-review

FE 레벨1 영화관 미션

# 학습 목표

- 이번 미션의 주요 목표는 웹 프론트엔드에서의 비동기에 대해 이해한다.
- API 통신을 처리할 때 고려해야 하는 다양한 문제를 직접 경험해보면서 해결 방법을 고민해본다.
- API 연동을 위한 테스트 환경 경험
- 실제 동작하는 API를 통한 비동기 통신
- UX 경험 개선을 위한 더 보기(페이징) 구현

# 기능 요구 사항

- 메인 페이지

  - [x] 인기순으로 정렬된 영화 목록을 20개씩 보여준다.
  - [x] 더보기 버튼을 누르면 보여줄 영화 목록을 20개 추가해서 보여준다.
  - [x] 페이지 끝에 도달했을 경우 더보기 버튼을 화면에서 삭제한다.
  - [x] 비동기 통신이 완료되는 동안 Skeleton UI를 보여준다.

- 검색 페이지

  - [x] 영화 검색 키워드를 입력하고 엔터와 검색 버튼을 클릭하면 검색 결과를 영화 검색 결과를 확인할 수 있다.
  - [x] 검색 키워드에 맞는 영화 목록을 보여주며, 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.

- 공통

  - [x] 현재 페이지가 전체 페이지와 일치한 경우 더보기 버튼을 삭제
  - [x] API 호출시 성공, 로딩, 실패에 따라 각각 알맞은 UI를 보여준다.
  - [x] API 호출 대기 중에는 Skeleton UI를 보여준다.

- ⚠️ 오류

  - [x] 더보기 버튼을 클릭했을 때, 검색 요청을 했을 때 오류가 발생한다면 오류 상황에 맞는 메시지를 보여준다.

# 프로그래밍 요구사항

이전 미션의 프로그래밍 요구사항을 기본으로 포함한다.

- [x] API key를 공개된 저장소에 포함하지 않는다.
- [x] 특정한 패턴에 사고를 끼워 맞추지 않고 단지 역할과 책임에 따라 관심사를 분리한다.
- [x] 도메인 영역을 TypeScript를 사용해 구현한다. (UI 영역도 하는 것으로 결정)

  - any를 사용하지 않는다.

- [x] API에서 응답한 데이터의 규격을 문자열 그대로 활용하지 않고 도메인 객체를 만들어 활용한다.

# E2E 테스트

- [x] 비동기 호출을 포함한 사용자 기능 플로우를 선정하고 기능을 포함하여 E2E 테스트를 작성한다.
  - 처음 방문했을 때, 20개의 데이터가 렌더링 되는지 (intercept, fixtures를 활용한다.)
  - “더보기” 버튼을 클릭할 경우 20개의 데이터가 추가 되는지
  - 특정 키워드를 검색할 경우 검색 키워드에 맞는 영화 정보 UI를 구성하는지

# 배포

- [x] 실행 가능한 페이지에 접근할 수 있도록 github page 기능을 이용한다.
- [x] 해당 링크를 PR과 README에 작성한다.

# 영화 리뷰 미션 스텝 2 - UI & UX 개선하기

## 🚀 2단계 - 상세 정보 & UI/UX 개선하기

> 실제 웹앱처럼 사용할 수 있도록 사용성을 개선해본다.

## 🎯 기능 요구사항

- [x] [API에서 제공하는 항목](https://developers.themoviedb.org/3/movies/get-movie-details)을 활용하여 상세 정보를 보여주는 모달 창을 구현한다.

- 포스터 또는 제목을 클릭할 경우 예고편, 줄거리 등의 정보를 보여준다.
- 키보드의 **`ESC`** 키를 누르면 모달 창을 닫을 수 있는 등 사용성을 고려한다.

- [ ] 상세 정보 모달 창에서 사용자가 별점을 매길 수 있도록한다.
- 사용자는 영화에 대해 별점을 줄 수 있으며 새로고침하더라도 사용자가 남긴 별점은 유지되어야 한다.
- 로컬 스토리지를 사용하여, 새로고침해도 별점이 유지되도록 한다.
- 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않는다.

  - 2점: 최악이예요
  - 4점: 별로예요
  - 6점: 보통이에요
  - 8점: 재미있어요
  - 10점: 명작이에요

- [ ] 더보기 버튼 클릭을 사용하는 것에서, 무한스크롤을 사용하는 것으로 변경한다.
- 인기 영화 목록, 검색 결과 화면에서 사용자의 스크롤이 브라우저 화면의 하단 끝에 도달하면 다음 20개의 목록을 서버에서 불러온다.
- [ ] 반응형 웹을 구상하고, 디바이스의 너비에 따라 유동적으로 레이아웃이 조절되는 UI를 구현한다.
- 영화 목록과 영화 상세 정보가 뜨는 모달창에 대한 반응형 레이아웃을 구성한다.
