import { $, $$ } from '../utils/domSelector';
import EventDispatcher from '../EventDispatcher';

type RatingBarType = {
  parentElement: HTMLElement;
  id: number;
  startRating: number;
  ratingInfos: { rating: number; alias: string }[];
};

class RatingBar {
  private $parentElement;
  private id;
  private $element = document.createElement('div');
  private startRating;
  private ratingInfos;

  constructor({ parentElement, id, startRating, ratingInfos }: RatingBarType) {
    this.$parentElement = parentElement;
    this.id = id;
    this.startRating = startRating;
    this.ratingInfos = ratingInfos;

    this.render();
    this.changeAliasIfRatingChanged();
  }

  private render() {
    this.$element.classList.add('user-rating-bar-wrapper');
    this.$element.innerHTML = `
      <div class="rating-title">내 별점</div>
      <div class="user-rating-bar">${this.getStarButtonsTemplate()}</div>
      <div class="modal-text user-rating-score">${this.startRating}</div>
      <div class="modal-text user-rating-alias">${this.getAliasByRating(this.startRating)}</div>
    `;

    this.$parentElement.appendChild(this.$element);
  }

  private getStarButtonsTemplate() {
    return this.ratingInfos
      .reverse()
      .map(
        ({ rating }) =>
          `<input type="radio" name="rating" value="${rating}" ${
            this.startRating === rating ? 'checked' : ''
          }/>`,
      )
      .join('');
  }

  private getAliasByRating(searchRating: number) {
    const searchedInfo = this.ratingInfos.find(({ rating }) => rating === searchRating);

    return searchedInfo ? searchedInfo.alias : '정보 없음';
  }

  private changeAliasIfRatingChanged() {
    const $ratingButtons = $$('.user-rating-bar input[type="radio"][name="rating"]', this.$element);
    const $ratingScore = $('.user-rating-score', this.$element);
    const $ratingAlias = $('.user-rating-alias', this.$element);

    $ratingButtons.forEach((radio) => {
      if (radio instanceof HTMLInputElement) {
        radio.addEventListener('change', () => {
          const rating = radio.value;

          $ratingScore.innerText = rating;
          $ratingAlias.innerHTML = this.getAliasByRating(Number(rating));

          EventDispatcher.dispatchEvent('setUserRating', [this.id, Number(rating)]);
        });
      }
    });
  }
}

export default RatingBar;
