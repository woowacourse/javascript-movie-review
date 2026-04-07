import { createMovieCard } from "./movie-card";
import { createSkeletonList } from "./skeleton-card";
import { createEmpty } from "./empty";
import { MovieList } from "../domains/movie";
import { MovieItem } from "../domains/movie/MovieList";

class MovieListComponent {
  private section: HTMLElement;
  private grid: HTMLElement;
  private pendingUl: HTMLUListElement | null = null;

  constructor(title: string, movieList: MovieList) {
    this.section = document.createElement("section");

    const h2 = document.createElement("h2");
    h2.textContent = title;

    this.grid = document.createElement("div");
    this.grid.className = "movie-list";

    this.section.append(h2, this.grid);
    this.bindMovieList(movieList);
  }

  private bindMovieList(movieList: MovieList): void {
    movieList.subscribe(({ movies, isPending, page }) =>
      this.update(movies, isPending, page),
    );
  }

  private update(movies: MovieItem[], isPending: boolean, page: number): void {
    if (isPending) {
      this.showSkeleton();
      return;
    }

    this.hideSkeleton();

    if (page === 1 && movies.length === 0) {
      this.grid.appendChild(createEmpty());
    } else if (movies.length > 0) {
      this.grid.appendChild(this.createMovieUl(movies));
    }
  }

  private createMovieUl(movies: MovieItem[]): HTMLUListElement {
    const ul = document.createElement("ul");
    ul.className = "thumbnail-list";

    const fragment = document.createDocumentFragment();
    movies.forEach((movie) => fragment.appendChild(createMovieCard(movie)));
    ul.appendChild(fragment);

    return ul;
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
  movieList: MovieList;
}): HTMLElement {
  return new MovieListComponent(title, movieList).getElement();
}
