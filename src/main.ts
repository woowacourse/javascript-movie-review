import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
import {
  handleMainSeeMore,
  handleSearchSeeMore,
} from "./dom/eventHandler/handleSeeMore";
import { renderInitialUI } from "./dom/render/renderInitialUI";
import { renderMainUI } from "./dom/render/renderMainUI";
import { renderSearchUI } from "./dom/render/renderSearchUI";

// 로직이 흩어진다...
// 라바: 돔 선언을 하는 곳에서만 하자
// -> 전달받은 함수에서 인자로 받은 돔을 바로 사용 가능 (not 3항연산자)
// -> 밖에서 타입 지정 -> 함수 내에서 타입에 따른 분기까지 있어야 해서 돔을 정하는 과정이 타입 + 홤수 내 분기 2곳으로 흩어진다
// 아지: 같은 돔요소가 여러 곳에 있다!!!
// -> 돔 요소가 변경될 때 두 곳을 모두 수정해야 한다 + 'search' | 'main'처럼 우리가 제어할 수 있는 타입을 선언하자

const logo = document.getElementById("logo");
const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const mainSeeMoreButton = document.getElementById("main-see-more-button");
const searchSeeMoreButton = document.getElementById("search-see-more-button");

if (logo) {
  logo.addEventListener("click", () => {
    window.location.href = "/";
  });
}

if (searchInput && searchButton) {
  searchButton.addEventListener("click", () =>
    handleMovieSearch(searchInput.value),
  );

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleMovieSearch(searchInput.value);
  });
}

if (mainSeeMoreButton) {
  mainSeeMoreButton.addEventListener("click", () => {
    handleMainSeeMore();
  });
}

if (searchSeeMoreButton && searchInput) {
  searchSeeMoreButton.addEventListener("click", () => {
    handleSearchSeeMore(searchInput.value); // TODO Search 핸들러로 변경
  });
}

// TODO 이미지 없는 거 대체 이미지
// TODO: popular movies 없는 경우 배너 대체 UI

const render = async () => {
  renderInitialUI();

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const keyword = params.get("keyword");
  if (keyword) {
    await renderSearchUI(keyword);
  } else {
    await renderMainUI();
  }
};

await render();

// 진입 -> renderResultSectionContent 호출 -> api 호출
// api 호출 시: 요청 -> renderResultSectionContent -> 응답 옴 -> renderResultSectionContent
