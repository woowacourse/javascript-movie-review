import { createMovieCard } from "./movie-card";
import { createSkeletonList } from "./skeleton-card";
import { createEmpty } from "./empty";
import { createError } from "./error";
import { MovieListService } from "../services/movie/MovieListService";
import { MovieItem } from "../services/movie/MovieListService";

class MovieListComponent {
  private section: HTMLElement;
  private grid: HTMLElement;
  private pendingUl: HTMLUListElement | null = null;

  constructor(title: string, movieList: MovieListService) {
    this.section = document.createElement("section");

    const h2 = document.createElement("h2");
    h2.textContent = title;

    this.grid = document.createElement("div");
    this.grid.className = "movie-list";

    this.section.append(h2, this.grid);
    this.bindMovieList(movieList);
  }

  private bindMovieList(movieList: MovieListService): void {
    movieList.subscribe(({ data: { movies, page }, isPending, error }) =>
      this.update(movies, isPending, page, error),
    );
  }

  private update(
    movies: MovieItem[],
    isPending: boolean,
    page: number,
    error: boolean,
  ): void {
    if (isPending) {
      this.showSkeleton();
      return;
    }

    this.hideSkeleton();

    const isFirstPageEmpty = page === 1 && movies.length === 0;
    const hasMovies = movies.length > 0;

    if (error) return this.showError();
    if (isFirstPageEmpty) return this.showEmpty();
    if (hasMovies) this.grid.appendChild(this.createMovieUl(movies));
  }

  private createMovieUl(movies: MovieItem[]): HTMLUListElement {
    const ul = document.createElement("ul");
    ul.className = "thumbnail-list";

    const fragment = document.createDocumentFragment();
    movies.forEach((movie) => fragment.appendChild(createMovieCard(movie)));
    ul.appendChild(fragment);

    return ul;
  }

  private showEmpty(): void {
    this.grid.appendChild(createEmpty());
  }

  private showError(): void {
    this.grid.appendChild(createError());
  }

  private showSkeleton(): void {
    this.pendingUl = createSkeletonList();
    this.grid.appendChild(this.pendingUl);
  }

  private hideSkeleton(): void {
    if (!this.pendingUl) return;
    this.grid.removeChild(this.pendingUl);
    this.pendingUl = null;
  }

  getElement(): HTMLElement {
    return this.section;
  }
}

export function createMovieList({
  title,
  movieList,
}: {
  title: string;
  movieList: MovieListService;
}): HTMLElement {
  return new MovieListComponent(title, movieList).getElement();
}
