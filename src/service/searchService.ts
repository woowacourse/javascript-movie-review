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

  // 검색 시작 전에 무한 스크롤 중지 (경쟁 조건 방지)
  await infiniteScrollInstance?.stopInfiniteScroll();

  try {
    const data = await fetchAndSetLoadingEvent();

    if (data && data.results) {
      // 렌더링 완료까지 기다림
      await renderMovieItems(data.results, true);
    }

    // 데이터 상태에 따라 무한 스크롤 재개 또는 유지
    if (data.isLastPage) {
      await infiniteScrollInstance?.stopInfiniteScroll();
    } else {
      await infiniteScrollInstance?.resumeInfiniteScroll();
    }

    displaySearchResults();
  } catch (error) {
    // 에러 발생 시 추가 에러 처리가 필요하다면 구현
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
    Toast.showToast(error.message, "error", 5000);
    if ($fallbackDetails) $fallbackDetails.innerText = ERROR_MESSAGE.NO_DATA;
    hideElement($thumbnailContainer);
    showElement($fallback);
  }
}
