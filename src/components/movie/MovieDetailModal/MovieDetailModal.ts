import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import MovieRatingBox from '../MovieRatingBox/MovieRatingBox';
import { IMovieDetail } from '../../../domain/Movie/Movie.type';
import { querySelector } from '../../../utils/dom/selector';
import { MOVIE_ITEM } from '../../../constants/Condition';
import { CloseButton, FilledStar } from '../../../assets';
import './MovieDetailModal.css';

interface MovieDetailModalProps {
  movieDetail: IMovieDetail;
}

class MovieDetailModal extends Component<MovieDetailModalProps> {
  protected render(): void {
    new Modal(this.$element, { id: 'movie-detail-modal', children: this.createComponent() });
    document.body.style.overflow = 'hidden';
  }

  protected initializeState(): void {
    this.initializeMovieRatingBox();
  }

  protected createComponent() {
    if (this.props) {
      const { title, genres, overview, poster_path, vote_average } = this.props.movieDetail;

      return /* html */ `
      <div class="modal-container">
          <div class="modal-header">
              <h1 class="modal-title">${title}</h1>
              <button id="modal-close-button"><img src=${CloseButton} alt="닫기" /></button>
          </div>
          <div class="modal-content">
              <img src="${
                process.env.IMAGE_BASE_URL
              }/w220_and_h330_face/${poster_path}" loading="lazy" alt=${title} class="modal-thumbnail" />
              <div class="movie-detail-container">
                  <div class="flex-col gap-x-16">
                      <div class="flex gap-y-16">
                          <p>${genres.map((genre) => genre.name).join(', ')}</p>
                          <p class="flex items-center gap-y-4">
                            <img src="${FilledStar}" alt="별점" />
                            ${vote_average.toFixed(MOVIE_ITEM.SCORE_DIGIT)}
                          </p>
                      </div>
                      <p>${overview ? overview : '줄거리가 없습니다.'}</p>
                  </div>
                  <div id="movie-rating-container" class="movie-rating-container"></div>
              </div>
          </div>
      </div>`;
    }

    return ``;
  }

  private initializeMovieRatingBox() {
    const $movieRatingContainer = querySelector<HTMLElement>('#movie-rating-container', this.$element);
    new MovieRatingBox($movieRatingContainer, { key: this.props?.movieDetail.id ?? 0 });
  }

  protected setEvent(): void {
    const $modalCloseButton = querySelector('#modal-close-button', this.$element);
    $modalCloseButton.addEventListener('click', this.closeModal.bind(this));

    const $modal = querySelector<HTMLDialogElement>('#movie-detail-modal');
    $modal.addEventListener('click', this.handleBackDropClick.bind(this));
  }

  private closeModal() {
    const $modal = querySelector<HTMLDialogElement>('#movie-detail-modal');
    $modal.remove();
    document.body.style.overflow = 'auto';
  }

  private handleBackDropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}

export default MovieDetailModal;
