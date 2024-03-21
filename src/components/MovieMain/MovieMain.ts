import { Movie } from "./MovieListBox/MovieList/MovieItem";
import MovieListBox from "./MovieListBox/MovieListBox";
import generateMain from "../common/generateMain";

interface MovieMainProps {
  title: string;
  onMovieMoreButtonClick: () => void;
}

class MovieMain {
  $element;
  private movieListBox;

  constructor({ title, onMovieMoreButtonClick }: MovieMainProps) {
    this.movieListBox = new MovieListBox({
      title,
      onMovieMoreButtonClick,
    });
    this.$element = generateMain({ children: [this.movieListBox.$element] });
  }

  changeMovieListBox({ title, onMovieMoreButtonClick }: MovieMainProps) {
    this.movieListBox = new MovieListBox({
      title,
      onMovieMoreButtonClick,
    });

    this.replace(this.movieListBox.$element);
  }

  reRender(movieList: Movie[]) {
    this.movieListBox.reRender(movieList);
  }

  removeMovieMoreButton() {
    this.movieListBox.removeMovieMoreButton();
  }

  renderMessage(message: string) {
    this.movieListBox.renderMessage(message);
  }

  private replace(movieListBoxElement: HTMLElement) {
    this.$element.replaceChildren(movieListBoxElement);
  }
}

export default MovieMain;
