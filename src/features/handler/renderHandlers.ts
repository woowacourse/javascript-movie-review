import Header from "../UI/Header";
import MainTitle from "../UI/MainTitle";
import MovieList from "../UI/MovieList";
import Modal from "../UI/Modal";
import {
  Movie,
  MovieResponse,
  MovieDetailResponse,
} from "../../../types/types";

const header = new Header();
const mainTitle = new MainTitle();
const movieList = new MovieList();

export function handleHeaderSearch(searchMovie: string): void {
  header.clearHeader();
  header.renderSearch(searchMovie);
}

export function handleHeader(movie: Movie): void {
  header.clearHeader();
  header.render(movie);
}

export function handleMainTitle(title: string): void {
  mainTitle.render(title);
}

export function handleMovieList(data: MovieResponse): void {
  movieList.clearList();
  movieList.renderMovieList(data);
}

export function handleSkeleton(): void {
  movieList.renderSkeleton();
}

export function handleEmptyMovie(): void {
  movieList.showEmpty();
}

export function handleMoreMovie(data: MovieResponse): void {
  movieList.renderMovieList(data);
}

export function handleModal(data: MovieDetailResponse) {
  const modal = new Modal(data);
  modal.renderModal();
}
