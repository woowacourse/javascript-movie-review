import { ThumbnailInfo } from "../../types/movie";
import { getElementOrThrow } from "./utils";

interface TopRatedViewDomType {
  container: HTMLDivElement;
  backgroundImg: HTMLImageElement;
  title: HTMLDivElement;
  rate: HTMLSpanElement;
  button: HTMLButtonElement;
}

class TopRatedView {
  #dom: TopRatedViewDomType;

  constructor() {
    this.#dom = {
      container: getElementOrThrow<HTMLDivElement>(".background-container"),
      backgroundImg: getElementOrThrow<HTMLImageElement>(".background-img"),
      title: getElementOrThrow<HTMLDivElement>(".title"),
      rate: getElementOrThrow<HTMLSpanElement>(".rate-value"),
      button: getElementOrThrow<HTMLButtonElement>(".detail"),
    };
  }

  bindEvent(handler: (movieId: number) => void) {
    this.#dom.button.addEventListener("click", async () => {
      const movieId = this.#dom.title.getAttribute("data-movie-id");
      if (!movieId) {
        throw new Error("영화 id를 찾을 수 없습니다.");
      }

      await handler(Number(movieId));
    });
  }

  render({ id, title, poster_path, vote_average }: ThumbnailInfo) {
    this.#dom.title.dataset.movieId = id.toString();
    this.#dom.title.textContent = title;
    this.#dom.rate.textContent = vote_average.toFixed(1).toString();
    this.#dom.backgroundImg.src = `${import.meta.env.VITE_TMDB_IMG_URL}${poster_path}`;
  }

  hide() {
    this.#dom.container.style.display = "none";
  }
}

export default TopRatedView;
