# 🎬

## FE 5기 레벨1 영화관 미션

![스크린샷(91)](https://user-images.githubusercontent.com/108778921/225553741-43297097-5333-4167-8364-e336aed2e832.png)

<br>

### 🧑‍🤝‍🧑 페어 (페어 프로그래밍으로 개발)

<table>
  <tr>
    <td align="center" width="120px">
      <a href="https://github.com/feb-dain" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/108778921?v=4" alt="야미(이다인) 프로필" />
      </a>
    </td>
    <td align="center" width="120px">
      <a href="https://github.com/gabrielyoon7" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/69189073?v=4" alt="가브리엘(윤주현) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/feb-dain" target="_blank">
        야미(이다인)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gabrielyoon7" target="_blank">
        가브리엘(윤주현) 
      </a>
    </td>
  </tr>
</table>

<br>

### 📍 학습 목표

- 이번 미션의 주요 목표는 웹 프론트엔드에서의 비동기에 대해 이해하고,
- API 통신을 처리할 때 고려해야 하는 다양한 문제를 직접 경험해보면서 해결 방법을 고민해보는 것입니다
  - API 연동을 위한 테스트 환경 경험
  - 실제 동작하는 API를 통한 비동기 통신
  - UX 경험 개선을 위한 더 보기(페이징) 구현
  - 역할과 책임에 따라 관심사를 분리할 수 있는 마지막 기회

<br>

### 📝 실행 방법

- <a href="https://gabrielyoon7.github.io/javascript-movie-review/">앱 바로 실행하기</a>

- 터미널에서 npm 설치(`npm install`) 후 `npm run start` 커맨드로 앱을 실행할 수 있다.

<br>
<br>

### 🎯 기능 목록

- 🎬 영화 목록 조회 (인기순)
  - 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.
  - 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
  - ⚠️ 인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
  - figma 시안과는 달리 20개씩 영화 목록을 보여주면 됩니다.
  - 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
  - Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

<br>

- 🔎 검색
  - 영화 검색 API를 이용하여 내가 보고 싶은 영화를 검색할 수 있다.
  - 엔터키를 눌러 검색할 수 있다
  - 검색 버튼을 클릭하여 검색할 수 있다
  - 영화 목록 조회와 같이 검색한 결과에 한해 정보를 보여주는 화면의 요구사항은 동일하다

<br>

- ⚠️ 오류
  - 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
  - 어떤 오류를 대응해야 하고, 어떤 UI로 보여줄 것인지는 자율적으로 결정한다.

<br>
<br>

### ✅ 프로그래밍 요구 사항

**이전 미션의 프로그래밍 요구 사항은 기본으로 포함한다.**

- API key를 공개된 저장소에 포함하지 않는다.
- 비동기 통신에서 실패할 경우를 대비한다.
- 비동기 통신에서 일어날 수 있는 다양한 상황을 고려해 본다.
- 비동기 호출을 포함한 사용자 기능 플로우를 선정하고 기능을 포함하여 E2E 테스트를 작성한다.
- 특정한 패턴에 사고를 끼워 맞추지 않고 단지 역할과 책임에 따라 관심사를 분리한다.
- 어떠한 관점에서 역할과 책임에 따라 관심사를 분리하였는지 리뷰어에게 설명할 수 있어야 한다.
- 도메인 영역을 TypeScript를 사용해 구현한다. (UI 영역은 선택)
- any를 사용하지 않는다.
- API에서 응답한 데이터의 규격을 문자열 그대로 활용하지 않고 도메인 객체를 만들어 활용한다.

<br>
<br>

---

<a href="https://github.com/woowacourse">@woowacourse</a>
