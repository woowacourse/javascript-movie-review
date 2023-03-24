import MovieList from "./MovieList";
import MovieListTitle from "./MovieListTitle";

class MovieView {
  $itemView = document.createElement("section");

  movieListTitle;

  movieList;

  category;

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$itemView.classList = "item-view";

    this.category = "popular";

    this.movieListTitle = new MovieListTitle(this.$itemView);
    this.movieList = new MovieList(this.$itemView);
  }

  render($target) {
    $target.insertAdjacentElement("afterbegin", this.$itemView);
  }
}

export default MovieView;
