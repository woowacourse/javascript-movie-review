<h1 align="middle">🎬</h1>
<h2 align="middle">level1 - 영화 리뷰</h2>
<p align="middle">우아한테크코스 레벨1 영화 리뷰 미션</p>

---

## [🎬 영화 리뷰 페이지 링크](https://hyeryongchoi.github.io/javascript-movie-review/)

---

<img width="1482" alt="스크린샷 2023-03-26 오전 4 40 24" src="https://user-images.githubusercontent.com/24777828/227738096-e96bf424-92d0-4e7d-a3ed-a7dee5b35505.png">

## 📍 학습 목표

- API 연동을 위한 테스트 환경 경험
- 실제 동작하는 API를 통한 비동기 통신
- UX 경험 개선을 위한 더 보기(페이징) 구현
- 역할과 책임에 따라 관심사 분리하기

## 🚀 1단계 - 영화 목록 불러오기

### 🙏 페어(페어프로그래밍)

<table>
  <tr>
    <td align="center" width="130px">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/24777828?v=4" alt="첵스(최혜령) 프로필" />
      </a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/wzrabbit" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/87642422?v=4" alt="요술토끼(김의천) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        첵스(최혜령)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/wzrabbit" target="_blank">
        요술토끼(김의천)
      </a>
    </td>
  </tr>
</table>

### 🎯 기능 요구 사항

#### 1. 🎬 영화 목록 조회 (인기순)

- 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
  - 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
  - 영화 목록 아이템에 대한 Skeleton UI를 구현한다.

#### 2. 🔎 검색

- 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - 엔터키를 눌러 검색할 수 있다
  - 검색 버튼을 클릭하여 검색할 수 있다
  - 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다

#### 3. ⚠️ 오류

- 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
- 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.

## 🚀 2단계 - 상세 정보 & UI/UX 개선하기

### 🎯 기능 요구 사항

#### 📺 영화 상세 정보 조회

- API에서 제공하는 항목을 활용하여 상세 정보를 보여주는 모달 창을 구현한다.
- 키보드의 ESC 키를 누르면 모달 창을 닫을 수 있는 등 사용성을 고려한다.

#### ⭐️ 별점 매기기

- 사용자는 영화에 대해 별점을 줄 수 있으며 새로고침하더라도 사용자가 남긴 별점은 유지되어야 한다.
- 별점은 5개로 구성되어 있으며 한 개당 2점이며 1점 단위는 고려하지 않는다.
  - 2점: 최악이예요
  - 4점: 별로예요
  - 6점: 보통이에요
  - 8점: 재미있어요
  - 10점: 명작이에요

#### 📐 UI/UX 개선하기

- 영화 목록과 영화 상세 정보가 뜨는 모달창에 대한 반응형 레이아웃을 구성한다.
- 영화 목록에서 더보기 버튼을 눌렀을 때 페이징하는 방식에서 무한 스크롤 방식으로 변경한다.
  - 검색 결과 화면에서 사용자가 브라우저 화면의 끝에 도달하면 그 다음 20개의 목록을 서버에 요청하여 추가로 불러올 수 있다.
