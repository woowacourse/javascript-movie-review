import { MovieResponse } from "../types/types";
import MovieList from "./features/UI/MovieList";
import {
  initialRender,
  moreRender,
  searchRender,
} from "./features/handler/controllerHandlers";

let page: number = 1;
let searchMovie: string = "";
const movieList = new MovieList();

const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
const backgroundContainer = document.querySelector(
  ".background-container",
) as HTMLElement;

addEventListener("load", async () => {
  // 초기 렌더링
  await initialRender(movieList, page, moreButton, updateMoreButton);

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
      await initialRender(movieList, page, moreButton, updateMoreButton);
      return;
    }

    // 검색어가 있는 경우 검색 결과 렌더링
    await searchRender(
      movieList,
      page,
      searchMovie,
      moreButton,
      updateMoreButton,
    );
  });

  backgroundContainer.addEventListener("click", async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const logo = target.closest(".logo");

    if (!logo) {
      return;
    }

    page = 1;
    searchMovie = "";
    await initialRender(movieList, page, moreButton, updateMoreButton);
  });
});

// 더보기 버튼
moreButton.addEventListener("click", async () => {
  page += 1;
  await moreRender(movieList, page, searchMovie, moreButton, updateMoreButton);
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
