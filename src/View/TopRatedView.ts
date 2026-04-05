import { ThumbnailInfo } from "../../types/movie";

interface TopRatedViewDomType {
  container: HTMLDivElement | null;
  backgroundImg: HTMLImageElement | null;
  title: HTMLDivElement | null;
  rate: HTMLSpanElement | null;
}

class TopRatedView {
  #dom: TopRatedViewDomType;

  constructor() {
    this.#dom = {
      container: document.querySelector(".background-container"),
      backgroundImg: document.querySelector(".background-img"),
      title: document.querySelector(".title"),
      rate: document.querySelector(".rate-value"),
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
