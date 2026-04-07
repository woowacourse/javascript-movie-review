import { Header } from "../UI/Header";
import MovieList from "../UI/MovieList";
import { Movie } from "../../../types/types";
import { movieState } from "../states/movieState";

const movieListInstance = new MovieList();

export function handleHeaderSearch(): void {
  Header.clearHeader();
  Header.renderSearch();
}

export function handleHeader(movie: Movie): void {
  Header.clearHeader();
  Header.render(movie);
}

export function renderInitialMovieList(data: {
  results: Movie[];
  total_pages: number;
}): void {
  movieListInstance.clearList();
  movieListInstance.renderMovieList(data);
}

export function renderMainTitle(title: string): void {
  const mainTitle = document.querySelector(".main-title") as HTMLElement;
  if (mainTitle) {
    mainTitle.textContent = title;
  }
}

export function clearSearchInput(): void {
  const searchInput = document.querySelector(
    ".search-input",
  ) as HTMLInputElement;
  if (searchInput) {
    searchInput.value = "";
  }
}

export function getSearchInputValue(): string {
  const searchInput = document.querySelector(
    ".search-input",
  ) as HTMLInputElement;
  return searchInput ? searchInput.value.trim() : "";
}

export function updateMoreButton(data: {
  results: Movie[];
  total_pages: number;
}): void {
  const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
  if (!moreButton) return;

  if (data.total_pages === movieState.page) {
    moreButton.style.display = "none";
  } else {
    moreButton.style.display = "block";
  }
}

export function clearList() {
  return movieListInstance.clearList();
}

export function renderSkeleton() {
  return movieListInstance.renderSkeleton();
}

export function showEmpty() {
  return movieListInstance.showEmpty();
}

export function appendMovielist(data: {
  results: Movie[];
  total_pages: number;
}) {
  return movieListInstance.renderMovieList(data);
}
