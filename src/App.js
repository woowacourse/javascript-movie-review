// App.js
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Banner from "./components/Banner/index.js";
import MovieList from "./components/MovieList/index.js";
import { fetchPopularMovies, fetchSearchedMovies } from "./APIs/movieAPI.ts";
import store from "./store/store.ts";
import { attachMoreButtonEvent } from "./components/MoreButton.js";

class App {
  constructor($target) {
    this.$target = $target;

    store.subscribe(() => this.render());
    if (store.getState().movies.length === 0) {
      this.loadPopularMovies();
    }
    this.render();
    this.mount();
  }

  async loadPopularMovies() {
    const movies = await fetchPopularMovies();
    store.setState({ movies });

    if (movies.length) {
      const $banner = document.querySelector("#banner");
      if ($banner) {
        $banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`;
      }
    }
  }

  render() {
    const state = store.getState();
    this.$target.innerHTML = `
      <div id="wrap">
        ${Header()}
        ${!state.query && state.movies.length ? Banner(state.movies[0]) : ""}
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

    attachMoreButtonEvent();
  }

  mount() {
    window.addEventListener("scroll", () => {
      const $header = document.querySelector("#header");
      if ($header) {
        if (window.scrollY > 0) {
          $header.classList.add("scrolled");
        } else {
          $header.classList.remove("scrolled");
        }
      }
    });
  }
}

export default App;
