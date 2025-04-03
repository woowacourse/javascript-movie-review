import { MAX_MOVIE_PAGE } from "../features/movies/movieListRenderer";
import { movieStore } from "../state/movieStore";

export function createObserver(render: () => void) {
  console.log(render);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (
          movieStore.page >= Math.min(MAX_MOVIE_PAGE, movieStore.totalPages)
        ) {
          observer.unobserve(entry.target);
          return;
        }

        movieStore.page++;
        render();
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  const sentinel = document.querySelector("#sentinel");
  if (sentinel) observer.observe(sentinel);
}
