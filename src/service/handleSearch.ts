import createMovieLoader from "./createMovieLoader";
import state from "../state/state.ts";
import { URLS, defaultOptions, defaultQueryObject } from "../setting/settings";
import { hideElement, showElement } from "../view/InputView";
import createMovieList from "./createMovieList";
import Toast from "../components/Toast/Toast";

export default async function handleSearch(searchValue: string) {
  updateSearchDescription(searchValue);
  prepareUIForSearch();

  try {
    state.loadMovies = createMovieLoader(
      URLS.searchMovieUrl,
      defaultQueryObject,
      defaultOptions,
      searchValue
    );

    await createMovieList(state.loadMovies, true);
    finalizeUISuccess();
  } catch (error) {
    handleSearchError(error);
  }
}

function updateSearchDescription(searchValue: string): void {
  const description = document.getElementById("description");
  if (description) {
    description.textContent = `"${searchValue}" 검색 결과`;
  }
}

function prepareUIForSearch(): void {
  const $fallback = document.getElementById("fallback-div");
  const $hero = document.getElementById("hero");
  const $thumbnailList = document.getElementById("thumbnail-list");

  hideElement($fallback);
  hideElement($hero);
  hideElement($thumbnailList);
}

function finalizeUISuccess(): void {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $thumbnailList = document.getElementById("thumbnail-list");

  showElement($thumbnailContainer);
  showElement($thumbnailList);
}

function handleSearchError(error: unknown): void {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $fallback = document.getElementById("fallback-div");

  if (error instanceof Error) {
    Toast.showToast(error.message, "error", 5000);
  }

  hideElement($thumbnailContainer);
  showElement($fallback);
}
