import TitleSearchBar from "./UI/Header/TitleSearchBar/TitleSearchBar";
import Thumbnail from "./UI/Header/Thumbnail/Thumbnail";
import Button from "./UI/MoviesContainer/Button/Button";
import Footer from "./UI/Layout/Footer/Footer";
import { getPopularityMovie } from "./Domain/getPopularityMovie";
import { searchMovie } from "./Domain/searchMovie";
import MovieListSection from "./UI/MoviesContainer/MovieListSection/MovieListSection";
import { IMG_PATH } from "./constants/constants";

class App {
  #movies;
  #isLoading;
  #page;
  #searchKeyword;
  #searchPage;
  #show;

  constructor() {
    this.#movies = [];
    this.#isLoading = true;
    this.#page = 1;
    this.#searchPage = 1;
    this.#show = true;
  }

  async init() {
    const body = document.querySelector("body");
    body.innerHTML = "로딩 중";
    const { results } = await this.getMoviesResults();

    if (results === null) {
      this.setMovies(null);
      return;
    }
    this.setMovies([...this.#movies, ...results]);
    this.setIsLoading(false);
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
  }

  setSearchKeyword = async (searchKeyword) => {
    this.#searchKeyword = searchKeyword;

    const { results, totalPage } = await this.getSearchMovies();

    if (totalPage === this.#searchPage) {
      this.setShow(false);
    }

    this.setMovies(results);
  };

  async getMoviesResults() {
    return this.getMovies(getPopularityMovie, [this.#page]);
  }

  async getSearchMovies() {
    return this.getMovies(searchMovie, [this.#searchPage, this.#searchKeyword]);
  }

  async getMovies(apiCall, params) {
    this.setIsLoading(true);

    const data = await apiCall(...params);

    if (data !== null) {
      this.setIsLoading(false);

      const results = data.results.map((movie) => ({
        ...movie,
        poster_path: `${IMG_PATH}/w300${movie.poster_path}`,
        vote_average: movie.vote_average.toFixed(1),
        backdrop_path: `${IMG_PATH}/w1280${movie.backdrop_path}`,
      }));

      return { results, totalPage: data.total_pages };
    }

    return { results: null };
  }

  render() {
    const body = document.querySelector("body");
    body.innerHTML = "";

    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    const $header = new TitleSearchBar(this.onSubmit).render();

    if (this.hasMovies()) {
      const $thumbnail = new Thumbnail(this.#movies[0]).render();
      $wrap.append($thumbnail);
    }

    const $container = document.createElement("div");
    $container.classList.add("container");

    const $main = document.createElement("main");

    const $movieListSection = new MovieListSection(
      this.#searchKeyword,
      this.#movies,
      this.#isLoading
    ).render();

    body.appendChild($wrap);
    $wrap.append($header);
    $wrap.appendChild($container);
    $container.appendChild($main);
    $main.appendChild($movieListSection);

    if (this.hasMovies() && this.#show) {
      const $moreButton = new Button().render();

      $main.appendChild($moreButton);
      $moreButton.addEventListener("click", this.handleButtonClick);
    }

    const $footer = new Footer().render();
    body.appendChild($footer);
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const $input = document.querySelector(".search-input");

    this.#searchPage = 1;
    this.setShow(true);

    await this.setSearchKeyword($input.value);
  };

  handleButtonClick = async () => {
    if (this.#searchKeyword) {
      this.#searchPage += 1;
      const { results, totalPage } = await this.getSearchMovies();
      if (totalPage <= this.#searchPage) this.setShow(false);
    } else {
      this.#page += 1;
      const { results, totalPage } = await this.getMoviesResults();
      if (totalPage === this.#page) this.setShow(false);
    }
    this.setMovies([...this.#movies, ...results]);
  };

  hasMovies() {
    return this.#movies !== null && this.#movies.length !== 0;
  }
}

export default App;
