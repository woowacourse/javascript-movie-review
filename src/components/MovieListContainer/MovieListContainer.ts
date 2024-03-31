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
      <div id="error-message-container" class="w-4_5 rounded-lg error-message-container hidden">
        <p class="error-title">! 문제가 발생했습니다.</p>
        <p id="error-description" class="font-normal error-text"></p> 
        <p class="font-normal error-text">페이지를 새로 고침 하거나 다시 시도해주세요.</p>
      </div>
    `;
  }

  protected initializeState(): void {
    this.manager = new MovieListManager(this.props?.searchKeyword);
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

  private showErrorMessage(message: string) {
    const $div = $<HTMLDivElement>("#error-message-container");
    const $p = $<HTMLParagraphElement>("#error-description");

    if (!$div || !$p) return;

    $div.classList.remove("hidden");
    $p.innerText = message;

    document.body.classList.add("overflow-hidden");
  }

  private async handleRenderMovieList() {
    console.log("handleRenderMovieList exec");

    try {
      renderSkeleton();

      const movies = await this.manager?.fetchMovieList();

      hideSkeleton();

      if (movies) {
        this.movieList?.renderMovies(movies);
      }
      if (this.manager?.isEndPage()) {
        this.removeScrollTrigger();
      }
    } catch (error) {
      if (error instanceof Error) {
        this.showErrorMessage(error.message);
      }
    }
  }
}
