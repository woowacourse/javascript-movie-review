import { ThumbnailInfo } from "../../types/movie";
import { getElementOrThrow } from "./utils";

interface TopRatedViewDomType {
  container: HTMLDivElement;
  backgroundImg: HTMLImageElement;
  title: HTMLDivElement;
  rate: HTMLSpanElement;
}

class TopRatedView {
  #dom: TopRatedViewDomType;

  constructor() {
    this.#dom = {
      container: getElementOrThrow<HTMLDivElement>(".background-container"),
      backgroundImg: getElementOrThrow<HTMLImageElement>(".background-img"),
      title: getElementOrThrow<HTMLDivElement>(".title"),
      rate: getElementOrThrow<HTMLSpanElement>(".rate-value"),
    };
  }

  render({ title, poster_path, vote_average }: ThumbnailInfo) {
    this.#dom.title!.textContent = title;
    this.#dom.rate!.textContent = vote_average.toString();
    this.#dom.backgroundImg!.src = `${import.meta.env.VITE_TMDB_IMG_URL}${poster_path}`;
  }

  hide() {
    this.#dom.container!.style.display = "none";
  }
}

export default TopRatedView;
