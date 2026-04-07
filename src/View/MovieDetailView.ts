import { MovieDetail } from "../../types/movie";
import { getElementOrThrow, getYearFromDate } from "./utils";

interface MovieDetailViewDomType {
  background: HTMLDivElement;
  closeButton: HTMLButtonElement;
  posterImage: HTMLImageElement;
  title: HTMLHeadingElement;
  category: HTMLParagraphElement;
  rateValue: HTMLSpanElement;
  overview: HTMLParagraphElement;
}

class MovieDetailView {
  #dom: MovieDetailViewDomType;

  constructor() {
    this.#dom = {
      background: getElementOrThrow<HTMLDivElement>(".modal-background"),
      closeButton: getElementOrThrow<HTMLButtonElement>(".close-modal"),
      posterImage: getElementOrThrow<HTMLImageElement>(".modal-poster-image"),
      title: getElementOrThrow<HTMLHeadingElement>(".modal-movie-title"),
      category: getElementOrThrow<HTMLParagraphElement>(".category"),
      rateValue: getElementOrThrow<HTMLSpanElement>(".detail-rate-value"),
      overview: getElementOrThrow<HTMLParagraphElement>(".overview"),
    };
  }

  bindCloseEvent() {
    // 여기 어떡하지 굳이 App에서 핸들러 넘겨받아야 하나?
    // 너무 돌아가는 느낌인데
    // 만약 close 버튼에 추가 기능이 생기면 App.ts에서 받는게 맞는데,,
    this.#dom.closeButton.addEventListener("click", () => {
      this.hide();
    });
  }

  show() {
    this.#dom.background.classList.add("active");
  }

  hide() {
    this.#dom.background.classList.remove("active");
  }

  renderData({
    id,
    poster_path,
    title,
    release_date,
    genres,
    vote_average,
    overview,
  }: MovieDetail) {
    this.#dom.posterImage.src = `${import.meta.env.VITE_TMDB_IMG_URL}${poster_path}`;
    this.#dom.title.textContent = title;
    const year = getYearFromDate(release_date);
    this.#dom.category.textContent = `${year} · ${genres.map((genre) => genre.name).join(", ")}`;

    this.#dom.rateValue.textContent = vote_average.toFixed(1).toString();
    this.#dom.overview.textContent = overview;
  }
}

export default MovieDetailView;
