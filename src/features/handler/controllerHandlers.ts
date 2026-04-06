import MovieList from "../UI/MovieList";
import { MovieResponse } from "../../../types/types";
import {
  handleHeader,
  handleHeaderSearch,
  handleMainTitle,
  handleMoreButton,
  handleMovieList,
} from "./renderHandlers";
import {
  handleMoreMovie,
  handleMovie,
  handleSearchMovie,
} from "./dataHandlers";

export async function loadInitialMovies(
  movieList: MovieList,
  page: number,
  moreButton: HTMLButtonElement,
): Promise<void> {
  handleMainTitle("지금 인기 있는 영화");

  const data: MovieResponse = await handleMovie(page, movieList);
  handleHeader(data.results[0]);
  handleMovieList(movieList, data);
  handleMoreButton(moreButton, data.total_pages, page);
}

export async function loadSearchMovies(
  movieList: MovieList,
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
): Promise<void> {
  handleMainTitle(`"${searchMovie}" 검색 결과`);

  const data: MovieResponse = await handleSearchMovie(
    page,
    searchMovie,
    movieList,
  );
  handleHeaderSearch();

  if (data.results.length === 0) {
    movieList.showEmpty();
  } else {
    handleMovieList(movieList, data);
  }

  handleMoreButton(moreButton, data.total_pages, page);
}

export async function loadMoreMovies(
  movieList: MovieList,
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
): Promise<void> {
  const data: MovieResponse = await handleMoreMovie(page, searchMovie);

  movieList.renderMovieList(data);
  handleMoreButton(moreButton, data.total_pages, page);
}
