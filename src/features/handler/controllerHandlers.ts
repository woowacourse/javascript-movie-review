import MovieList from "../UI/MovieList";
import { Movie } from "../../../types/types";
import {
  handleHeader,
  handleHeaderSearch,
  handleMovieList,
} from "./renderHandlers";
import { handleMoreMovie, handleMovie, handleSearchMovie } from "./dataHandlers";

const movieListInstance = new MovieList();

type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

type UpdateMoreButton = (
  moreButton: HTMLButtonElement,
  data: MovieResponse,
) => void;

export async function initialRender(
  page: number,
  moreButton: HTMLButtonElement,
  updateMoreButton: UpdateMoreButton,
): Promise<void> {
  const mainTitle = document.querySelector(".main-title") as HTMLElement;

  mainTitle.textContent = "지금 인기 있는 영화";

  const data: MovieResponse = await handleMovie(page);
  handleHeader(data.results[0]);
  handleMovieList(data);
  updateMoreButton(moreButton, data);
}

export async function searchRender(
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
  updateMoreButton: UpdateMoreButton,
): Promise<void> {
  const mainTitle = document.querySelector(".main-title") as HTMLElement;

  mainTitle.textContent = `"${searchMovie}" 검색 결과`;

  const data: MovieResponse = await handleSearchMovie(page, searchMovie);
  handleHeaderSearch();

  if (data.results.length === 0) {
    movieListInstance.showEmpty();
  } else {
    handleMovieList(data);
  }

  updateMoreButton(moreButton, data);
}

export async function moreRender(
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
  updateMoreButton: UpdateMoreButton,
): Promise<void> {
  const data: MovieResponse = await handleMoreMovie(page, searchMovie);

  movieListInstance.renderMovieList(data);
  updateMoreButton(moreButton, data);
}
