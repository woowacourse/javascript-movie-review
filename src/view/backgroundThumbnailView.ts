import BackgroundThumbnailSection from "../components/BackgroundThumbnailSection";
import { MovieItemType } from "../types/movieResultType";

class BackgroundThumbnailView {
  mainElement;
  backgroundElement!: HTMLElement;

  constructor(mainElement: HTMLElement) {
    this.mainElement = mainElement;
  }

  renderBackgroundThumbnail(movieItem: MovieItemType) {
    this.backgroundElement = BackgroundThumbnailSection(movieItem);
    this.mainElement.insertAdjacentElement("beforebegin", this.backgroundElement);
  }

  getDetailButton(): HTMLButtonElement {
    return this.backgroundElement.querySelector("button.detail") as HTMLButtonElement;
  }
}

export default BackgroundThumbnailView;
