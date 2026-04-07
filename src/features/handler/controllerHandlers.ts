import { Movie } from "../../../types/types";
import {
  renderHeader,
  renderSearchHeader,
  renderInitialMovieList,
  renderSkeleton,
  clearList,
  showEmpty,
  appendMovieList,
  renderMainTitle,
  clearSearchInput,
  updateMoreButton,
} from "./renderHandlers";
import {
  getMoreMovies,
  getPopularMovies,
  getSearchMovies,
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
    const data: MovieResponse = await getPopularMovies(page);
    renderHeader(data.results[0]);
    renderInitialMovieList(data);
    updateMoreButton(data);
  } catch (error) {
    clearList();
    if (error instanceof Error) alert(error.message);
  }
}

export async function renderSearchResults(
  page: number,
  searchQuery: string,
): Promise<void> {
  try {
    renderSkeleton();
    renderMainTitle(`"${searchQuery}" 검색 결과`);

    const data: MovieResponse = await getSearchMovies(page, searchQuery);
    renderSearchHeader();

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

export async function renderMoreMovies(
  page: number,
  searchQuery: string,
): Promise<void> {
  try {
    const data: MovieResponse = await getMoreMovies(page, searchQuery);

    appendMovieList(data);
    updateMoreButton(data);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}
