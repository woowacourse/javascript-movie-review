import Component from "../common/Component";
import MovieList from "../MovieList/MovieList";
import { hideSkeleton, renderSkeleton } from "../Skeleton/Skeleton";

import MovieListManager from "../../domains/MovieListManager/MovieListManager";

import { $ } from "../../utils/dom";
import { createScrollObserver } from "../../utils/scroll-observer";

import "./MovieListContainer.css";

interface MovieListContainerProps {
  searchKeyword?: string;
}

export default class MovieListContainer extends Component<MovieListContainerProps, {}> {
  private movieList: MovieList | undefined;

  private manager: MovieListManager | undefined;

  private scrollObserver: IntersectionObserver | undefined;

  protected getTemplate(): string {
    return /*html*/ `
      <ul id="movie-list-container" class="item-list"></ul>
    `;
  }

  protected initializeState(): void {
    this.manager = new MovieListManager(this.props?.searchKeyword);
  }

  protected render() {
    this.$target.insertAdjacentHTML("afterend", this.getTemplate());

    const $ul = $<HTMLUListElement>("#movie-list-container");

    if ($ul) {
      this.movieList = new MovieList($ul, {
        removeScrollTrigger: this.removeScrollTrigger,
      });
    }

    this.handleRenderMovieList();
  }

  protected setEvent() {
    const $div = $<HTMLButtonElement>("#scroll-trigger");

    if (!$div) return;

    this.scrollObserver = createScrollObserver({
      callback: this.handleRenderMovieList.bind(this),
      options: {
        threshold: 0.5,
      },
    });

    this.scrollObserver.observe($div);
  }

  private handleRemoveMoreButton() {
    if (this.manager?.isEndPage()) {
      this.removeScrollTrigger();

      this.scrollObserver?.disconnect();
    }
  }

  private removeScrollTrigger() {
    const $div = $<HTMLButtonElement>("#scroll-trigger");

    if ($div) {
      $div.remove();
    }
  }

  public async handleRenderMovieList() {
    try {
      renderSkeleton();

      const movies = await this.manager?.fetchMovieList();

      this.handleRemoveMoreButton();

      hideSkeleton();

      if (movies) {
        this.movieList?.renderMovies(movies);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}
