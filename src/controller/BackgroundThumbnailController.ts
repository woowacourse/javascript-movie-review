import { $ } from "../util/selector";
import BackgroundThumbnailView from "../view/BackgroundThumbnailView";
import { IMovieItem } from "./../types/movieResultType";

class BackgroundThumbnailController {
  #view;
  backgroundElement!: HTMLElement;
  movie: IMovieItem | null = null;

  #onMovieDetailButtonClick;

  constructor({ onMovieDetailButtonClick }: { onMovieDetailButtonClick: (movieId: number) => void }) {
    this.#view = new BackgroundThumbnailView();
    this.#onMovieDetailButtonClick = onMovieDetailButtonClick;
  }

  render(movie: IMovieItem) {
    this.#view.renderBackgroundThumbnail(movie);
    this.#view.bindDetailButtonClick(this.#onMovieDetailButtonClick);
  }

  bindEvents() {
    const detailButtonElement = $<HTMLButtonElement>("button.detail", this.backgroundElement);
    if (this.movie) {
      detailButtonElement?.addEventListener("click", () => {
        if (this.movie) this.#onMovieDetailButtonClick(this.movie.id);
      });
    }
  }

  hideBackground() {
    this.#view.hide();
  }

  showBackground() {
    this.#view.show();
  }
}

export default BackgroundThumbnailController;
