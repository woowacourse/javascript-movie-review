import MovieListSection from "../MovieListSection/MovieListSection";
import Button from "../Button/Button";
import Thumbnail from "../../Header/Thumbnail/Thumbnail";
import { getPopularityMovie } from "../../../Domain/getPopularityMovie";
import { searchMovie } from "../../../Domain/searchMovie";

class MoviesCotainer {
  #movies;
  #isLoading;
  #searchKeyword;
  #page;
  #searchPage;
  #show;
  #mode;

  constructor(searchKeyword, mode, $target) {
    this.#movies = [];
    this.#isLoading = false;
    this.#page = 1;
    this.#searchPage = 1;
    this.#show = true;

    this.#searchKeyword = searchKeyword;
    this.#mode = mode;
    this.$target = $target;
  }

  async init() {
    if (this.#searchKeyword !== "") {
      const { results, totalPage } = await this.getSearchMovies();

      if (results === null) {
        this.setMovies(null);
        return;
      }

      this.setMovies([...this.#movies, ...results]);
      return;
    }

    const { results, totalPage } = await this.getMoviesResults();

    if (results === null) {
      this.setMovies(null);
      return;
    }

    if (totalPage === this.#page) {
      this.setShow(false);
    }
    this.setMovies([...this.#movies, ...results]);
  }

  setShow(show) {
    this.#show = show;
    this.render();
  }

  setMovies(newMovies) {
    this.#movies = newMovies;
    this.render();
  }

  setIsLoading(isLoading) {
    this.#isLoading = isLoading;
    this.render();
  }

  async getMovies(apiCall, params) {
    this.setIsLoading(true);

    const data = await apiCall(...params);

    if (data !== null) {
      this.setIsLoading(false);

      const results = data.results.map((movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        vote_average: movie.vote_average.toFixed(1),
        backdrop_path: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
      }));

      if (data.total_pages === this.#searchPage) {
        this.setShow(false);
      }

      return { results, totalPage: data.total_pages };
    }

    return { results: null };
  }

  async getSearchMovies() {
    return this.getMovies(searchMovie, [this.#searchPage, this.#searchKeyword]);
  }

  async getMoviesResults() {
    return this.getMovies(getPopularityMovie, [this.#page]);
  }

  render() {
    this.$target.innerHTML = "";

    const $container = document.createElement("div");
    $container.classList.add("container");

    const $main = document.createElement("main");

    if (this.#searchKeyword === "") {
      new Thumbnail(this.#movies[0], this.$target).render();
    }

    const $div = document.createElement("div");
    new MovieListSection(
      this.#searchKeyword,
      this.#movies,
      this.#isLoading,
      $div,
      this.handleButtonClick
    ).render();

    $container.appendChild($main);
    $main.appendChild($div);

    if (this.hasMovies() && this.#show) {
      new Button($main, this.handleButtonClick).render();
    }

    this.$target.appendChild($container);
  }

  handleButtonClick = async () => {
    if (this.#mode === "popular") {
      this.#page += 1;
      const { results, totalPage } = await this.getMoviesResults();

      this.setMovies([...this.#movies, ...results]);
      if (totalPage === this.#page) {
        this.setShow(false);
      }
      return;
    }
    this.#searchPage += 1;
    const { results, totalPage } = await this.getSearchMovies();

    this.setMovies([...this.#movies, ...results]);
  };

  hasMovies() {
    return this.#movies !== null && this.#movies.length !== 0;
  }
}

export default MoviesCotainer;
