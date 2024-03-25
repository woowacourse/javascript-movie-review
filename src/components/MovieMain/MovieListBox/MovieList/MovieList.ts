import MovieItem, { Movie } from "./MovieItem";

import createElement from "../../../utils/createElement";

class MovieList {
  private static MAX_ITEM_OF_PAGE = 20;
  $element;
  movieList;

  constructor() {
    this.movieList = Array.from({ length: MovieList.MAX_ITEM_OF_PAGE }).map(
      () => new MovieItem()
    );
    this.$element = this.generateMovieList();
  }

  private generateMovieList() {
    return createElement({
      tagName: "ul",
      attribute: { class: "item-list" },
      children: this.movieList.map((item) => item.$element),
    });
  }

  reRender(movies: Movie[]) {
    movies.forEach((movie, index) => {
      const movieItem = this.movieList[index];
      movieItem.reRender(movie);
      return;
    });

    const restSkeletonCount = MovieList.MAX_ITEM_OF_PAGE - movies.length;

    if (restSkeletonCount) {
      Array.from({ length: restSkeletonCount }).forEach((_, index) => {
        const movieItem = this.movieList[movies.length + index];
        movieItem.$element.remove();
      });
    }
  }

  appendSkeleton() {
    this.movieList = Array.from({ length: MovieList.MAX_ITEM_OF_PAGE }).map(
      () => new MovieItem()
    );
    this.$element.append(...this.movieList.map((item) => item.$element));
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
}

export default MovieList;
