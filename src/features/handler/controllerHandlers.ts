import { Movie } from "../../../types/types";
import {
  handleHeader,
  handleHeaderSearch,
  renderInitialMovieList,
  renderSkeleton,
  clearList,
  showEmpty,
  appendMovielist,
  renderMainTitle,
  clearSearchInput,
  updateMoreButton,
} from "./renderHandlers";
import {
  handleMoreMovie,
  handleMovie,
  handleSearchMovie,
} from "./dataHandlers";

type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

export async function initialRender(page: number): Promise<void> {
  try {
    clearSearchInput();
    renderMainTitle("지금 인기 있는 영화");

    renderSkeleton();
    const data: MovieResponse = await handleMovie(page);
    handleHeader(data.results[0]);
    renderInitialMovieList(data);
    updateMoreButton(data);
  } catch (error) {
    clearList();
    if (error instanceof Error) alert(error.message);
  }
}

export async function searchRender(
  page: number,
  searchMovie: string,
): Promise<void> {
  try {
    renderSkeleton();
    renderMainTitle(`"${searchMovie}" 검색 결과`);

    const data: MovieResponse = await handleSearchMovie(page, searchMovie);
    handleHeaderSearch();

    if (data.results.length === 0) {
      showEmpty();
    } else {
      renderInitialMovieList(data);
    }

    updateMoreButton(data);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}

export async function moreRender(
  page: number,
  searchMovie: string,
): Promise<void> {
  try {
    const data: MovieResponse = await handleMoreMovie(page, searchMovie);

    appendMovielist(data);
    updateMoreButton(data);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}
