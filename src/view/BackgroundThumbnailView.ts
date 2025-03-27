import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import SkeletonBackgroundThumbnailSection from "../component/Skeleton/SkeletonBackgroundThumbnailSection";
import { IMovieItem } from "../types/movieResultType";
import { $ } from "../util/selector";

class BackgroundThumbnailView {
  backgroundElement!: HTMLElement;

  constructor() {}

  renderSkeleton() {
    this.backgroundElement = SkeletonBackgroundThumbnailSection();

    const headerElement = $("header");
    headerElement?.insertAdjacentElement("afterend", this.backgroundElement);
  }

  renderBackgroundThumbnail(movie: IMovieItem) {
    const backgroundThumbnailSectionElement = BackgroundThumbnailSection(movie);
    this.backgroundElement.replaceWith(backgroundThumbnailSectionElement);

    this.backgroundElement = backgroundThumbnailSectionElement;
  }

  bindDetailButtonClick(callback: () => void) {
    const detailButtonElement = $<HTMLButtonElement>(
      "button.detail",
      this.backgroundElement,
    );
    detailButtonElement?.addEventListener("click", callback);
  }
}

export default BackgroundThumbnailView;
