import MovieListSection from "../MovieListSection/MovieListSection";
import Thumbnail from "../../Header/Thumbnail/Thumbnail";
import Modal from "../../MovieModal/Modal/Modal";
import { getPopularityMovie } from "../../../Domain/getPopularityMovie";
import { searchMovie } from "../../../Domain/searchMovie";

class MoviesCotainer {
  #movies;
  #isLoading;
  #searchKeyword;
  #page;
  #searchPage;
  #mode;
  #lastPage;
  #movieId;

  constructor(searchKeyword, mode, $target) {
    this.#movies = [];
    this.#isLoading = false;
    this.#page = 1;
    this.#searchPage = 1;

    this.#searchKeyword = searchKeyword;
    this.#mode = mode;
    this.$target = $target;
    this.#lastPage = 0;

    this.renderModal();
  }

  async init() {
    if (this.#searchKeyword !== "") {
      const { results, totalPage } = await this.getSearchMovies();

      if (results === null) {
        this.setMovies(null);
        return;
      }

      this.setLastPage(totalPage);
      this.setMovies([...this.#movies, ...results]);
      return;
    }

    const { results, totalPage } = await this.getMoviesResults();

    if (results === null) {
      this.setMovies(null);
      return;
    }

    this.setLastPage(totalPage);
    this.setMovies([...this.#movies, ...results]);
  }

  renderModal() {
    const $body = document.querySelector("body");
    const $modalContainer = document.createElement("div");
    $modalContainer.classList.add("modal-background-container");

    $body.appendChild($modalContainer);

    this.modal = new Modal($modalContainer, this.setMovieId);
  }

  setLastPage(lastPage) {
    this.#lastPage = lastPage;
    this.render();
  }

  setMovieId = (movieId) => {
    this.#movieId = movieId;
    this.render();
  };

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

    if (this.#searchKeyword === "") {
      new Thumbnail(this.#movies[0], this.$target, this.setMovieId).render();
    }
    if (this.#searchKeyword !== "") $container.classList.add("margin-top");

    const $main = document.createElement("main");

    const $div = document.createElement("div");
    new MovieListSection(
      this.#searchKeyword,
      this.#movies,
      this.#isLoading,
      $div,
      this.loadMoreMovies,
      this.isLastPage,
      this.setMovieId
    ).render();

    $container.appendChild($main);
    $main.appendChild($div);

    this.$target.appendChild($container);
    this.modal.init(this.#movieId);
  }

  isLastPage = () => {
    if (this.#mode === "popular") {
      return this.#lastPage === this.#page;
    }
    return this.#lastPage === this.#searchPage;
  };

  loadMoreMovies = async () => {
    if (this.#mode === "popular") {
      this.#page += 1;
      const { results, totalPage } = await this.getMoviesResults();
      this.setLastPage(totalPage);

      this.setMovies([...this.#movies, ...results]);

      return;
    }
    this.#searchPage += 1;
    const { results, totalPage } = await this.getSearchMovies();
    this.setLastPage(totalPage);

    if (totalPage < this.#searchPage) {
      return;
    }
    this.setMovies([...this.#movies, ...results]);
  };
}

export default MoviesCotainer;
