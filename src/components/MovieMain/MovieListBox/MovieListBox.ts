import { Movie } from "./MovieList/MovieItem";
import MovieList from "./MovieList/MovieList";
import MovieMoreButton from "./MovieList/MovieMoreButton";
import createElement from "../../utils/createElement";

class MovieListBox {
  $element;
  movieList;
  button;

  constructor({
    title,
    onMovieMoreButtonClick,
  }: {
    title: string;
    onMovieMoreButtonClick: () => void;
  }) {
    const $h2 = createElement({
      tagName: "h2",
      children: [title],
    });

    this.movieList = new MovieList();
    this.button = new MovieMoreButton({
      onClickHandler: () => {
        this.movieList.removeMessage();
        this.showMoreMovies();
        onMovieMoreButtonClick();
      },
    });

    this.$element = this.generateMovieListBox({
      children: [$h2, this.movieList.$element, this.button.$element],
    });
  }

  reRender(movieList: Movie[]) {
    this.movieList.reRender(movieList);
    this.button.toggleDisabled();
  }

  renderMessage(message: string) {
    this.movieList.renderMessage(message);
  }

  showMoreMovies() {
    this.button.toggleDisabled();
    this.movieList.appendSkeleton();
  }

  removeMovieMoreButton() {
    this.button.removeMovieMoreButton();
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
