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

    this.category = "popular";

    this.movieListTitle = new MovieListTitle(this.$itemView);
    this.movieList = new MovieList(this.$itemView);
  }

  render($target) {
    $target.insertAdjacentElement("afterbegin", this.$itemView);
  }

  appearSkeleton() {
    this.movieList.appearSkeleton();
  }

  updateMovieListTitle(query) {
    if (query) {
      this.movieListTitle.changeInnerText(`"${query}" 검색 결과`);

      return;
    }

    this.movieListTitle.changeInnerText("지금 인기 있는 영화");
  }

  addMovies({ page, results: movies, total_pages }) {
    if (page === 1) {
      this.movieList.switchMovies(movies);

      return;
    }

    this.movieList.insertMovies(movies);
  }
}

export default MovieView;
