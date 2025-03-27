import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import { MovieItemType } from "../types/movieResultType";

class BackgroundThumbnailController {
  mainElement;
  openDetailModal;
  backgroundElement!: HTMLElement;

  constructor({ mainElement, openDetailModal }: { mainElement: HTMLElement; openDetailModal: (id: number) => void }) {
    this.mainElement = mainElement;
    this.openDetailModal = openDetailModal;
  }

  async render(movieItem: MovieItemType) {
    await this.renderMovieList(movieItem);
    this.bindEvents(movieItem);
  }

  bindEvents(movieItem: MovieItemType) {
    const detailButtonElement = this.backgroundElement.querySelector("button.detail") as HTMLButtonElement;
    detailButtonElement.addEventListener("click", () => this.openDetailModal(movieItem.id));
  }

  async renderMovieList(movieItem: MovieItemType) {
    this.backgroundElement = BackgroundThumbnailSection(movieItem);
    this.mainElement?.insertAdjacentElement("beforebegin", this.backgroundElement);
  }
}

export default BackgroundThumbnailController;
