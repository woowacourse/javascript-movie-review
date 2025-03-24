// components/BannerComponent.js
import store from "../../store/store.ts";
import bannerTemplate from "./bannerTemplate.js";
import SkeletonBanner from "../Skeleton/SkeletonBanner.js";

class Banner {
  constructor($container) {
    this.$container = $container;
    store.subscribe(this.render.bind(this));
    this.render(store.getState());
  }

  render(state) {
    if (!state.query) {
      if (state.movies.length) {
        this.$container.innerHTML = bannerTemplate(state.movies[0]);
        const $banner = this.$container.querySelector("#banner");
        if ($banner) {
          $banner.style.backgroundImage = `url(${
            import.meta.env.VITE_TMDB_API_BANNER_URL
          }${state.movies[0].backdrop_path})`;
        }
      } else {
        this.$container.innerHTML = SkeletonBanner();
      }
    } else {
      this.$container.innerHTML = "";
    }
  }
}

export default Banner;
