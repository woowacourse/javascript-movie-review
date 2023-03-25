import Movie from "./domain/Movie";

import Header from "./components/Header";
import MovieView from "./components/MovieView";

class App {
  $main = document.createElement("main");

  movie;

  header;

  movieView;

  constructor($target) {
    this.init($target);

    this.render($target);

    this.bindEvent($target);
  }

  init($target) {
    this.movie = new Movie();

    this.header = new Header($target);
    this.movieView = new MovieView(this.$main);

    this.renderPopularMovies(1);
  }

  render($target) {
    $target.insertAdjacentElement("beforeend", this.$main);
  }

  bindEvent($target) {
    $target.addEventListener("click", this.onClickHandler.bind(this));
    $target.addEventListener("submit", this.onSubmitHandler.bind(this));
  }

  onClickHandler(e) {
    const { target } = e;

    if (target.id !== "logo") return;

    this.renderPopularMovies(1);
  }

  async renderPopularMovies(page) {
    this.movieView.appearSkeleton();

    const { isError, data } = await this.movie.getPopularMovies(page);
    if (isError) return;

    this.movieView.updateMovieListTitle();
    this.movieView.addMovies(data);
  }

  onSubmitHandler(e) {
    e.preventDefault();

    this.movieView.appearSkeleton();

    const query = e.target[0].value;

    this.renderFoundMovies(query, 1);
  }

  async renderFoundMovies(query, page) {
    const { isError, data } = await this.movie.getFoundMovies(query, page);
    if (isError) return;

    this.movieView.updateMovieListTitle(query);
    this.movieView.addMovies(data);
  }
}

export default App;
