import {
  MAX_MOVIE_PAGE,
  renderMoviesList,
} from "../features/movies/movieListRenderer";
import { movieStore } from "../state/movieStore";

let observer: IntersectionObserver;
export function createObserver() {
  observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  const sentinel = document.querySelector("#sentinel");
  if (sentinel) observer.observe(sentinel);
}

function handleIntersect(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    if (movieStore.page >= Math.min(MAX_MOVIE_PAGE, movieStore.totalPages)) {
      observer.unobserve(entry.target);
      return;
    }

    movieStore.page++;
    renderMoviesList();
  });
}
