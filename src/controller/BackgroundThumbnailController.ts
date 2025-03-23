import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import SkeletonBackgroundThumbnailSection from "../component/Skeleton/SkeletonBackgroundThumbnailSection";
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
    this.renderSkeleton();
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

  renderSkeleton() {
    this.backgroundElement = SkeletonBackgroundThumbnailSection();
    this.mainElement?.insertAdjacentElement(
      "beforebegin",
      this.backgroundElement,
    );
  }

  async renderMovieList(movieItem: MovieItemType) {
    const backgroundThumbnailSectionElement =
      BackgroundThumbnailSection(movieItem);
    this.backgroundElement.replaceWith(backgroundThumbnailSectionElement);

    this.backgroundElement = backgroundThumbnailSectionElement;
  }
}

export default BackgroundThumbnailController;
