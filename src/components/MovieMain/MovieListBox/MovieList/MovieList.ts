import MovieItem, { Movie } from "./MovieItem";

import MovieDetailModal from "../MovieDetailModal/MovieDetailModal";
import ObserveIntersection from "../../../utils/ObserveIntersection";
import createElement from "../../../utils/createElement";

class MovieList {
  private STUB_ITEM_LENGTH = 20;
  $element;
  movieList;

  private isLoading = true;
  private touchBottom = false;
  private domObserver;
  private getMoreMovies;

  constructor(getMoreMovies: () => void) {
    this.getMoreMovies = getMoreMovies;
    this.movieList = Array.from({ length: this.STUB_ITEM_LENGTH }).map(
      () => new MovieItem()
    );
    this.$element = this.generateMovieList();

    this.setScrollObserver(getMoreMovies);

    this.domObserver = new MutationObserver(() => {
      this.setScrollObserver(getMoreMovies);
    });
    const config = { attributes: true, childList: true, subtree: false };
    this.domObserver.observe(this.$element, config);
  }

  reRender(movies: Movie[]) {
    movies.forEach((movie, index) => {
      const movieItem = this.movieList[index];
      movieItem.reRender(movie);
      return;
    });

    const restSkeletonCount = this.STUB_ITEM_LENGTH - movies.length;

    if (restSkeletonCount) {
      Array.from({ length: restSkeletonCount }).forEach((_, index) => {
        const movieItem = this.movieList[movies.length + index];
        movieItem.$element.remove();
      });
    }

    this.isLoading = false;

    if (this.touchBottom) {
      this.setScrollObserver(this.getMoreMovies);
    }
  }

  appendSkeleton() {
    this.movieList = Array.from({ length: this.STUB_ITEM_LENGTH }).map(
      () => new MovieItem()
    );
    this.$element.append(...this.movieList.map((item) => item.$element));
    this.isLoading = true;
    this.touchBottom = false;
  }

  removeAllSkeleton() {
    this.movieList.forEach((movieItem) => {
      movieItem.$element.remove();
    });
  }

  renderMessage(message: string) {
    this.removeAllSkeleton();

    const textInvalidResult = createElement({
      tagName: "div",
      attribute: {
        class: "text-invalid-result",
      },
      children: [message],
    });

    this.$element.append(textInvalidResult);
  }

  removeMessage() {
    const $lastChild = this.$element.lastChild;
    if (!($lastChild instanceof HTMLElement)) {
      return;
    }
    if ($lastChild.classList.contains("text-invalid-result")) {
      $lastChild.remove();
    }
  }

  clearDomObserver() {
    this.domObserver?.disconnect();
  }

  private setScrollObserver(getMoreMovies: () => void) {
    if (!(this.$element.lastChild instanceof HTMLElement)) {
      return;
    }

    const observer = new ObserveIntersection({
      target: this.$element.lastChild,
      callback: () => {
        this.touchBottom = true;

        if (this.isLoading) {
          return;
        }

        observer.clearObserveIntersection();
        getMoreMovies();
      },
      options: {
        threshold: 0.5,
      },
    });
  }

  private showDetailModal(e: Event) {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    const movieItem = e.target.closest("li");

    if (!movieItem) {
      return;
    }

    const movieId = Number(movieItem.getAttribute("id"));
    const detailModal = new MovieDetailModal(movieId);

    const $modalSection = document.querySelector(".modal-section");
    $modalSection?.replaceChildren(detailModal.$element);
    detailModal.toggle();
  }

  private generateMovieList() {
    return createElement({
      tagName: "ul",
      attribute: { class: "item-list" },
      children: this.movieList.map((item) => item.$element),
      eventListener: { click: this.showDetailModal.bind(this) },
    });
  }
}

export default MovieList;
