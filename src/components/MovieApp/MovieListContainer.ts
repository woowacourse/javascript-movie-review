import Component from "../../common/Component";

import { hideSkeleton, renderSkeleton } from "../Skeleton";
import MovieList from "./MovieList";

import { $ } from "../../utils/dom";
import { MovieItem } from "../../types/movies";
import movieFetcher from "../../http/MovieFetcher";
import { MAX_PAGE } from "../../constants/movies";

interface MovieListContainerProps {
  searchKeyword?: string;
}

export default class MovieListContainer extends Component<MovieListContainerProps, {}> {
  private movieList: MovieList | undefined;

  private currentPage: number | undefined;

  protected getTemplate(): string {
    return /*html*/ `
      <ul id="movie-list-container" class="item-list"></ul>
    `;
  }

  protected initializeState(): void {
    this.currentPage = 0;
  }

  protected render() {
    this.$target.insertAdjacentHTML("afterend", this.getTemplate());

    const $ul = $<HTMLUListElement>("#movie-list-container");

    if ($ul) {
      this.movieList = new MovieList($ul);
    }

    this.handleRenderMovieList();
  }

  private removeMoreButton() {
    const $button = $<HTMLButtonElement>("#next-button");

    $button && $button.remove();
  }

  private handleRemoveMoreButton() {
    if (!this.currentPage || this.currentPage >= MAX_PAGE) {
      this.removeMoreButton();
    }
  }

  private increaseCurrentPage() {
    if (typeof this.currentPage !== "number") return;

    this.currentPage += 1;

    this.handleRemoveMoreButton();
  }

  private async fetchMovieList(): Promise<MovieItem[] | undefined> {
    if (typeof this.currentPage !== "number") return;

    this.increaseCurrentPage();

    return this.props?.searchKeyword
      ? await movieFetcher.getSearchMovies(this.currentPage, this.props.searchKeyword)
      : await movieFetcher.getPopularMovies(this.currentPage);
  }

  public async handleRenderMovieList() {
    try {
      renderSkeleton();

      const movies = await this.fetchMovieList();

      hideSkeleton();

      movies && this.movieList?.renderMovies(movies);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}
