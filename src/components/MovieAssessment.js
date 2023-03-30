import star_filled from '../../templates/star_filled.png';
import star_empty from '../../templates/star_empty.png';

class MovieAssessment {
  $modal;

  constructor($modal) {
    this.$modal = $modal;

    this.bindEvent();
  }

  init() {
    this.$div.classList = 'movie-assessment';
  }

  bindEvent() {
    this.$div.addEventListener('click', ({ target: { className } }) => {
      if (
        className === 'movie-detail-close-button' ||
        className === 'movie-detail-modal-background'
      ) {
        this.close();
      }
    });
  }

  template() {
    return `
      <div class="movie-assessment">
        <div>
          <span>내 별점</span>
        </div>
        <div>
          ${Array.from({ length: 5 }).reduce((starImages, _, index) => {
            const id = index + 1;

            const starImg =
              id <= reviewScore
                ? `<img id=${id} class="star" src=${star_filled} alt=${star_filled}/>`
                : `<img id=${id} class="star" src=${star_empty} alt=${star_empty}/>`;

            return starImages + starImg;
          }, '')}
        </div>
        <div>
          <span class="review-score">${reviewScore * 2}</span>
          <span></span>
        </div>
      </div>`;
  }
}

export default MovieAssessment;
