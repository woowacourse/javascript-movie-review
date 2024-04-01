import { Movie } from "./MovieList/MovieItem";
import MovieList from "./MovieList/MovieList";
import createElement from "../../utils/createElement";

class MovieListBox {
  $element;
  movieList;

  constructor({
    title,
    getMoreMovies,
  }: {
    title: string;
    getMoreMovies: () => void;
  }) {
    const $h2 = createElement({
      tagName: "h2",
      children: [title],
    });

    this.movieList = new MovieList(() => {
      this.movieList.removeMessage();
      this.showMoreMovies();
      getMoreMovies();
    });

    this.$element = this.generateMovieListBox({
      children: [$h2, this.movieList.$element],
    });
  }

  reRender(movieList: Movie[]) {
    this.movieList.reRender(movieList);
  }

  renderMessage(message: string) {
    this.movieList.renderMessage(message);
  }

  private showMoreMovies() {
    this.movieList.appendSkeleton();
  }

  removeMovieMoreButton() {
    this.movieList.clearDomObserver();
  }

  private generateMovieListBox({ children }: { children: HTMLElement[] }) {
    const $section = createElement({
      tagName: "section",
      attribute: { class: "item-view" },
      children,
    });

    return $section;
  }
}

export default MovieListBox;
