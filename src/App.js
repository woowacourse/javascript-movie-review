import TitleSearchBar from "./UI/TitleSearchBar/TitleSearchBar";
import Thumbnail from "./UI/Thumbnail/Thumbnail";
import MovieListSection from "./UI/MovieListSection/MovieListSection";
import Button from "./UI/Button/Button";
import Footer from "./UI/Footer/Footer";
import { getPopularityMovie } from "./Domain/getPopularityMovie";
import { searchMovie } from "./Domain/searchMovie";

class App {
  #movies;
  #isLoading;
  #page;
  #searchKeyword;
  #searchPage;
  #mode;
  #show;

  constructor() {
    this.#movies = [];
    this.#isLoading = false;
    this.#page = 1;
    this.#searchPage = 1;
    this.#mode = "popular";
    this.#show = true;
  }

  async init() {
    const { results } = await this.getMoviesResults(); // 로딩이 t -> f

    this.setMovies([...this.#movies, ...results]); // 새로운 영화목록 반영 UI 렌더
  }

  async getMoviesResults() {
    this.setIsLoading(true);

    const data = await getPopularityMovie(this.#page);

    if (data !== null) {
      this.setIsLoading(false);

      const results = data.results.map((movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        vote_average: movie.vote_average.toFixed(1),
      }));
      return { results, totalPage: data.total_pages };
    }

    return { results: [] };
  }

  async getSearchMovies() {
    this.setIsLoading(true);

    const data = await searchMovie(this.#searchPage, this.#searchKeyword);

    if (data !== null) {
      this.setIsLoading(false);

      const results = data.results.map((movie) => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        vote_average: movie.vote_average.toFixed(1),
      }));
      return { results, totalPage: data.total_pages };
    }
    return { results: [] };
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

  setSearchKeyword = async (searchKeyword) => {
    this.#searchKeyword = searchKeyword;

    const { results, totalPage } = await this.getSearchMovies(); // t-> f

    if (totalPage === this.#searchPage) {
      this.setShow(false);
    }

    this.setMovies(results);
  };

  setMode = (mode) => {
    this.#mode = mode;
    this.render();
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const $input = document.querySelector(".search-input");

    this.#searchPage = 1;
    this.setShow(true);

    await this.setSearchKeyword($input.value);
    this.setMode("search");
  };

  render() {
    const body = document.querySelector("body");
    body.innerHTML = "";

    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    const $header = new TitleSearchBar(this.onSubmit).render();

    const $container = document.createElement("div");
    $container.classList.add("container");
    const $main = document.createElement("main");

    const $thumbnail = new Thumbnail(this.#movies[0]).render();

    const $movieListSection = new MovieListSection(
      this.#searchKeyword,
      this.#movies,
      this.#isLoading
    ).render();

    body.appendChild($wrap);

    $wrap.append($thumbnail);
    $wrap.append($header);

    const $moreButton = new Button().render();

    $main.appendChild($movieListSection);
    if (this.#show) {
      $main.appendChild($moreButton);
      $moreButton.addEventListener("click", this.handleButtonClick);
    }
    $container.appendChild($main);
    $wrap.appendChild($container);

    const $footer = new Footer().render();
    body.appendChild($footer);
  }

  handleButtonClick = async () => {
    if (this.#mode === "popular") {
      this.#page += 1;
      const { results, totalPage } = await this.getMoviesResults(); // t-> f
      this.setMovies([...this.#movies, ...results]); //

      if (totalPage === this.#page) {
        this.setShow(false);
      }
      return;
    }

    this.#searchPage += 1;
    const { results, totalPage } = await this.getSearchMovies(); // t-> f

    if (totalPage <= this.#searchPage) {
      this.setShow(false);
    }

    this.setMovies([...this.#movies, ...results]); //
  };
}

export default App;
