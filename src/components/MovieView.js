import MovieList from "./MovieList";
import MovieListTitle from "./MovieListTitle";

class MovieView {
  $itemView = document.createElement("section");
  movieListTitle;
  movieList;

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$itemView.classList = "item-view";

    this.movieListTitle = new MovieListTitle(this.$itemView);
    this.movieList = new MovieList(this.$itemView);
  }

  render($target) {
    // $target === $main
    $target.insertAdjacentElement("afterbegin", this.$itemView);
  }
}

export default MovieView;
