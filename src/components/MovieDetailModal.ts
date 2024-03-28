import { getMovieDetail } from "./../apis/movieList";
import IMAGES from "../images";
import MovieDetailModalState from "../states/MovieDetailModalState";
import { MovieDetail } from "../types/movie";
import { $ } from "../utils/dom";
import { HTMLTemplate } from "./abstract/BaseComponent";
import EventComponent from "./abstract/EventComponent";

interface MovieDetailModalProps {
  targetId: string;
  movieDetailModalState: MovieDetailModalState;
  movieInfo?: MovieDetail;
}

export default class MovieDetailModal extends EventComponent {
  private movieDetailModalState: MovieDetailModalState;
  private movieInfo: MovieDetail | null;

  constructor({
    targetId,
    movieDetailModalState,
    movieInfo,
  }: MovieDetailModalProps) {
    super({ targetId });
    this.movieDetailModalState = movieDetailModalState;
    this.movieInfo = movieInfo || null;
  }

  protected getTemplate(): HTMLTemplate {
    const movieInfo = this.movieInfo;
    if (!movieInfo) {
      return "<div class='close' id='test-modal'>스켈레톤 UI</div>";
    }

    const { id, title, posterSrc, genres, voteAverage, overview } = movieInfo;

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
            <p class="movie-detail-overview">${overview}</p>
          </div>
          <div class="my-vote-container">
            <p class="my-vote-label">내 별점</p>
            <div class="my-vote-star-container">
              <img class="my-vote-star" src="${IMAGES.starFilled}" />
              <img class="my-vote-star" src="${IMAGES.starFilled}" />
              <img class="my-vote-star" src="${IMAGES.starFilled}" />
              <img class="my-vote-star" src="${IMAGES.starFilled}" />
              <img class="my-vote-star" src="${IMAGES.starFilled}" />
            </div>
            <p class="my-vote-text">6 보통이에요</p>
          </div>
        </div>
      </div>
    </div>
    </dialog>
    `;
  }

  protected async onInitialized(): Promise<void> {
    const { isOpen, movieId } = this.movieDetailModalState.get();
    if (isOpen) {
      await this.fetchMovieDetail(movieId);
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

  private async fetchMovieDetail(movieId: number): Promise<void> {
    const movieInfo = await getMovieDetail(movieId);
    this.movieInfo = movieInfo;
  }

  private openModal(): void {
    $<HTMLDivElement>(this.targetId)
      ?.querySelector<HTMLDialogElement>("dialog")
      ?.showModal();
  }

  private closeModal(): void {
    this.movieInfo = null;

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
