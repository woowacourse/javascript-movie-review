import createMovieLoader from "./loaderService.ts";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "../setting/settings.ts";
import {
  hideElement,
  renderMovieItems,
  showElement,
} from "../view/MovieView.ts";
import Toast from "../components/Toast/Toast.ts";

import { ERROR_MESSAGE } from "../setting/ErrorMessage.ts";
import { checkApiAvailability } from "./errorService.ts";
import { setLoadMovies } from "../state/movieState.ts";

import { infiniteScrollInstance } from "../main.ts";
import fetchAndSetLoadingEvent from "./fetchService.ts";

// 으아....
let isErrorHandled = false;

export default async function handleSearch(searchValue: string) {
  isErrorHandled = false;

  setSearchResultTitle(searchValue);
  setSearchLoadingState();
  window.scrollTo({ top: 0, behavior: "smooth" });

  setLoadMovies(
    createMovieLoader(
      URLS.searchMovieUrl,
      defaultQueryObject,
      defaultOptions,
      (error) => handleSearchError(error),
      searchValue
    )
  );

  try {
    const data = await fetchAndSetLoadingEvent();
    if (data && data.results) {
      renderMovieItems(data.results, true);
    }
    displaySearchResults();
    if (infiniteScrollInstance) infiniteScrollInstance.resumeInfiniteScroll();
  } catch (error) {
    return;
  }
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

function handleSearchError(error: Error): void {
  if (isErrorHandled) return;
  isErrorHandled = true;

  if (error.message !== ERROR_MESSAGE.NO_DATA) {
    Toast.showToast(error.message, "error", 3000);
    checkApiAvailability(infiniteScrollInstance, 3000);
  } else {
    if (infiniteScrollInstance) infiniteScrollInstance.stopInfiniteScroll();
    const $thumbnailContainer = document.getElementById("thumbnail-container");
    const $fallback = document.getElementById("fallback");
    const $fallbackDetails = document.getElementById("fallback-details");
    console.log(error);
    Toast.showToast(error.message, "error", 5000);
    if ($fallbackDetails) $fallbackDetails.innerText = ERROR_MESSAGE.NO_DATA;
    hideElement($thumbnailContainer);
    showElement($fallback);
  }
}
