import { MovieResult } from "../../api/types/movie/response";
import { PREFIX_POSTER_PATH } from "../../constants/constants";
import Component from "../base/Component";
import Skeleton from "../common/Skeleton";

const ratingDescriptions = {
  0: "별점을 선택해주세요",
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
} as const;

export type ratingType = keyof typeof ratingDescriptions;

type ModalState = {
  [K in keyof Pick<
    MovieResult,
    "id" | "title" | "poster_path" | "vote_average" | "overview"
  >]: MovieResult[K] | null;
} & {
  genres: string[];
  release_date: string | null;
  isLoading: boolean;
  my_rate: ratingType;
};

export default class Modal extends Component<ModalState> {
  private static instance: Modal;

  protected constructor() {
    super({
      id: null,
      title: null,
      poster_path: null,
      vote_average: null,
      overview: null,
      genres: [],
      release_date: null,
      isLoading: true,
      my_rate: 0,
    });
  }

  protected createElement(): HTMLElement {
    const $modal = document.createElement("div");
    $modal.className = "modal-background";
    $modal.id = "modalBackground";
    return $modal;
  }

  static getInstance(): Modal {
    if (!Modal.instance) Modal.instance = new Modal();
    return Modal.instance;
  }

  private renderSkeletonItem() {
    return /*html*/ `
      <div class="modal-image">
        ${Skeleton({ width: 350, height: 570 }).outerHTML}
      </div>
      <div class="modal-description">
        ${Skeleton({ width: 300, height: 40 }).outerHTML}
        <p class="rate">
          ${Skeleton({ width: 370, height: 25 }).outerHTML}
        </p>
        <p class="detail">
          ${Skeleton({ width: 150, height: 30 }).outerHTML}
        </p>
      </div>
    `;
  }

  private renderRatingStar() {
    const totalStars = 5;
    const filledStars = this.state.my_rate / 2;

    let starsHtml = "";

    for (let i = 1; i <= totalStars; i++) {
      const starType = i <= filledStars ? "filled" : "empty";
      starsHtml += `<img 
        src="./images/star_${starType}.png" 
        class="star" 
        data-value="${i * 2}"
        alt="star"
      />`;
    }

    return starsHtml;
  }

  protected template(): string {
    return /*html*/ `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container" data-movie-id="${this.state.id}">
          ${
            this.state.isLoading
              ? this.renderSkeletonItem()
              : /*html*/ `
              <div class="modal-image">
                <img src="${PREFIX_POSTER_PATH}${this.state.poster_path}" />
              </div>
              <div class="modal-description">
                <h2>${this.state.title}</h2>
                <p class="category">
                  ${this.state.release_date} · ${this.state.genres.join(", ")}
                </p>
                <p class="rate">
                  <span class="rate-average">평균</span>
                  <img src="./images/star_filled.png" class="star" alt="star" /><span
                    >${this.state.vote_average}</span
                  >
                </p>
                <hr />
                <p class="modal-subtitle">내 별점</p>
                <div class="rate-star">
                  ${this.renderRatingStar()}
                  <span class="rate-description">${
                    ratingDescriptions[this.state.my_rate]
                  }</span>
                  <span class="rate-scale">(${this.state.my_rate}/10)</span>
                </div>
                <hr />
                <p class="modal-subtitle">줄거리</p>
                <p class="detail">${this.state.overview}</p>
              </div>
            `
          }
        </div>
      </div>
    `;
  }

  open(movieData: ModalState) {
    this.$element.classList.add("active");
    this.setState({
      isLoading: false,
      id: movieData.id,
      title: movieData.title,
      poster_path: movieData.poster_path,
      vote_average: movieData.vote_average,
      overview: movieData.overview,
      genres: movieData.genres,
      release_date: movieData.release_date,
      my_rate: movieData.my_rate,
    });
  }

  close() {
    this.$element.classList.remove("active");
  }

  isActive() {
    return this.$element.classList.contains("active");
  }

  getMovieId() {
    return this.state.id;
  }
}
