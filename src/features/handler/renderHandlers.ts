import { Header } from "../UI/Header";
import MovieList from "../UI/MovieList";
import { Movie, MovieResponse } from "../../../types/types";

export function handleHeaderSearch(): void {
  Header.clearHeader();
  Header.renderSearch();
}

export function handleHeader(movie: Movie): void {
  Header.clearHeader();
  Header.render(movie);
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
