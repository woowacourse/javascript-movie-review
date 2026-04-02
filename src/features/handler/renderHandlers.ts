import { Header } from "../UI/Header";
import MovieList from "../UI/MovieList";
import { Movie } from "../../../types/types";

const movieListInstance = new MovieList();

export function handleHeaderSearch(): void {
  Header.clearHeader();
  Header.renderSearch();
}

export function handleHeader(movie: Movie): void {
  Header.clearHeader();
  Header.render(movie);
}

export function handleMovieList(data: {
  results: Movie[];
  total_pages: number;
}): void {
  movieListInstance.clearList();
  movieListInstance.renderMovieList(data);
}
