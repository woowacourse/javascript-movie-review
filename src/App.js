import Movie from "./domain/Movie";

import Header from "./components/Header";
import MovieView from "./components/MovieView";

const pageCounter = (firstPage) => {
  let page = firstPage;
  return () => (page += 1);
};

class App {
  $main = document.createElement("main");

  movie;

  header;

  movieView;

  page;

  loading;

  constructor($target) {
    this.init($target);

    this.render($target);

    this.bindEvent($target);
  }

  init($target) {
    this.movie = new Movie();

    this.header = new Header($target);
    this.movieView = new MovieView(this.$main);

    this.page = pageCounter(0);
    this.loading = true;

    this.renderPopularMovies(this.page());
  }

  render($target) {
    $target.insertAdjacentElement("beforeend", this.$main);
  }

  bindEvent($target) {
    $target.addEventListener("click", this.onClickHandler.bind(this));
    $target.addEventListener("submit", this.onSubmitHandler.bind(this));

    window.addEventListener("scroll", this.onScrollHandler.bind(this));
  }

  onScrollHandler() {
    if (this.loading) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight < Math.round(scrollHeight - scrollTop)) return;

    this.loading = true;

    const query = this.header.getQuery();
    if (query) {
      renderFoundMovies(query, this.page());

      return;
    }

    this.renderPopularMovies(this.page());
  }

  onClickHandler({ target }) {
    if (target.id === "logo") {
      if (this.loading) return;

      this.page = pageCounter(0);

      this.loading = true;
      this.renderPopularMovies(this.page());
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (this.loading) return;

    const query = e.target[0].value;
    if (!query) return alert("검색어를 입력 하세요");

    this.page = pageCounter(0);

    this.loading = true;
    this.renderFoundMovies(query, this.page());
  }

  async renderPopularMovies(page) {
    this.movieView.appearSkeleton();

    const { isError, data } = await this.movie.getPopularMovies(page);
    if (isError) return;

    this.movieView.updateMovieListTitle();
    this.movieView.addMovies(data);

    this.loading = false;
  }

  async renderFoundMovies(query, page) {
    this.movieView.appearSkeleton();

    const { isError, data } = await this.movie.getFoundMovies(query, page);
    if (isError) return;

    this.movieView.updateMovieListTitle(query);
    this.movieView.addMovies(data);

    this.loading = false;
  }
}

export default App;
