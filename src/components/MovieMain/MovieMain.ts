import { Movie } from "./MovieListBox/MovieList/MovieItem";
import MovieListBox from "./MovieListBox/MovieListBox";
import generateMain from "../common/generateMain";

class MovieMain {
  $element;
  private movieListBox;

  constructor({
    onMovieMoreButtonClick,
  }: {
    onMovieMoreButtonClick: () => void;
  }) {
    this.movieListBox = new MovieListBox({
      onMovieMoreButtonClick,
    });
    this.$element = generateMain({ children: [this.movieListBox.$element] });
  }

  reRender(movieList: Movie[]) {
    this.movieListBox.reRender(movieList);
  }
}

export default MovieMain;
