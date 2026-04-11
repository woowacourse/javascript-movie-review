import { baseUrl } from "./constants/env";
import {
  bindModalEvents,
  bindRatingEvents,
  bindSearchEvents,
} from "./eventBinder";
import { loadMovieList, loadTopRatedMovie } from "./movieLoader";

addEventListener("load", () => {
  const logo = document.querySelector<HTMLButtonElement>(".logo");
  logo?.addEventListener("click", () => {
    window.location.href = baseUrl;
  });

  bindSearchEvents();
  bindModalEvents();
  bindRatingEvents();

  loadTopRatedMovie();
  loadMovieList();

  initializeMovieListObserver();
});

const initializeMovieListObserver = () => {
  const movieListObserver = new IntersectionObserver(
    (entries) => {
      const [sentinelEntry] = entries;
      if (!sentinelEntry.isIntersecting) return;

      loadMovieList();
    },
    { rootMargin: "300px" },
  );

  const sentinel = document.querySelector(".scroll-sentinel");
  if (sentinel) movieListObserver.observe(sentinel);
};
