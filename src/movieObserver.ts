import { loadMovieList } from "./movieLoader";

let isLoading = false;

export const initializeMovieListObserver = () => {
  const sentinel = document.querySelector(".scroll-sentinel");
  if (!sentinel) return;

  const movieListObserver = new IntersectionObserver(
    async (entries, observer) => {
      const [sentinelEntry] = entries;
      if (!sentinelEntry.isIntersecting) return;
      if (isLoading) return;

      isLoading = true;

      try {
        const isLastPage = await loadMovieList();

        if (isLastPage) {
          observer.disconnect();
        }
      } finally {
        isLoading = false;
      }
    },
    { rootMargin: "300px" },
  );

  movieListObserver.observe(sentinel);
};
