import fetchAndSetLoadingEvent from "./fetchService";
import { renderMovieItems } from "../view/MovieView";

export type InfiniteScrollInstance = {
  observer: IntersectionObserver | null;
  resumeInfiniteScroll: () => void;
  stopInfiniteScroll: () => void;
} | null;

/**
 * 페이지 상단으로 부드럽게 스크롤하는 함수
 * @returns 스크롤이 최상단에 도달했을 때 resolve되는 Promise
 */
export function scrollToTop(): Promise<void> {
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

export function setupInfiniteScroll() {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  if (!$thumbnailContainer) return null;

  const sentinel = document.createElement("div");
  sentinel.id = "infinite-scroll-sentinel";
  $thumbnailContainer.appendChild(sentinel);
  //본격적으로 infinite scroll event를 중지하고, 재개하는 플래그입니다.
  //1. fetch한 data가 lastPage 이거나
  //2. fetch한 데이터가 없거나
  //3. 오프라인인 경우에
  // 이 플래그가 활성화 됩니다.
  // 반대로
  // fetch한 데이터에 isLastPage가 false이거나, 온라인인 경우에는 이 플래그가 비활성화 됩니다.
  let infiniteScrollSuspended = false;
  // 이중 fetch를 방지합니다. 이미 fetchURL에서 signal을 사용하고 있지만, 왜인지
  // 이중 fetch가 발생해서 추가합니다.
  let isFetching = false;

  // smooth scroll을 위해 debounce를 사용합니다.
  // 500ms 이후에 fetch를 진행합니다.
  let debounceTimeoutId: number | null = null;

  // infinite scroll event를 재개합니다.
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

    if ($thumbnailContainer && observer) {
      $thumbnailContainer.appendChild(sentinel);
      observer.observe(sentinel);
    }
  }

  // infinite scroll event를 중지합니다.
  function stopInfiniteScroll() {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
      debounceTimeoutId = null;
    }

    infiniteScrollSuspended = true;
    if (observer) {
      observer.unobserve(sentinel);
    }

    if (sentinel.parentNode) {
      sentinel.parentNode.removeChild(sentinel);
    }
  }

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
        if (observer) {
          observer.unobserve(sentinel);
        }

        try {
          const data = await fetchAndSetLoadingEvent(instance);

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
            if ($thumbnailContainer && observer) {
              $thumbnailContainer.appendChild(sentinel);
              observer.observe(sentinel);
            }
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          isFetching = false;
          debounceTimeoutId = null;
        }
      }, 700);
    }
  };

  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: "20px",
    threshold: 0.2,
  });

  observer.observe(sentinel);

  const instance = { observer, resumeInfiniteScroll, stopInfiniteScroll };

  return instance;
}
