import Component from "../common/Component";
import MovieList from "../MovieList/MovieList";
import { hideSkeleton, renderSkeleton } from "../Skeleton/Skeleton";
import NetworkErrorMessage from "../NetworkErrorMessage/NetworkErrorMessage";

import MovieListAPI from "../../domains/MovieListAPI/MovieListAPI";
import MovieListPage from "../../domains/MovieListPage/MovieListPage";

import { $ } from "../../utils/dom";
import { createScrollObserver } from "../../utils/scroll-observer";
import { Optional } from "../../types/utility";

import "./MovieListContainer.css";

interface MovieListContainerProps {
  searchKeyword?: string;
}

export default class MovieListContainer extends Component<MovieListContainerProps, {}> {
  private movieList: Optional<MovieList>;

  private networkErrorMessage: Optional<NetworkErrorMessage>;

  private api: Optional<MovieListAPI>;

  private scrollObserver: Optional<IntersectionObserver>;

  private listPage: Optional<MovieListPage>;

  protected getTemplate(): string {
    return /*html*/ `
      <ul id="movie-list-container" class="item-list"></ul>
    `;
  }

  protected initializeState(): void {
    this.api = new MovieListAPI(this.props?.searchKeyword);

    this.networkErrorMessage = new NetworkErrorMessage(this.$target);

    this.listPage = new MovieListPage(1);
  }

  protected render() {
    this.$target.insertAdjacentHTML("beforeend", this.getTemplate());

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
        threshold: 0.3,
      },
    });

    this.scrollObserver.observe($div);
  }

  private removeScrollTrigger() {
    const $div = $<HTMLButtonElement>("#scroll-trigger");

    if ($div) {
      $div.remove();

      this.scrollObserver?.unobserve($div);
      this.scrollObserver?.disconnect();
    }
  }

  private handleRemoveScrollTrigger() {
    if (!this.listPage?.isEndPage()) return;

    this.removeScrollTrigger();
  }

  private updatePage(currentPage: number) {
    if (currentPage) {
      this.listPage?.setPage(currentPage + 1);
    }
  }

  private async handleRenderMovieList() {
    try {
      const currentPage = this.listPage?.getPage();
      if (!currentPage) return;

      renderSkeleton();

      this.updatePage(currentPage);
      const movies = await this.api?.fetchMovieList(currentPage);

      hideSkeleton();

      if (movies) {
        this.movieList?.renderMovies(movies);
      }
      this.handleRemoveScrollTrigger();
    } catch (error) {
      if (error instanceof Error) {
        this.networkErrorMessage?.show(error.message);
      }
    }
  }
}
