import { Movie } from '../../types/movie';

export interface MovieListViewElements {
  listElement: HTMLUListElement;
  skeletonElement: HTMLUListElement;
  seeMoreButton: HTMLButtonElement;
  sectionTitle: HTMLHeadingElement;
  noResult: HTMLDivElement;
}

export class MovieListView {
    constructor(
        private readonly el: MovieListViewElements,
        private readonly onMovieClick?: (movieId: number) => void,
    ) {
        if (this.onMovieClick) {
            this.el.listElement.addEventListener("click", this.handleClick);
        }
    }

    renderMovies(movies: readonly Movie[]): void {
        this.el.listElement.innerHTML = movies.map(createMovieCa)
    }
}