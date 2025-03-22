import createMovieLoader from "./createMovieLoader";
import state from "../state/state.ts";
import { URLS, defaultOptions, defaultQueryObject } from "../setting/settings";
import { hideElement, showElement } from "../view/MovieView.ts";
import Toast from "../components/Toast/Toast";
import { updateMovieList } from "../view/MovieView.ts";

export default async function handleSearch(searchValue: string) {
  setSearchResultTitle(searchValue);
  setSearchLoadingState();
  state.loadMovies = createMovieLoader(
    URLS.searchMovieUrl,
    defaultQueryObject,
    defaultOptions,
    (error) => handleSearchError(error),
    searchValue
  );
  await updateMovieList(state.loadMovies, true);
  displaySearchResults();
}

function setSearchResultTitle(searchValue: string): void {
  const description = document.getElementById("description");
  if (description) {
    description.textContent = `"${searchValue}" 검색 결과`;
  }
}

function setSearchLoadingState(): void {
  const $fallback = document.getElementById("fallback");
  const $hero = document.getElementById("hero");
  const $thumbnailList = document.getElementById("thumbnail-list");

  hideElement($fallback);
  hideElement($hero);
  hideElement($thumbnailList);
}

function displaySearchResults(): void {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $thumbnailList = document.getElementById("thumbnail-list");

  showElement($thumbnailContainer);
  showElement($thumbnailList);
}

function handleSearchError(error: unknown): void {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $fallback = document.getElementById("fallback");

  if (error instanceof Error) {
    Toast.showToast(error.message, "error", 5000);
  }

  hideElement($thumbnailContainer);
  showElement($fallback);
}
