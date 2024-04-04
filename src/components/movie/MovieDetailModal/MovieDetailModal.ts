import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import MovieRatingBox from '../MovieRatingBox/MovieRatingBox';
import { IMovieDetail } from '../../../domain/Movie/Movie.type';
import { querySelector } from '../../../utils/dom/selector';
import { MOVIE_ITEM } from '../../../constants/Condition';
import { NoImage, CloseButton, FilledStar } from '../../../assets';
import './MovieDetailModal.css';

class MovieDetailModal extends Component {
  modal: Modal | undefined;
  movieDetail: IMovieDetail | undefined;

  protected render(): void {
    this.modal = new Modal(this.$element, { id: 'movie-detail-modal' });
  }

  protected initializeState(): void {
    if (!this.modal) return;

    this.modal.createModalContent(this.createComponent());
    this.initializeMovieRatingBox();
  }

  protected createComponent() {
    const posterURL = this.movieDetail?.poster_path
      ? `${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.movieDetail?.poster_path}`
      : NoImage;
    const genres =
      (this.movieDetail?.genres.length ?? 0) > 0
        ? this.movieDetail?.genres.map((genre) => genre.name).join(', ')
        : '장르가 없습니다.';
    const overview = this.movieDetail?.overview || '줄거리가 없습니다.';

    return /* html */ `
      <section id="movie-detail-container" class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">${this.movieDetail?.title}</h1>
          <button id="modal-close-button"><img src=${CloseButton} alt="닫기" /></button>
        </div>
        <div class="modal-content">
          <img src=${posterURL} loading="lazy" alt=${this.movieDetail?.title} class="modal-thumbnail" />
          <div class="movie-detail-container">
            <div class="flex-col gap-x-16">
              <div class="flex gap-y-16">
                <p>${genres}</p>
                <p class="flex items-center gap-y-4">
                  <img src="${FilledStar}" alt="별점" />
                  ${this.movieDetail?.vote_average.toFixed(MOVIE_ITEM.SCORE_DIGIT)}
                </p>
              </div>
              <p class="movie-overview">${overview}</p>
            </div>
            <div id="movie-rating-container" class="movie-rating-container"></div>
          </div>
        </div>
      </section>`;
  }

  private initializeMovieRatingBox() {
    if (!this.movieDetail) return;

    const $movieRatingContainer = querySelector<HTMLElement>('#movie-rating-container', this.$element);
    new MovieRatingBox($movieRatingContainer, { key: this.movieDetail.id });
  }

  protected setEvent(): void {
    const $modalCloseButton = querySelector('#modal-close-button', this.$element);
    $modalCloseButton.addEventListener('click', this.closeModal.bind(this));
  }

  public openModal(movieDetail: IMovieDetail) {
    this.movieDetail = movieDetail;

    this.initializeState();
    this.setEvent();

    this.modal?.open();
  }

  public closeModal() {
    this.modal?.close();
  }
}

export default MovieDetailModal;
