import { MovieResult } from "../../api/types/movie/response";
import { PREFIX_POSTER_PATH } from "../../constants/constants";
import Component from "../base/Component";
import Skeleton from "../common/Skeleton";

type ModalState = {
  [K in keyof Pick<
    MovieResult,
    "title" | "poster_path" | "vote_average" | "overview" | "genre_ids"
  >]: K extends "genre_ids" ? MovieResult[K] : MovieResult[K] | null;
} & {
  isLoading: boolean;
};

export default class Modal extends Component<ModalState> {
  private static instance: Modal;

  protected constructor() {
    super({
      title: null,
      poster_path: null,
      vote_average: null,
      overview: null,
      genre_ids: [],
      isLoading: true,
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
        ${Skeleton({ width: 500, height: 700 }).outerHTML}
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

  protected template(): string {
    return /*html*/ `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
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
              2024 · 모험, 애니메이션, 코미디, 드라마, 가족
            </p>
            <p class="rate">
              <span class="rate-average">평균</span>
              <img src="./images/star_filled.png" class="star" /><span
                >${this.state.vote_average}</span
              >
            </p>
            <hr />
            <p class="detail">
              ${this.state.overview}
            </p>
          </div>
        `
          }
        </div>
      </div>
    `;
  }

  open(movieData: MovieResult) {
    this.$element.classList.add("active");
    this.setState({
      isLoading: false,
      title: movieData.title,
      poster_path: movieData.poster_path,
      vote_average: movieData.vote_average,
      overview: movieData.overview,
      genre_ids: movieData.genre_ids,
      // TODO: 외부 or 내부에서 genre_ids를 API로 받아서 가공해서 처리 (genre_ids 타입 재정의?)
      // TODO: 내부 데이터로 만들어서 임시처리 ?
    });
  }

  close() {
    this.$element.classList.remove("active");
  }

  isActive() {
    return this.$element.classList.contains("active");
  }
}
