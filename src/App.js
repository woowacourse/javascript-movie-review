import Header from "./components/Header";
import MovieView from "./components/MovieView";
import Movie from "./domain/Movie";

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
  }

  render($target) {
    $target.insertAdjacentElement("beforeend", this.$main);
  }

  bindEvent($target) {
    $target.addEventListener(
      "click",
      this.renderPopularMoviesIfLogoClicked.bind(this)
    );
    $target.addEventListener(
      "submit",
      this.renderSearchedMoviesByQuery.bind(this)
    );
  }

  async renderPopularMoviesIfLogoClicked(e) {
    const { target } = e;

    if (target.id !== "logo") return;

    // const { isError, data } = await this.movie.getPopularMovies(1);
    const { isError, data } = await this.movie.findMovies("코난", 1);
    if (isError) return;

    this.movieView.updateMovieListTitle();
    this.movieView.addMovies(data);
  }

  renderSearchedMoviesByQuery(e) {
    e.preventDefault();

    this.movieView.updateMovieListTitle();
    this.movieView.addMovies(data);
  }
}

export default App;
