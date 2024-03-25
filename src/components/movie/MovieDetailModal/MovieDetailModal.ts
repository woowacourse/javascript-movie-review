import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import { IMovieDetail } from '../../../domain/Movie/Movie.type';
import { querySelector, querySelectorAll } from '../../../utils/dom/selector';
import { MOVIE_ITEM } from '../../../constants/Condition';
import { CloseButton, FilledStar, EmptyStar } from '../../../assets';
import './MovieDetailModal.css';

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
                  <div id="movie-rating-container" class="movie-rating-container flex items-center gap-y-12">
                      <h3>내 별점</h3>
                      <form id="movie-rating-form" class="flex items-center">
                        ${Array.from({ length: 5 })
                          .map(
                            (_, index) => `
                            <label for="star-${index}">
                                <input id="star-${index}" type="radio" value=${(index + 1) * 2} class="movie-rating">
                                <img src="${EmptyStar}" alt="별" class="movie-rating-image" />
                            </label>
                            `,
                          )
                          .join('')}
                      </form>
                      <p id="movie-rating-score"></p>
                      <p id="movie-rating-text"></p>
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

    const $movieRatingForm = querySelector('#movie-rating-form', this.$element);
    $movieRatingForm.addEventListener('change', this.updateRating.bind(this));
  }

  private createRatingText(rating: number) {
    switch (rating) {
      case 2:
        return '최악이에요';
      case 4:
        return '별로예요';
      case 6:
        return '보통이에요';
      case 8:
        return '재미있어요';
      case 10:
        return '명작이에요';
      default:
        return '';
    }
  }

  private updateRating(event: Event) {
    const $starImages = querySelectorAll<HTMLImageElement>('.movie-rating-image', this.$element);
    const rating = (event.target as HTMLInputElement).value;

    $starImages.forEach(($star, index) => {
      $star.src = (index + 1) * 2 <= Number(rating) ? FilledStar : EmptyStar;
    });

    const $movieRatingScore = querySelector<HTMLParagraphElement>('#movie-rating-score', this.$element);
    const $movieRatingText = querySelector<HTMLParagraphElement>('#movie-rating-text', this.$element);

    $movieRatingScore.textContent = rating;
    $movieRatingText.textContent = this.createRatingText(Number(rating));
  }

  private removeModal() {
    const $modal = querySelector<HTMLDialogElement>('#movie-detail-modal');
    $modal.remove();
  }
}

export default MovieDetailModal;
