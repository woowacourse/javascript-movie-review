import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Banner from "./components/Banner/index.js";
import MovieList from "./components/MovieList/index.js";
import { fetchPopularMovies, fetchSearchedMovies } from "./APIs/movieAPI.ts";
import Store from "./store/store.ts";
import { MOVIE_COUNT } from "./constants/config.js";

class App {
  #$target;
  #store;

  constructor($target) {
    this.#$target = $target;
    this.#store = new Store({
      movies: [],
      query: "",
      searchedMoviesLength: 0,
      loading: false,
    });

    const $headerTemplate = document.createElement("template");
    $headerTemplate.innerHTML = Header(this.#store);
    this.#$target.appendChild($headerTemplate.content);

    this.bannerContainer = document.createElement("section");
    this.bannerContainer.id = "banner-container";
    this.#$target.appendChild(this.bannerContainer);

    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add("container");
    this.#$target.appendChild(this.mainContainer);

    const $footerTemplate = document.createElement("template");
    $footerTemplate.innerHTML = Footer();
    this.#$target.appendChild($footerTemplate.content);

    this.bannerComponent = new Banner(this.bannerContainer, this.#store);
    this.movieListComponent = new MovieList(this.mainContainer, this.#store);

    if (this.#store.getState().movies.length === 0) {
      this.loadPopularMovies();
    }

    window.addEventListener("scroll", async () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 180
      ) {
        const state = this.#store.getState();
        const currentPage =
          Math.floor(state.movies.length / MOVIE_COUNT.UNIT) + 1;

        this.#store.setState({ loading: true });

        if (
          !state.query &&
          state.movies.length < MOVIE_COUNT.MAX_PAGE * MOVIE_COUNT.UNIT
        ) {
          const newMovies = await fetchPopularMovies(
            (error) => alert(error.message),
            currentPage
          );
          this.#store.setState({ movies: [...state.movies, ...newMovies] });
          return;
        }

        if (state.movies.length >= state.searchedMoviesLength) return;

        const newMoviesData = await fetchSearchedMovies(
          state.query,
          (error) => alert(error.message),
          currentPage
        );

        this.#store.setState({
          movies: [...state.movies, ...newMoviesData.results],
          loading: false,
        });
      }
    });
  }

  async loadPopularMovies() {
    this.#store.setState({ loading: true });
    const movies = await fetchPopularMovies((error) => alert(error.message));
    this.#store.setState({ movies, loading: false });
  }
}

export default App;
