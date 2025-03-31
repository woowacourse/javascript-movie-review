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
import { handleNetworkError } from "./errorService.ts";
import { setLoadMovies } from "../state/movieState.ts";

import { infiniteScrollInstance } from "../main.ts";
import fetchAndSetLoadingEvent from "./fetchService.ts";

// 으아....

let isErrorHandled = false;
function scrollToTop(): Promise<void> {
  return new Promise((resolve) => {
    const onScroll = () => {
      if (window.scrollY === 0) {
        window.removeEventListener("scroll", onScroll);
        resolve();
      }
    };

    window.addEventListener("scroll", onScroll);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 혹시 이미 맨 위에 있으면 바로 resolve
    if (window.scrollY === 0) {
      window.removeEventListener("scroll", onScroll);
      resolve();
    }
  });
}

export default async function handleSearch(searchValue: string) {
  // 최상단으로 스크롤 이동
  // 이 함수가 없으면, 스크롤 하다 중간에 fetch가 발생하면
  // 잘못된 fetch가 발생할 수 있습니다.

  await scrollToTop();

  isErrorHandled = false;
  setSearchResultTitle(searchValue);
  setSearchLoadingState();

  setLoadMovies(
    createMovieLoader(
      URLS.searchMovieUrl,
      defaultQueryObject,
      defaultOptions,
      (error) => handleSearchError(error),
      searchValue
    )
  );
  // 먼저 stopInfiniteScroll를 호출합니다.
  // 혹시 모를 이중 fetch를 방지하기 위함입니다.

  infiniteScrollInstance?.stopInfiniteScroll();

  try {
    const data = await fetchAndSetLoadingEvent(infiniteScrollInstance);

    if (data?.results) renderMovieItems(data.results, true);
    if (data?.isLastPage) infiniteScrollInstance?.stopInfiniteScroll();
    else {
      infiniteScrollInstance?.resumeInfiniteScroll();
    }

    displaySearchResults();
  } catch (error) {
    handleSearchError(error as Error);
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
    handleNetworkError(infiniteScrollInstance);
  } else {
    if (infiniteScrollInstance) infiniteScrollInstance.stopInfiniteScroll();
    const $thumbnailContainer = document.getElementById("thumbnail-container");
    const $fallback = document.getElementById("fallback");
    const $fallbackDetails = document.getElementById("fallback-details");
    Toast.showToast(error.message, "error", 5000);
    if ($fallbackDetails) $fallbackDetails.innerText = ERROR_MESSAGE.NO_DATA;
    hideElement($thumbnailContainer);
    showElement($fallback);
  }
}
