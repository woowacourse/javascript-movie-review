import { Movie } from "../types/types";
import {
  initialRender,
  moreRender,
  searchRender,
} from "./features/handler/controllerHandlers";
import { movieState } from "./features/states/movieState.ts";

// 렌더링 시 더보기 버튼
const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

addEventListener("load", async () => {
  // 초기 렌더링
  await initialRender(movieState.page, moreButton, updateMoreButton);

  // 검색
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;

  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    movieState.page = 1;

    const searchInput = document.querySelector(
      ".search-input",
    ) as HTMLInputElement;
    movieState.searchMovie = searchInput.value.trim();

    // 검색어가 없는 경우 초기 렌더링
    if (movieState.searchMovie === "") {
      await initialRender(movieState.page, moreButton, updateMoreButton);
      return;
    }

    // 검색어가 있는 경우 검색 결과 렌더링
    await searchRender(
      movieState.page,
      movieState.searchMovie,
      moreButton,
      updateMoreButton,
    );

    attachLogoListener();
  });

  attachLogoListener();
});

function attachLogoListener() {
  const logo = document.querySelector(".logo") as HTMLElement;
  logo.addEventListener("click", async () => {
    movieState.page = 1;
    movieState.searchMovie = "";
    await initialRender(movieState.page, moreButton, updateMoreButton);
    attachLogoListener();
  });
}

// 더보기 버튼
moreButton.addEventListener("click", async () => {
  movieState.page += 1;
  await moreRender(
    movieState.page,
    movieState.searchMovie,
    moreButton,
    updateMoreButton,
  );
});

function updateMoreButton(
  moreButton: HTMLButtonElement,
  data: { results: Movie[]; total_pages: number },
): void {
  if (data.total_pages === movieState.page) {
    moreButton.style.display = "none";
  } else {
    moreButton.style.display = "block";
  }
}
