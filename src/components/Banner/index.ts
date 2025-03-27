import bannerTemplate from "./bannerTemplate";
import SkeletonBanner from "../Skeleton/SkeletonBanner";
import modalContentTemplate from "../Modal/modalContentTemplate";
import Modal from "../Modal/index";
import Store, { State } from "../../store/store";
import { Movie } from "../../../types/movieList";

class Banner {
  private $container: HTMLElement;
  private store: Store;
  private modal: Modal;
  private detailHandler: (movidId: string) => void;

  constructor($container: HTMLElement, store: Store) {
    this.$container = $container;
    this.store = store;
    this.modal = new Modal(this.store, modalContentTemplate);
    // 미리 바인딩된 핸들러를 생성합니다.
    this.detailHandler = this.handleDetailButtonClick.bind(this);
    this.store.subscribe(this.render.bind(this));
    this.render(this.store.getState());
  }

  private render(state: State): void {
    if (!state.query) {
      if (state.movies.length) {
        const movie: Movie = state.movies[0];
        this.$container.innerHTML = bannerTemplate(movie);
        const $banner = this.$container.querySelector("#banner") as HTMLElement;
        if ($banner && movie.backdrop_path) {
          $banner.style.backgroundImage = `url(${
            import.meta.env.VITE_TMDB_API_BANNER_URL
          }${movie.backdrop_path})`;
        }
        const $detailButton = this.$container.querySelector(
          ".detail"
        ) as HTMLElement;
        if ($detailButton) {
          // 기존 이벤트 리스너 제거를 위해 노드를 클론하여 교체한 후,
          // detailHandler를 등록합니다.
          const newDetailButton = $detailButton.cloneNode(true) as HTMLElement;
          newDetailButton.addEventListener(
            "click",
            this.detailHandler.bind(this, movie.id.toString())
          );
          $detailButton.parentElement?.replaceChild(
            newDetailButton,
            $detailButton
          );
        }
      } else {
        this.$container.innerHTML = SkeletonBanner();
      }
    } else {
      this.$container.innerHTML = "";
    }
  }

  private handleDetailButtonClick(movieId: string): void {
    this.modal.open(movieId);
  }
}

export default Banner;
