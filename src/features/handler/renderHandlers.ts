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

export function showSearchHeader(searchMovie: string): void {
  header.clearHeader();
  header.renderSearch(searchMovie);
}

export function showHeader(movie: Movie): void {
  header.clearHeader();
  header.render(movie);
}

export function showMainTitle(title: string): void {
  mainTitle.render(title);
}

export function showMovieList(data: MovieResponse): void {
  movieList.clearList();
  movieList.renderMovieList(data);
}

export function showSkeleton(): void {
  movieList.renderSkeleton();
}

export function emptyMovie(): void {
  movieList.showEmpty();
}

export function showMoreMovie(data: MovieResponse): void {
  movieList.renderMovieList(data);
}

export function openModal(data: MovieDetailResponse) {
  const modal = new Modal(data);
  modal.renderModal();
}

export function closeModal(element: HTMLElement) {
  element.classList.remove("active");
}
