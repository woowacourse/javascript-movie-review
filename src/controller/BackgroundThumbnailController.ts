import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import { MovieItemType } from "../types/movieResultType";

class BackgroundThumbnailController {
  mainElement;
  openModal;
  backgroundElement!: HTMLElement;

  constructor({
    mainElement,
    openModal,
  }: {
    mainElement: HTMLElement;
    openModal: (text: string) => void;
  }) {
    this.mainElement = mainElement;
    this.openModal = openModal;
  }

  async render(movieItem: MovieItemType) {
    await this.renderMovieList(movieItem);
    this.bindEvents();
  }

  bindEvents() {
    const detailButtonElement = this.backgroundElement.querySelector(
      "button.detail",
    ) as HTMLButtonElement;
    detailButtonElement.addEventListener("click", () =>
      this.openModal("아직 지원되지 않은 기능입니다."),
    );
  }

  async renderMovieList(movieItem: MovieItemType) {
    this.backgroundElement = BackgroundThumbnailSection(movieItem);
    this.mainElement?.insertAdjacentElement(
      "beforebegin",
      this.backgroundElement,
    );
  }
}

export default BackgroundThumbnailController;
