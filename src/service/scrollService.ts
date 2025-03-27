import fetchAndSetLoadingEvent from "./fetchService";
import { renderMovieItems } from "../view/MovieView";

export type InfiniteScrollInstance = {
  observer: IntersectionObserver;
  resumeInfiniteScroll: () => void;
  stopInfiniteScroll: () => void;
} | null;

export function setupInfiniteScroll() {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  if (!$thumbnailContainer) return;

  const sentinel = document.createElement("div");
  sentinel.id = "infinite-scroll-sentinel";
  $thumbnailContainer.append(sentinel);

  let infiniteScrollSuspended = false;

  const observer = new IntersectionObserver(
    async (entries) => {
      if (infiniteScrollSuspended) return;
      const entry = entries[0];
      if (entry.isIntersecting) {
        observer.unobserve(sentinel);
        const data = await fetchAndSetLoadingEvent();
        if (data?.results) {
          renderMovieItems(data.results, false);
        }

        if (data?.isLastPage) {
          infiniteScrollSuspended = true;
        } else {
          $thumbnailContainer.append(sentinel);
          observer.observe(sentinel);
        }
      }
    },
    {
      root: null,
      threshold: 0.7,
    }
  );

  observer.observe(sentinel);

  function resumeInfiniteScroll() {
    if (infiniteScrollSuspended) {
      infiniteScrollSuspended = false;

      if (
        !document.getElementById("infinite-scroll-sentinel") &&
        $thumbnailContainer
      ) {
        $thumbnailContainer.append(sentinel);
      }
      observer.observe(sentinel);
    }
  }
  function stopInfiniteScroll() {
    if (!infiniteScrollSuspended) {
      infiniteScrollSuspended = true;
      if (
        !document.getElementById("infinite-scroll-sentinel") &&
        $thumbnailContainer
      ) {
        $thumbnailContainer.append(sentinel);
      }
      observer.unobserve(sentinel);
    }
  }

  return { observer, resumeInfiniteScroll, stopInfiniteScroll };
}
