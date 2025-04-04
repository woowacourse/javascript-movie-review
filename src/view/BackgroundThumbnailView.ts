import { IMovieItem } from "../types/movieResultType";
import BackgroundThumbnailContainer from "../component/backgroundThumbnail/BackgroundThumbnailContainer";
import { $ } from "../util/selector";

class BackgroundThumbnailView {
  #movie: IMovieItem | null = null;
  #element!: HTMLElement;

  renderBackgroundThumbnail(movie: IMovieItem) {
    this.#movie = movie;
    this.#element = BackgroundThumbnailContainer(movie);

    const header = $("header");
    header?.insertAdjacentElement("afterend", this.#element);
  }

  bindDetailButtonClick(callback: (movieId: number) => void) {
    const button = $<HTMLButtonElement>("button.detail", this.#element);
    if (!button || !this.#movie) return;

    button.addEventListener("click", () => {
      callback(this.#movie!.id);
    });
  }

  hide() {
    this.#element.classList.add("search");
  }

  show() {
    this.#element.classList.remove("search");
  }
}

export default BackgroundThumbnailView;
