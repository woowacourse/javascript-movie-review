import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import { IMovieDetail } from '../../../domain/Movie/Movie.type';
import { MOVIE_ITEM } from '../../../constants/Condition';
import { CloseButton, FilledStar, EmptyStar } from '../../../assets';

import './MovieDetailModal.css';
import { querySelector } from '../../../utils/dom/selector';

interface MovieDetailModalProps {
  movieDetail: IMovieDetail;
}

class MovieDetailModal extends Component<MovieDetailModalProps> {
  protected render(): void {
    new Modal(this.$element, { id: 'movie-detail-modal', children: this.createComponent() });
  }

  protected createComponent() {
    if (this.props) {
      const { title, genres, overview, poster_path, vote_average } = this.props.movieDetail;

      return /* html */ `
      <div class="modal-container">
          <div class="modal-header">
              <h1 class="modal-title">${title}</h1>
              <button id="modal-close-button" class="flex justify-center items-center"><img src=${CloseButton} alt="닫기" /></button>
          </div>
          <div class="modal-content flex gap-y-32">
              <img src="${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${poster_path}" loading="lazy" alt=${title} />
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
                  <div class="movie-rating-container flex items-center gap-y-12">
                      <p>내 별점</p>
                      <div id="movie-rating-box" class="flex items-center">
                        ${Array.from({ length: 5 })
                          .map(() => `<img src="${EmptyStar}" alt="별" />`)
                          .join('')}
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
    }

    return ``;
  }

  protected setEvent(): void {
    const $modalCloseButton = querySelector('#modal-close-button', this.$element);
    $modalCloseButton.addEventListener('click', this.removeModal.bind(this));
  }

  private removeModal() {
    const $modal = querySelector<HTMLDialogElement>('#movie-detail-modal');
    $modal.remove();
  }
}

export default MovieDetailModal;
