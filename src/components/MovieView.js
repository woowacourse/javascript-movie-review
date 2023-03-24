import MovieList from "./MovieList";
import MovieListTitle from "./MovieListTitle";

class MovieView {
  $itemView = document.createElement("section");
  movieListTitle;
  movieList;

  constructor($target) {
    this.init($target);

    this.render($target);
  }

  init($target) {
    this.$itemView.classList = "item-view";

    // this.movieListTitle = new MovieListTitle($target);
    // this.movieList = new MovieList($target);
    this.movieListTitle = new MovieListTitle($target);
    this.movieList = new MovieList($target);
  }

  render($target) {
    // $target === $main
    $target.insertAdjacentElement("afterbegin", this.$itemView);
    console.log($target);
  }
}

export default MovieView;
