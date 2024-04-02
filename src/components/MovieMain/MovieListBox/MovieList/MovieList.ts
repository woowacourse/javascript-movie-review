import MovieItem, { Movie } from "./MovieItem";

import createElement from "../../../utils/createElement";

interface MovieListProps {
  onMovieItemClick: (id: number) => void;
}

class MovieList {
  private static MAX_ITEM_OF_PAGE = 20;

  private $element: HTMLElement;
  private props: MovieListProps;

  private movieList: MovieItem[];

  constructor(props: MovieListProps) {
    this.props = props;

    this.movieList = Array.from({ length: MovieList.MAX_ITEM_OF_PAGE }).map(
      () => new MovieItem({ onClick: this.props.onMovieItemClick })
    );
    this.$element = this.generateMovieList();
  }

  getElement() {
    return this.$element;
  }

  reRender(movies: Movie[]) {
    Array.from({ length: MovieList.MAX_ITEM_OF_PAGE }).forEach((_, index) => {
      const movieItem = this.movieList[index];

      if (index < movies.length) {
        const movie = movies[index];
        movieItem.reRender(movie);
        return;
      }

      movieItem.remove();
    });
  }

  renderMessage(message: string) {
    this.removeAllSkeleton();

    const textInvalidResult = createElement({
      tagName: "div",
      attribute: {
        class: "text-invalid-result",
      },
      children: [
        this.$element.childNodes.length === 0 ? message : "이상입니다!",
      ],
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

  appendSkeleton() {
    this.movieList = Array.from({ length: MovieList.MAX_ITEM_OF_PAGE }).map(
      () => new MovieItem({ onClick: this.props.onMovieItemClick })
    );
    this.$element.append(...this.movieList.map((item) => item.getElement()));
  }

  private removeAllSkeleton() {
    this.movieList.forEach((movieItem) => {
      movieItem.remove();
    });
  }

  private generateMovieList() {
    return createElement({
      tagName: "ul",
      attribute: { class: "item-list" },
      children: this.movieList.map((item) => item.getElement()),
    });
  }
}

export default MovieList;
