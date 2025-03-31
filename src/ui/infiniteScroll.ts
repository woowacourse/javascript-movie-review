import { getState } from "../store/movieStore.ts";
import { fetchMovies } from "../store/movieService.ts";
import { renderMovies } from "./movieUI.ts";
import Skeleton from "../components/Skeleton.ts";

const $main = document.querySelector("main");
const $sentinel = document.getElementById("scroll-sentinel");

export const observer = new IntersectionObserver(async (entries, observer) => {
  if (!$main) return;

    for (const entry of entries) {
      if (entry.isIntersecting) {
        const { currentPage, totalPages, query, isLoading } = getState();
        if (isLoading || currentPage === totalPages) {
          if (currentPage === totalPages) observer.disconnect();
          return;
        }

        const skeletonEl = Skeleton.render($main);

        await fetchMovies(currentPage + 1, query);

        Skeleton.remove(skeletonEl);
        renderMovies($main);
      }
    }
}, { threshold: 0.1 });

if ($sentinel) {
  observer.observe($sentinel);
}
