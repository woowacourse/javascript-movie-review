import { movieState } from "./movieState";
import {
  initialRender,
  renderMoreMovies,
  renderSearchResults,
} from "./movieController";
import { Header } from "./View/Header";

export function initEvents() {
  loadHeader();

  loadSearch();

  loadMoreButton();
}

function loadHeader() {
  const header = document.querySelector(".header") as HTMLElement;

  header.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".logo")) {
      movieState.reset();
      await initialRender(movieState.page);
    }
  });
}

function loadSearch() {
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;
  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    movieState.page = 1;
    movieState.searchQuery = Header.getSearchInputValue();

    if (movieState.searchQuery === "") {
      await initialRender(movieState.page);
      return;
    }

    await renderSearchResults(movieState.page, movieState.searchQuery);
  });
}

function loadMoreButton() {
  const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
  if (moreButton) {
    moreButton.addEventListener("click", async () => {
      movieState.page += 1;
      await renderMoreMovies(movieState.page, movieState.searchQuery);
    });
  }
}
