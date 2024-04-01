import { Movie } from "./MovieListBox/MovieList/MovieItem";
import MovieListBox from "./MovieListBox/MovieListBox";
import createElement from "../utils/createElement";
import generateMain from "../common/generateMain";

interface MovieMainProps {
  title: string;
  getMoreMovies: () => void;
}

class MovieMain {
  $element;
  private movieListBox;

  constructor({ title, getMoreMovies }: MovieMainProps) {
    this.movieListBox = new MovieListBox({
      title,
      getMoreMovies,
    });
    const $modalSection = createElement({
      tagName: "section",
      attribute: { class: "modal-section" },
    });
    this.$element = generateMain({
      children: [this.movieListBox.$element, $modalSection],
    });
  }

  changeMovieListBox({ title, getMoreMovies }: MovieMainProps) {
    this.movieListBox = new MovieListBox({
      title,
      getMoreMovies,
    });

    this.replace(this.movieListBox.$element);
  }

  reRender(movieList: Movie[]) {
    this.movieListBox.reRender(movieList);
  }

  removeMovieMoreObserver() {
    this.movieListBox.removeMovieMoreButton();
  }

  renderMessage(message: string) {
    this.movieListBox.renderMessage(message);
  }

  private replace(movieListBoxElement: HTMLElement) {
    const $modalSection = createElement({
      tagName: "section",
      attribute: { class: "modal-section" },
    });
    this.$element.replaceChildren(movieListBoxElement, $modalSection);
  }
}

export default MovieMain;
