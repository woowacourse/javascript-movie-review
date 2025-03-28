import bannerTemplate from "./bannerTemplate";
import SkeletonBanner from "../Skeleton/SkeletonBanner";
import modalContentTemplate from "../Modal/modalContentTemplate";
import Modal from "../Modal";
import Store, { State } from "../../store/store";
import { Movie } from "../../../types/movieList";
import { renderTemplate } from "../../utils/templateUtils";

const API_BANNER_URL = import.meta.env.VITE_TMDB_API_BANNER_URL as string;

class Banner {
  private $container: HTMLElement;
  private store: Store;
  private $modal: Modal;

  constructor($container: HTMLElement, store: Store) {
    this.$container = $container;
    this.store = store;
    this.$modal = new Modal(this.store, modalContentTemplate);
    this.store.subscribe(this.render.bind(this));
    this.render(this.store.getState());
  }

  private render(state: State): void {
    if (state.query) {
      renderTemplate(this.$container, "");
      return;
    }

    if (state.movies.length) {
      const movie: Movie = state.movies[0];
      renderTemplate(this.$container, bannerTemplate(movie));

      const $banner = this.$container.querySelector("#banner") as HTMLElement;
      if ($banner && movie.backdrop_path) {
        $banner.style.backgroundImage = `url(${API_BANNER_URL}${movie.backdrop_path})`;
      }

      const $detailButton = this.$container.querySelector(
        "#detail-button"
      ) as HTMLElement;
      if ($detailButton) {
        $detailButton.addEventListener("click", () =>
          this.$modal.open(movie.id.toString())
        );
      }
      return;
    }

    renderTemplate(this.$container, SkeletonBanner());
  }
}

export default Banner;
