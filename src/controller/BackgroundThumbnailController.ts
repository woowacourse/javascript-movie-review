import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import SkeletonBackgroundThumbnailSection from "../component/Skeleton/SkeletonBackgroundThumbnailSection";
import { IMovieItem } from "../types/movieResultType";

class BackgroundThumbnailController {
  backgroundElement!: HTMLElement;

  onMovieDetailButtonClick;

  constructor({
    onMovieDetailButtonClick,
  }: {
    onMovieDetailButtonClick: (text: string) => void;
  }) {
    this.onMovieDetailButtonClick = onMovieDetailButtonClick;
  }

  renderSkeleton() {
    this.backgroundElement = SkeletonBackgroundThumbnailSection();

    const headerElement = document.querySelector("header");
    headerElement?.insertAdjacentElement("afterend", this.backgroundElement);
  }

  renderBackgroundThumbnail(movie: IMovieItem) {
    const backgroundThumbnailSectionElement = BackgroundThumbnailSection(movie);
    this.backgroundElement.replaceWith(backgroundThumbnailSectionElement);

    this.backgroundElement = backgroundThumbnailSectionElement;

    this.bindEvents();
  }

  bindEvents() {
    const detailButtonElement = this.backgroundElement.querySelector(
      "button.detail",
    ) as HTMLButtonElement;
    detailButtonElement.addEventListener("click", () =>
      this.onMovieDetailButtonClick("아직 지원되지 않은 기능입니다."),
    );
  }

  hideBackground() {
    this.backgroundElement.classList.add("search");
  }

  showBackground() {
    this.backgroundElement.classList.remove("search");
  }
}

export default BackgroundThumbnailController;
