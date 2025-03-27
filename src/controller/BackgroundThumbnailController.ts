import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import { IMovieItem } from "../types/movieResultType";
import { $ } from "../util/selector";

class BackgroundThumbnailController {
  backgroundElement!: HTMLElement;

  onMovieDetailButtonClick;

  constructor({ onMovieDetailButtonClick }: { onMovieDetailButtonClick: (text: string) => void }) {
    this.onMovieDetailButtonClick = onMovieDetailButtonClick;
  }

  renderBackgroundThumbnail(movie: IMovieItem) {
    this.backgroundElement = BackgroundThumbnailSection(movie);

    const headerElement = $("header");
    headerElement?.insertAdjacentElement("afterend", this.backgroundElement);

    this.bindEvents();
  }

  bindEvents() {
    const detailButtonElement = $<HTMLButtonElement>("button.detail", this.backgroundElement);
    detailButtonElement?.addEventListener("click", () =>
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
