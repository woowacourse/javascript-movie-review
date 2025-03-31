import {
  hideElement,
  showElement,
  showLoadMoreButton,
} from "../view/MovieView";
import Toast from "../components/Toast/Toast";
import type { InfiniteScrollInstance } from "./scrollService";
import { ERROR_MESSAGE } from "../setting/ErrorMessage";
import { retryNotice } from "../setting/systemMessage";

export function handleConnectionError(): void {
  const $hero = document.getElementById("hero");
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $fallback = document.getElementById("fallback");
  const $fallbackDetails = document.getElementById("fallback-details");

  hideElement($hero);
  hideElement($thumbnailContainer);
  showElement($fallback);

  if ($fallbackDetails) {
    $fallbackDetails.innerText = ERROR_MESSAGE.FALLBACK_ERROR;
  }
}

export function handleNetworkError(
  infiniteScrollInstance: InfiniteScrollInstance
): void {
  if (infiniteScrollInstance) {
    infiniteScrollInstance.stopInfiniteScroll();
  }
  showLoadMoreButton();
  Toast.showToast(retryNotice, "info", 2000);
}
