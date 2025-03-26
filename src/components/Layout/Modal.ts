import { MovieResult } from "../../../types/movie";
import {
  DEFAULT_MOVIE_DATA,
  PREFIX_POSTER_PATH,
} from "../../constants/constants";

type ModalState = Pick<
  MovieResult,
  "title" | "poster_path" | "vote_average" | "overview" | "genre_ids"
>;

// TODO: active 상태 토글
// TODO: DEFAULT 제거 및 스켈레톤 추가

export default class Modal {
  private static instance: Modal;
  private $modal: HTMLElement;
  private state: ModalState;

  private constructor() {
    this.$modal = document.createElement("div");
    this.$modal.className = "modal-background";
    this.$modal.id = "modalBackground";
    this.state = {
      title: DEFAULT_MOVIE_DATA.title,
      poster_path: DEFAULT_MOVIE_DATA.posterPath,
      vote_average: DEFAULT_MOVIE_DATA.voteAverage,
      overview: DEFAULT_MOVIE_DATA.overview,
      genre_ids: DEFAULT_MOVIE_DATA.genreIds,
    };
    this.render();
  }

  static getInstance(): Modal {
    if (!Modal.instance) Modal.instance = new Modal();
    return Modal.instance;
  }

  render() {
    this.$modal.innerHTML = /*html*/ `
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" />
      </button>
      <div class="modal-container">
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
      </div>
    </div>
    `;
  }

  setState(newState: Partial<ModalState>) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  getElement() {
    return this.$modal;
  }
}
