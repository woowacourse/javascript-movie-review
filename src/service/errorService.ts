import { hideElement, showElement } from "../view/MovieView";
import Toast from "../components/Toast/Toast";
import { URLS, defaultOptions } from "../setting/settings";
import type { InfiniteScrollInstance } from "./scrollService";

export function handleConnectionError(): void {
  const $hero = document.getElementById("hero");
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $fallback = document.getElementById("fallback");
  const $fallbackDetails = document.getElementById("fallback-details");

  hideElement($hero);
  hideElement($thumbnailContainer);
  showElement($fallback);
  if ($fallbackDetails) {
    $fallbackDetails.innerText =
      "뭔가 잘못되었어요. 인터넷 상태를 체크하신뒤 세로 고침을 해주세요!";
  }
}
export function checkApiAvailability(
  infiniteScrollInstance: InfiniteScrollInstance,
  delay = 3000,
  startTime = Date.now()
) {
  // 1분(60000ms) 이상 경과했으면 Toast 표시 후 함수 종료
  if (Date.now() - startTime > 60000) {
    Toast.showToast("최대 대기 시간(1분)을 초과했습니다.", "info", 2000);
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
          // 타이머 중첩 없이 재귀 호출
          checkApiAvailability(infiniteScrollInstance, delay * 2, startTime);
        }
      })
      .catch(() => {
        Toast.showToast(
          "서버의 상황이 좋지 않아 접속을 다시 시도하고 있어요.... 잠깐 기다려 보세요...",
          "info",
          2000
        );
        checkApiAvailability(infiniteScrollInstance, delay * 2, startTime);
      });
  }, delay);
}
