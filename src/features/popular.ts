import { fetchPopularMovies } from "../api/movieApi";
import { createMovieList } from "../components/movie";
import { createSkeleton } from "../components/skeleton";
import { InfiniteScrollController } from "../utils/infiniteScroll";

export const renderPopularMovieList = async (
  mainEl: Element,
  skeletonEls: HTMLElement,
  onMovieClick: (id: number) => void,
  scrollController: InfiniteScrollController,
): Promise<void> => {
  let page = 1;

  const data = await fetchPopularMovies(page);
  skeletonEls.replaceWith(createMovieList(data.results, onMovieClick));

  if (data.total_pages <= page) return;

  scrollController.start(mainEl, async () => {
    page++;
    const skeleton = createSkeleton();
    mainEl.appendChild(skeleton);

    const nextData = await fetchPopularMovies(page);
    skeleton.replaceWith(createMovieList(nextData.results, onMovieClick));

    if (nextData.total_pages <= page) scrollController.stop();
  });
};
