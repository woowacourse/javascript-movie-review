import { fetchMovies } from "../api";
import { handleError } from "../error";
import bindBottomInfiniteScrollObserver from "../observer/bindBottomInfiniteScrollObserver";
import bindTopInfiniteScrollObserver from "../observer/bindTopInfiniteScrollObserver";
import renderMovieItems from "./renderMovieItems";
import renderSkeletonItemsToList, { removeSkeletonItems } from "./renderSkeletonItems";
import renderTopRatedMovie from "./renderTopRatedMovie";
import restoreScrollPosition from "./restoreScrollPosition";

let firstLoadedPage: number | null = null;
let lastLoadedPage: number | null = null;
let totalPages = 0;

export async function renderPopularMoviePage(page: number, direction: 'append' | 'prepend' = 'append') {
  if (firstLoadedPage === null || lastLoadedPage === null) {
    firstLoadedPage = page;
    lastLoadedPage = page;
  } else {
    firstLoadedPage = Math.min(firstLoadedPage, page);
    lastLoadedPage = Math.max(lastLoadedPage, page);
  }

  renderSkeletonItemsToList(20, direction);

  const response = await fetchMovies("/movie/popular", { page: page });

  totalPages = response.total_pages;

  removeSkeletonItems();

  const isTopPage = page === firstLoadedPage;

  isTopPage && renderTopRatedMovie(response.results[0]);

  renderMovieItems(page, response.results, direction);

  restoreScrollPosition();

  const hasPrevPage = firstLoadedPage !== null && firstLoadedPage > 1;

  bindTopInfiniteScrollObserver(hasPrevPage, async () => {
    try {
      await renderPopularMoviePage(firstLoadedPage! - 1, 'prepend');
    } catch (error) {
      await handleError(error);
      removeSkeletonItems();
    }
  });

  const hasNextPage = totalPages > lastLoadedPage!;

  bindBottomInfiniteScrollObserver(hasNextPage, async () => {
    try {
      await renderPopularMoviePage(lastLoadedPage! + 1, 'append');
    } catch (error) {
      await handleError(error);
      removeSkeletonItems();
    }
  });
}