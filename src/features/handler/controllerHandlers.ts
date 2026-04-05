import MovieList from "../UI/MovieList";
import { MovieResponse, UpdateMoreButton } from "../../../types/types";
import {
  handleHeader,
  handleHeaderSearch,
  handleMovieList,
} from "./renderHandlers";
import {
  handleMoreMovie,
  handleMovie,
  handleSearchMovie,
} from "./dataHandlers";

export async function initialRender(
  movieList: MovieList,
  page: number,
  moreButton: HTMLButtonElement,
  updateMoreButton: UpdateMoreButton,
): Promise<void> {
  const mainTitle = document.querySelector(".main-title") as HTMLElement;

  mainTitle.textContent = "지금 인기 있는 영화";

  const data: MovieResponse = await handleMovie(page, movieList);
  handleHeader(data.results[0]);
  handleMovieList(movieList, data);
  updateMoreButton(moreButton, data);
}

export async function searchRender(
  movieList: MovieList,
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
  updateMoreButton: UpdateMoreButton,
): Promise<void> {
  const mainTitle = document.querySelector(".main-title") as HTMLElement;

  mainTitle.textContent = `"${searchMovie}" 검색 결과`;

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

  updateMoreButton(moreButton, data);
}

export async function moreRender(
  movieList: MovieList,
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
  updateMoreButton: UpdateMoreButton,
): Promise<void> {
  const data: MovieResponse = await handleMoreMovie(page, searchMovie);

  movieList.renderMovieList(data);
  updateMoreButton(moreButton, data);
}
