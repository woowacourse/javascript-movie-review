import { fetchMovies } from "../api";
import { handleError } from "../error";
import bindInfiniteScrollObserver from "../observer/bindInfiniteScrollObserver";
import renderLoadMoreTopButton from "./renderLoadMoreTopButton";
import renderMovieItems from "./renderMovieItems";
import renderSearchListEmptyAlert from "./renderSearchListEmptyAlert";

import renderSkeletonItems, { removeSkeletonItems } from "./renderSkeletonItems";
import restoreScrollPosition from "./restoreScrollPosition";

let firstLoadedPage: number | null = null;
let lastLoadedPage: number | null = null;
let totalPages = 0;

export async function renderSearchMoviePage(page: number, query: string, direction: 'append' | 'prepend' = 'append') {
  if (firstLoadedPage === null || lastLoadedPage === null) {
    firstLoadedPage = page;
    lastLoadedPage = page;
  } else {
    firstLoadedPage = Math.min(firstLoadedPage, page);
    lastLoadedPage = Math.max(lastLoadedPage, page);
  }

  renderSkeletonItems(20, direction);

  const response = await fetchMovies("/search/movie", { query, page });

  totalPages = response.total_pages;

  removeSkeletonItems();

  renderMovieItems(page, response.results, direction);

  renderSearchListEmptyAlert();

  restoreScrollPosition();

  const hasPrevPage = firstLoadedPage !== null && firstLoadedPage > 1;

  renderLoadMoreTopButton(hasPrevPage, async () => {
    try {
      await renderSearchMoviePage(firstLoadedPage! - 1, query, 'prepend');
    } catch (error) {
      handleError(error);
      removeSkeletonItems();
    }
  });

  const hasNextPage = totalPages > lastLoadedPage!;

  bindInfiniteScrollObserver(hasNextPage, async () => {
    try {
      await renderSearchMoviePage(lastLoadedPage! + 1, query, 'append');
    } catch (error) {
      handleError(error);
      removeSkeletonItems();
    }
  })
}