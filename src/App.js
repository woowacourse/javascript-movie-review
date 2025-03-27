import { HeaderMount, HeaderRender } from "./components/Header/index.js";
import { FooterRender } from "./components/Footer/index.js";
import { BannerRender } from "./components/Banner/index.js";
import { SkeletonBannerRender } from "./components/Skeleton/SkeletonBanner.js";
import { MovieListRender } from "./components/MovieList/index.js";
import { fetchPopularMovies } from "./APIs/movieAPI.ts";
import { MoreButtonMount } from "./components/MoreButton/MoreButton.js";
import store from "./store/store.ts";

class App {
  constructor($target) {
    this.$target = $target;

    store.subscribe(() => this.render());
    if (store.getState().movies.length === 0) {
      this.loadPopularMovies();
    }
  }

  async loadPopularMovies() {
    const movies = await fetchPopularMovies();
    store.setState({ movies });
  }

  render() {
    const state = store.getState();
    this.$target.innerHTML = `
      <div id="wrap">
        ${HeaderRender()}
        ${
          !state.query
            ? state.movies.length
              ? BannerRender(state.movies[0])
              : SkeletonBannerRender()
            : ""
        }
        <div class="container">
          ${MovieListRender({
            movies: state.movies,
            query: state.query,
            searchedMoviesLength: state.searchedMoviesLength,
          })}
        </div>
        ${FooterRender()}
      </div>
    `;

    this.mount(state);
  }

  mount(state) {
    HeaderMount();
    MoreButtonMount();

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
        } else {
          $header.classList.remove("scrolled");
        }
      }
    });
  }
}

export default App;
