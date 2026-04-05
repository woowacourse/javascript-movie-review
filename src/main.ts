import { MovieResponse } from "../types/types";
import {
  initialRender,
  moreRender,
  searchRender,
} from "./features/handler/controllerHandlers";

let page: number = 1;
let searchMovie: string = "";

// 렌더링 시 더보기 버튼
const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

addEventListener("load", async () => {
  // 초기 렌더링
  await initialRender(page, moreButton, updateMoreButton);

  // 검색
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;

  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    page = 1;

    const searchInput = document.querySelector(
      ".search-input",
    ) as HTMLInputElement;
    searchMovie = searchInput.value.trim();

    // 검색어가 없는 경우 초기 렌더링
    if (searchMovie === "") {
      await initialRender(page, moreButton, updateMoreButton);
      return;
    }

    // 검색어가 있는 경우 검색 결과 렌더링
    await searchRender(page, searchMovie, moreButton, updateMoreButton);

    attachLogoListener();
  });

  attachLogoListener();
});

function attachLogoListener() {
  const logo = document.querySelector(".logo") as HTMLElement;
  logo.addEventListener("click", async () => {
    page = 1;
    searchMovie = "";
    await initialRender(page, moreButton, updateMoreButton);
    attachLogoListener();
  });
}

// 더보기 버튼
moreButton.addEventListener("click", async () => {
  page += 1;
  await moreRender(page, searchMovie, moreButton, updateMoreButton);
});

function updateMoreButton(
  moreButton: HTMLButtonElement,
  data: MovieResponse,
): void {
  if (data.total_pages === page) {
    moreButton.style.display = "none";
  } else {
    moreButton.style.display = "block";
  }
}
