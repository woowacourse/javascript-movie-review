import { getMovieDetail } from "./../apis/movieList";
import IMAGES from "../images";
import MovieDetailModalState from "../states/MovieDetailModalState";
import { MovieDetail } from "../types/movie";
import { $ } from "../utils/dom";
import { HTMLTemplate } from "./abstract/BaseComponent";
import EventComponent from "./abstract/EventComponent";
import RatingBar from "./RatingBar";

customElements.define("rating-bar", RatingBar);
interface MovieDetailModalProps {
  targetId: string;
  movieDetailModalState: MovieDetailModalState;
  movieDetail?: MovieDetail;
}

export default class MovieDetailModal extends EventComponent {
  private movieDetailModalState: MovieDetailModalState;
  private movieDetail: MovieDetail | null;

  constructor({
    targetId,
    movieDetailModalState,
    movieDetail,
  }: MovieDetailModalProps) {
    super({ targetId });
    this.movieDetailModalState = movieDetailModalState;
    this.movieDetail = movieDetail || null;
  }

  protected getTemplate(): HTMLTemplate {
    const movieDetail = this.movieDetail;
    if (!movieDetail) {
      return `
      <dialog id="movie-detail-modal" class="movie-detail-modal">
        <div class="movie-detail-container">
          <p>영화 정보가 없습니다.</p>
        </div>
      </dialog>
      `;
    }

    const { id, title, posterSrc, genres, voteAverage, overview } = movieDetail;

    return `
    <dialog id="movie-detail-modal" class="movie-detail-modal">
    <div class="movie-detail-container">
      <h1 class="movie-detail-title">
        ${title}
      </h1>
      <button id="modal-close-button" class="modal-close-button" type="button">
        <img class="modal-close-button-image" src="${
          IMAGES.modalCloseButton
        }" />
      </button>
      <hr class="movie-detail-hr" />
      <div class="movie-detail-inner-wrapper">
        <img class="movie-detail-poster" src=${posterSrc} />
        <div class="movie-detail-info">
          <div>
            <div class="flex-box">
              <p class="movie-detail-genre">${genres.join(", ")}</p>
              <p class="movie-detail-vote"><img class="movie-detail-star-icon" src="${
                IMAGES.starFilled
              }" />${voteAverage}</p>
            </div>
            <p class="movie-detail-overview">${
              overview || "🎬 영화 줄거리 정보가 없습니다"
            }</p>
          </div>
          <rating-bar movieId="${id}"></rating-bar>
        </div>
      </div>
    </div>
    </dialog>
    `;
  }

  protected async onInitialized(): Promise<void> {
    const { isOpen, movieId } = this.movieDetailModalState.get();
    if (isOpen) {
      const movieDetail = await getMovieDetail(movieId);
      this.movieDetail = movieDetail;
      this.render();
      this.openModal();
    }
  }

  protected setEvent(): void {
    $<HTMLButtonElement>("modal-close-button")?.addEventListener(
      "click",
      this.closeModal.bind(this)
    );

    $<HTMLDialogElement>("movie-detail-modal")?.addEventListener(
      "click",
      this.handleModalClick.bind(this)
    );
  }

  private openModal(): void {
    $<HTMLDivElement>(this.targetId)
      ?.querySelector<HTMLDialogElement>("dialog")
      ?.showModal();
  }

  private closeModal(): void {
    this.movieDetail = null;

    $<HTMLDialogElement>(this.targetId)
      ?.querySelector<HTMLDialogElement>("dialog")
      ?.close();
  }

  private handleModalClick(event: Event): void {
    const $dialog = event.target as HTMLDialogElement;
    if ($dialog.nodeName === "DIALOG") {
      this.closeModal();
    }
  }
}
