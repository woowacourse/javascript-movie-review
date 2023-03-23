import RatingManager from '../domain/RatingManager';
import { $ } from '../util/querySelector';

const SCORE_MIN = 0;
const SCORE_MAX = 10;
const SCORE_STEP = 2;
const RATING_MESSAGES = [
  '별점을 입력해 주세요',
  '최악이에요',
  '별로에요',
  '보통이에요',
  '재미있어요',
  '세기의 명작',
]

const normalizeRating = (score: number): number => {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(score / SCORE_STEP) * SCORE_STEP));
}

class StarRating {
  private movieId = 0;
  private rating = 0;
  private readonly manager: RatingManager;
  private readonly element: HTMLElement;

  constructor(element: HTMLElement, ratingManager: RatingManager) {
    this.element = element;
    this.manager = ratingManager;
  }

  render(movieId = 0, rating?: number) {
    this.movieId = movieId;

    if (!rating) this.rating = this.manager.getRating(this.movieId);
    else this.rating = normalizeRating(rating);

    this.element.innerHTML = `
    <p>내 별점</p>
    <span class="rating-images">
      <img class="rating-img">
      <img class="rating-img">
      <img class="rating-img">
      <img class="rating-img">
      <img class="rating-img">
    </span>
    <input type="range" class="star-range" value="${this.rating}" step="${SCORE_STEP}" min="${SCORE_MIN}" max="${SCORE_MAX}">
    <span class="rating-message"></span>
    `.trim();

    this.renderStars();

    const rangeInput = $('.star-range', this.element) as HTMLInputElement;
    rangeInput.addEventListener('input', () => {
      this.rating = Number(rangeInput.value);
      this.renderStars();
      this.manager.setRating(this.movieId, this.rating);
    });

    return this.element;
  }

  catchMovieIdEvent(event: CustomEvent) {
    const id = event.detail.info.id ?? 0;
    this.render(id);
  }

  private renderStars() {
    this.element
        .querySelectorAll(`img.rating-img:nth-child(n+${this.rating / SCORE_STEP + 1}`)
        .forEach((img) => {
          (img as HTMLElement).dataset.filled = 'false';
          (img as HTMLImageElement).alt = '채워지지 않은 별점';
        });
      
    this.element
      .querySelectorAll(`img.rating-img:nth-child(-n+${this.rating / SCORE_STEP})`)
      .forEach((img) => {
        (img as HTMLElement).dataset.filled = 'true';
        (img as HTMLImageElement).alt = '채워진 별점';
      });

    const message = $('.rating-message', this.element);
    message.replaceChildren();
    message.insertAdjacentHTML('afterbegin', `<span>${this.rating.toString()}</span>`);
    message.insertAdjacentHTML('beforeend', `<span>${RATING_MESSAGES[this.rating / SCORE_STEP]}</span>`);
  }
}

export default StarRating;