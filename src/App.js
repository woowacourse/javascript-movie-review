import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Banner from "./components/Banner/index.js";
import SkeletonBanner from "./components/Skeleton/SkeletonBanner.js";
import MovieList from "./components/MovieList/index.js";
import { fetchPopularMovies } from "./APIs/movieAPI.ts";
import store from "./store/store.ts";
import { attachMoreButtonEvent } from "./components/MoreButton/MoreButton.js";

class App {
  constructor($target) {
    this.$target = $target;

    store.subscribe(() => this.render());
    if (store.getState().movies.length === 0) {
      this.loadPopularMovies();
    }
    this.render();
  }

  async loadPopularMovies() {
    const movies = await fetchPopularMovies((error) => alert(error.message));
    store.setState({ movies });
  }

  render() {
    const state = store.getState();
    this.$target.innerHTML = /* html */ `
      <div id="wrap">
        ${Header()}
        ${
          !state.query
            ? state.movies.length
              ? Banner(state.movies[0])
              : SkeletonBanner()
            : ""
        }
        <div class="container">
          ${MovieList({
            movies: state.movies,
            query: state.query,
            searchedMoviesLength: state.searchedMoviesLength,
          })}
        </div>
        ${Footer()}
      </div>
    `;

    this.mount(state);
  }

  mount(state) {
    attachMoreButtonEvent();

    const $banner = document.querySelector("#banner");
    if (state.movies.length && $banner) {
      $banner.style.backgroundImage = `url(${
        import.meta.env.VITE_TMDB_API_BANNER_URL
      }${state.movies[0].backdrop_path})`;
    }

    window.addEventListener("scroll", () => {
      const $header = document.querySelector("#header");
      if ($header) {
        if (window.scrollY > 0) {
          $header.classList.add("scrolled");
          return;
        }
        $header.classList.remove("scrolled");
      }
    });
  }
}

export default App;
