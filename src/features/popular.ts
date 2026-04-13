import { fetchPopularMovies } from "../api/movieApi";
import { createMovieList } from "../components/movie";
import { hideLoadMoreButton, handleLoadMoreButton } from "./movieRenderer";

export const renderPopularMovieList = async (
  loadMoreBtnEl: HTMLButtonElement,
  mainEl: Element,
  skeletonEls: HTMLElement,
  onMovieClick: (id: number) => void,
) => {
  let page = 1;

  const data = await fetchPopularMovies(page);
  const movieList = createMovieList(data.results, onMovieClick);
  skeletonEls.replaceWith(movieList, loadMoreBtnEl);

  if (data.total_pages === page) hideLoadMoreButton(loadMoreBtnEl);

  loadMoreBtnEl.onclick = () => {
    page++;
    handleLoadMoreButton(
      page,
      loadMoreBtnEl,
      mainEl,
      skeletonEls,
      onMovieClick,
      undefined,
    );
  };
};
