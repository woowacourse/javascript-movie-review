import { HeaderMount, HeaderRender } from "./components/Header/index.js";
import { FooterRender } from "./components/Footer/index.js";
import { BannerMount, BannerRender } from "./components/Banner/index.js";
import { SkeletonBannerRender } from "./components/Skeleton/SkeletonBanner.js";
import store from "./store/store.ts";
import * as MovieModule from "./domains/movie/MovieModule.js";
import { syncSearchStateWithURL } from "./domains/movie/urlStateSync.js";

class App {
  constructor($target) {
    this.$target = $target;
    store.subscribe(() => this.render());
    this.toastTimeout = null;
  }

  async initialize() {
    await syncSearchStateWithURL();
    this.render();
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
          ${MovieModule.renderMovieDomain()}
        </div>
        ${FooterRender()}
      </div>
      ${
        state.errorMessage
          ? `<div class="toast">${state.errorMessage}</div>`
          : ""
      }
    `;
    this.mount();

    if (state.errorMessage && !this.toastTimeout) {
      this.toastTimeout = setTimeout(() => {
        store.setErrorMessage(state.errorMessage);
        this.toastTimeout = null;
      }, 3000);
    }
  }

  mount() {
    HeaderMount();
    MovieModule.mountMovieDomain();
    BannerMount();

    const state = store.getState();
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
