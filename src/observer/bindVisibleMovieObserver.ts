import { setURLSearchParams } from "../url";

const visibleItems = new Set<Element>();

const visibleMovieObserver = new IntersectionObserver((entries) => {
  let isChanged = false;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!visibleItems.has(entry.target)) {
        visibleItems.add(entry.target);
        isChanged = true;
      }
    } else {
      if (visibleItems.has(entry.target)) {
        visibleItems.delete(entry.target);
        isChanged = true;
      }
    }
  });

  if (isChanged) {
    const allItems = Array.from(document.querySelectorAll('.thumbnail-list .item'));
    const firstVisibleItem = allItems.find((item) => visibleItems.has(item)) as HTMLElement;

    if (firstVisibleItem && firstVisibleItem.dataset.movieId) {
      const movieId = firstVisibleItem.dataset.movieId;
      const page = firstVisibleItem.dataset.page;

      if (!page || !movieId) return;

      setURLSearchParams({
        page,
        "viewed-movie-id": movieId,
      })
    }
  }
}, {
  threshold: 1,
});

export function observeVisibleMovieItem(movieElement: HTMLElement) {
  visibleMovieObserver.observe(movieElement);
}
