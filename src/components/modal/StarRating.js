import MovieRating from '../../domain/MovieRating';

export default class StarRating {
  constructor(element, movieId, initialRating = 0, onRatingChange) {
    this.element = element;
    this.movieRating = new MovieRating(movieId, initialRating);
    this.onRatingChange = onRatingChange;
    this.initialize();
  }

  initialize() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.element.innerHTML = `
      <div class="star-rating">
        <div class="star-rating-item">
          ${Array(5)
            .fill(0)
            .map(
              (_, index) => `
            <span class="${
              index < this.movieRating.getRating()
                ? 'filled-star'
                : 'empty-star'
            }" data-rating="${index + 1}">
              <img src="./images/${
                index < this.movieRating.getRating()
                  ? 'star_filled'
                  : 'star_empty'
              }.png" class="star" />
            </span>
          `,
            )
            .join('')}
        </div>
        <div class="detail-rating">
          <span class="rating-text">${this.movieRating.getRatingText()}</span>
          <span class="rating-score">${this.movieRating.getRatingScore()}</span>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const stars = this.element.querySelectorAll('.empty-star, .filled-star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating') || '0');
        this.movieRating.setRating(rating);
        this.onRatingChange(this.movieRating);
        this.render();
      });
    });
  }
}
