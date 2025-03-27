import { hideElement, showElement } from "../view/MovieView";
import Toast from "../components/Toast/Toast";
import { URLS, defaultOptions } from "../setting/settings";
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
export function checkApiAvailability(
  infiniteScrollInstance: InfiniteScrollInstance,
  delay = 3000,
  startTime = Date.now()
) {
  // 1분(60000ms) 이상 경과했으면 Toast 표시 후 함수 종료
  if (Date.now() - startTime > 60000) {
    Toast.showToast(ERROR_MESSAGE.RETRY_ERROR, "error", 2000);
    return;
  }

  setTimeout(() => {
    fetch(URLS.config, {
      ...defaultOptions,
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          if (infiniteScrollInstance)
            infiniteScrollInstance.resumeInfiniteScroll();
        } else {
          checkApiAvailability(infiniteScrollInstance, delay * 2, startTime);
        }
      })
      .catch(() => {
        Toast.showToast(retryNotice, "info", 2000);
        checkApiAvailability(infiniteScrollInstance, delay * 2, startTime);
      });
  }, delay);
}
