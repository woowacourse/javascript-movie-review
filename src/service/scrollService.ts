import fetchAndSetLoadingEvent from "./fetchService";
import { renderMovieItems } from "../view/MovieView";

export type InfiniteScrollInstance = {
  observer: IntersectionObserver;
  resumeInfiniteScroll: () => void;
  stopInfiniteScroll: () => void;
} | null;

export function setupInfiniteScroll() {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  if (!$thumbnailContainer) return null;

  const sentinel = document.createElement("div");
  sentinel.id = "infinite-scroll-sentinel";
  $thumbnailContainer.appendChild(sentinel);

  let infiniteScrollSuspended = false;
  let isFetching = false;
  let debounceTimeoutId: number | null = null;

  const observerCallback: IntersectionObserverCallback = (entries) => {
    if (infiniteScrollSuspended || isFetching) return;

    const entry = entries[0];
    if (entry.isIntersecting) {
      // 이미 진행 중인 디바운스가 있으면 취소
      if (debounceTimeoutId) {
        clearTimeout(debounceTimeoutId);
      }

      // 디바운스 시간을 300ms로 줄임
      debounceTimeoutId = window.setTimeout(async () => {
        // 이미 fetch 중이거나 일시 중지 상태면 중단
        if (isFetching || infiniteScrollSuspended) {
          debounceTimeoutId = null;
          return;
        }

        isFetching = true;
        observer.unobserve(sentinel);

        try {
          const data = await fetchAndSetLoadingEvent();

          if (data?.results) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY;

            renderMovieItems(data.results, false);

            // 스크롤 위치 유지 (스크롤 튐 방지)
            window.scrollTo(0, scrollY);
          }

          // 마지막 페이지인 경우
          if (data?.isLastPage) {
            infiniteScrollSuspended = true;
          } else {
            // sentinel 요소 다시 추가 및 관찰
            if (sentinel.parentNode) {
              sentinel.parentNode.removeChild(sentinel);
            }
            $thumbnailContainer.appendChild(sentinel);
            observer.observe(sentinel);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          isFetching = false;
          debounceTimeoutId = null;
        }
      }, 500); // 디바운스 시간 단축
    }
  };

  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: "100px", // 약간의 여유 공간 제공
    threshold: 0.5, // 임계값 조정
  });

  observer.observe(sentinel);

  function resumeInfiniteScroll() {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
      debounceTimeoutId = null;
    }

    infiniteScrollSuspended = false;
    isFetching = false;

    if (sentinel.parentNode) {
      sentinel.parentNode.removeChild(sentinel);
    }

    if ($thumbnailContainer) {
      $thumbnailContainer.appendChild(sentinel);

      setTimeout(() => {
        observer.observe(sentinel);
      }, 200);
    }
  }

  function stopInfiniteScroll() {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
      debounceTimeoutId = null;
    }

    infiniteScrollSuspended = true;
    observer.unobserve(sentinel);

    if (sentinel.parentNode) {
      sentinel.parentNode.removeChild(sentinel);
    }
  }

  return { observer, resumeInfiniteScroll, stopInfiniteScroll };
}
