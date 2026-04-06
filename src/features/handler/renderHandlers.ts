import Header from "../UI/Header";
import MovieList from "../UI/MovieList";
import { Movie, MovieResponse } from "../../../types/types";

const header = new Header();

export function handleHeaderSearch(): void {
  header.clearHeader();
  header.renderSearch();
}

export function handleHeader(movie: Movie): void {
  header.clearHeader();
  header.render(movie);
}

export function handleMovieList(
  movieList: MovieList,
  data: MovieResponse,
): void {
  movieList.clearList();
  movieList.renderMovieList(data);
}

export function handleMoreButton(
  moreButton: HTMLButtonElement,
  totalPages: number,
  page: number,
): void {
  moreButton.style.display = totalPages === page ? "none" : "block";
}
