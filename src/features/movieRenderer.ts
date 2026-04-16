import { fetchPopularMovies, fetchSearchMovies } from "../api/movieApi";
import { createMovieList } from "../components/movie";

export const hideLoadMoreButton = (loadMoreBtnEl: HTMLButtonElement) => {
  loadMoreBtnEl.classList.add("hidden");
};

export const handleLoadMoreButton = async (
  page: number,
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  skeletonEls: HTMLElement,
  onMovieClick: (id: number) => void,
  query?: string,
) => {
  loadMoreBtnEl.disabled = true;
  mainEl.append(skeletonEls, loadMoreBtnEl);

  const data = query
    ? await fetchSearchMovies(query, page)
    : await fetchPopularMovies(page);

  if (data) {
    loadMoreBtnEl.disabled = false;
    const newMovieList = createMovieList(data.results, onMovieClick);
    skeletonEls.replaceWith(newMovieList);
  }
};
