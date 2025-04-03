import { getState, updateState } from "../store/movieStore.ts";
import { fetchMovies } from "../store/movieService.ts";
import { loadMoreMovies } from "./movieUI.ts";
import { $ } from "../utils/dom.ts";

const $main = $("main");
const $loadTrigger = $("load-trigger");

export const scrollObserver = new IntersectionObserver(
  async (entries, observer) => {
    if (!$main) return;

    if (!entries.some(entry => entry.isIntersecting)) {
      return;
    }

    const { currentPage, totalPages, query, isLoading } = getState();

    if (isLoading || currentPage === totalPages) {
      if (currentPage === totalPages) observer.disconnect();
      return;
    }

    updateState({ isLoading: true });
    loadMoreMovies($main);

    await fetchMovies(currentPage + 1, query);
    loadMoreMovies($main);
  },
  { threshold: 0.1 }
);

if ($loadTrigger) {
  scrollObserver.observe($loadTrigger);
}
