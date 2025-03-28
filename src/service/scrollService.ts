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
      if (debounceTimeoutId) {
        clearTimeout(debounceTimeoutId);
      }

      debounceTimeoutId = window.setTimeout(async () => {
        if (isFetching || infiniteScrollSuspended) {
          debounceTimeoutId = null;
          return;
        }

        isFetching = true;
        observer.unobserve(sentinel);

        try {
          const data = await fetchAndSetLoadingEvent();

          if (data?.results) {
            const scrollY = window.scrollY;
            renderMovieItems(data.results, false);
            window.scrollTo(0, scrollY + 10);
          }

          if (data?.isLastPage) {
            infiniteScrollSuspended = true;
          } else {
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
      }, 300);
    }
  };

  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: "20px",
    threshold: 0.2,
  });

  observer.observe(sentinel);

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function resumeInfiniteScroll() {
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
      await delay(200); // 비동기 작업: 200ms 기다림
      observer.observe(sentinel);
    }
  }

  async function stopInfiniteScroll() {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
      debounceTimeoutId = null;
    }

    infiniteScrollSuspended = true;
    observer.unobserve(sentinel);
    await delay(100); // 예시로 100ms 기다림
    if (sentinel.parentNode) {
      sentinel.parentNode.removeChild(sentinel);
    }
  }
  return { observer, resumeInfiniteScroll, stopInfiniteScroll };
}
