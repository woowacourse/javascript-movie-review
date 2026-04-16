import { Movie } from "../../types/movie";
import { SKELETON_MOVIE_COUNT } from "../constants/constant";
import { createMovieListItemMarkup } from "./movieListMarkup";

export interface MovieListViewElements {
  listElement: HTMLUListElement;
  skeletonElement: HTMLUListElement;
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
    this.el.listElement.innerHTML = movies.map(createMovieListItemMarkup).join("");
  }

  renderSectionTitle(text: string): void {
    this.el.sectionTitle.textContent = text;
  }

  showSkeleton(): void {
    const skeletonItemMarkup = /* html */ `<li>
    <div class="item" aria-hidden="true">
      <div class="thumbnail thumbnail-skeleton skeleton"></div>
      <div class="item-desc">
        <p class="rate rate-skeleton">
          <span class="rate-icon-skeleton skeleton"></span>
          <span class="rate-value-skeleton skeleton"></span>
        </p>
        <div class="title-skeleton skeleton"></div>
      </div>
    </div>
  </li>`;

    this.el.skeletonElement.innerHTML = Array.from({ length: SKELETON_MOVIE_COUNT }, () => skeletonItemMarkup).join("");
  }

  hideSkeleton(): void {
    this.el.skeletonElement.innerHTML = "";
  }

  toggleNoResult(visible: boolean): void {
    this.el.noResult.hidden = !visible;
  }

  private handleClick = (event: Event) => {
    const target = event.target as HTMLElement;

    const card = target.closest<HTMLElement>("[data-movie-id]");

    if (!card) return;

    const id = Number(card.dataset.movieId);

    if (Number.isFinite(id)) this.onMovieClick?.(id);
  };
}
