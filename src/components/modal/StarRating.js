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
          ${this.renderStars()}
        </div>
        <div class="detail-rating">
          ${this.renderRatingText()}
          ${this.renderRatingScore()}
        </div>
      </div>
    `;
  }

  renderStars() {
    return Array(5)
      .fill(0)
      .map((_, index) => this.renderStar(index))
      .join('');
  }

  renderStar(index) {
    const isFilled = index < this.movieRating.getRating();
    const starType = isFilled ? 'filled-star' : 'empty-star';
    const starImage = isFilled ? 'star_filled' : 'star_empty';

    return `
      <span class="${starType}" data-rating="${index + 1}">
        <img src="./images/${starImage}.png" class="star" />
      </span>
    `;
  }

  renderRatingText() {
    return `<span class="rating-text">${this.movieRating.getRatingText()}</span>`;
  }

  renderRatingScore() {
    return `<span class="rating-score">${this.movieRating.getRatingScore()}</span>`;
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
