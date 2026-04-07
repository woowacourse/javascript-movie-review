import {
  controlInitialMovies,
  controlMoreMovies,
  controlSearchMovies,
} from "./features/handler/controllerHandlers";

let page: number = 1;
let searchMovie: string = "";

const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
const backgroundContainer = document.querySelector(
  ".background-container",
) as HTMLElement;

addEventListener("load", async () => {
  // 초기 렌더링
  await controlInitialMovies(page, moreButton);
});

// 검색
backgroundContainer.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  page = 1;

  const searchInput = document.querySelector(
    ".search-input",
  ) as HTMLInputElement;
  searchMovie = searchInput.value.trim();

  // 검색어가 없는 경우 초기 렌더링
  if (searchMovie === "") {
    await controlInitialMovies(page, moreButton);
    return;
  }

  // 검색어가 있는 경우 검색 결과 렌더링
  await controlSearchMovies(page, searchMovie, moreButton);
});

// 로고 클릭
backgroundContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const logo = target.closest(".logo");

  if (!logo) {
    return;
  }

  page = 1;
  searchMovie = "";
  await controlInitialMovies(page, moreButton);
});

// 더보기 버튼
moreButton.addEventListener("click", async () => {
  page += 1;
  await controlMoreMovies(page, searchMovie, moreButton);
});
