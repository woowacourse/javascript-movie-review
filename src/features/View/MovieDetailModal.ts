import { MovieDetail } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/constant";
import closeImg from "../../images/modal_button_close.png";
import starFilledImg from "../../images/star_filled.png";
import starEmptyImg from "../../images/star_empty.png";
import StarRating from "./StarRating";

export default class MovieDetailModal {
  private div: HTMLElement;
  private imgEl: HTMLImageElement;
  private titleEl: HTMLElement;
  private genresEl: HTMLElement;
  private ratingEl: HTMLElement;
  private overviewEl: HTMLElement;
  private starRating: StarRating;

  constructor() {
    this.div = document.createElement("div");
    this.div.className = "modal-background";
    this.div.innerHTML = /*html*/ `
      <div class="modal">
        <div class="modal-container">
          <img class="modal-image" src="" alt="">
          <div class="modal-description">
            <button class="close-modal">
              <img src="${closeImg}" alt="닫기">
            </button>
            <h2 class="modal-title"></h2>
            <p class="modal-release-date-and-genres"></p>
            <div class="average">
              <p class="modal-rating-text">평균</p>
              <img class="average-star" src="${starFilledImg}">
              <p class="modal-rating"></p>
            </div>
            <hr>
            <div class="modal-user-rating">
              <p class="modal-user-rating-text">내 별점</p>
              <div class="star-rating">
                <div class="stars-row">
                  ${[1, 2, 3, 4, 5].map((i) => `<img class="modal-star" data-index="${i}" src="${starEmptyImg}">`).join("")}
                </div>
                <div class="rating-text">
                  <span class="rating-label"></span>
                  <span class="rating-score"></span>
                </div>
              </div>
            </div>
            <hr>
            <p class="modal-overview-title">줄거리</p>
            <p class="modal-overview"></p>
          </div>
        </div>
      </div>`;

    document.body.appendChild(this.div);

    this.imgEl = this.div.querySelector<HTMLImageElement>(".modal-image")!;
    this.titleEl = this.div.querySelector(".modal-title")!;
    this.genresEl = this.div.querySelector(".modal-release-date-and-genres")!;
    this.ratingEl = this.div.querySelector(".modal-rating")!;
    this.overviewEl = this.div.querySelector(".modal-overview")!;
    this.starRating = new StarRating(this.div);
  }

  render(data: MovieDetail, savedRating: number) {
    this.imgEl.src = `${THUMB_NAIL_URL}${data.poster_path}`;
    this.imgEl.alt = data.title;
    this.titleEl.textContent = data.title;
    this.genresEl.textContent = `${data.release_date.slice(0, 4)} · ${data.genres.map((genre) => genre.name).join(", ")}`;
    this.ratingEl.textContent = data.vote_average.toFixed(1);
    this.overviewEl.textContent = data.overview;

    this.starRating.reset();
    if (savedRating) this.starRating.rate(savedRating);

    this.div.classList.add("active");
  }

  rate(index: number) {
    this.starRating.rate(index);
  }

  renderError(message: string) {
    this.titleEl.textContent = "오류가 발생했습니다";
    this.overviewEl.textContent = message;
    this.imgEl.src = "";
    this.imgEl.alt = "";
    this.genresEl.textContent = "";
    this.ratingEl.textContent = "";
    this.div.classList.add("active");
  }

  close() {
    this.div.classList.remove("active");
  }
}
