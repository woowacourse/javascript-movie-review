import { Movie } from "./MovieList/MovieItem";
import MovieList from "./MovieList/MovieList";
import MovieMoreButton from "./MovieList/MovieMoreButton";
import createElement from "../../utils/createElement";

class MovieListBox {
  $element;
  movieList;
  button;

  constructor({
    onMovieMoreButtonClick,
  }: {
    onMovieMoreButtonClick: () => void;
  }) {
    const $h2 = createElement({
      tagName: "h2",
      children: ["지금 인기 있는 영화"],
    });

    this.movieList = new MovieList();
    this.button = new MovieMoreButton({
      onClickHandler: () => {
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

  showMoreMovies() {
    this.button.toggleDisabled();
    this.movieList.appendSkeleton();
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
