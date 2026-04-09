import { Star } from '../common/Star.ts';
const POINTS = ['최악이예요', '별로예요', '보통이에요', '재미있어요', '명작이에요'] as const;

export default class SubmitRate {
  #$submiteRateContainer: HTMLElement;
  #$starContanier: HTMLElement;
  #$rateText: HTMLElement;

  #onSubmitRate: (rate: number) => void;

  constructor(rate: number, onSubmitRate: (rate: number) => void) {
    this.#onSubmitRate = onSubmitRate;

    this.#$submiteRateContainer = document.createElement('div');
    this.#$submiteRateContainer.className = 'submit-rate-container';

    this.#$starContanier = document.createElement('div');
    this.#$starContanier.className = 'star-container';

    const $rateTextContainer = document.createElement('div');
    this.#$rateText = document.createElement('p');
    $rateTextContainer.append(this.#$rateText);

    this.#$submiteRateContainer.append(this.#$starContanier);
    this.#$submiteRateContainer.append($rateTextContainer);

    this.#renderStar(rate);
  }

  get $element() {
    return this.#$submiteRateContainer;
  }

  #renderStar = (rate: number = 0) => {
    this.#$starContanier.innerHTML = '';
    const rateText = rate !== 0 ? `${POINTS[rate / 2 - 1]} ${rate}/10` : '별점을 입력해주세요';
    this.#$rateText.textContent = rateText;

    POINTS.forEach((point, index) => {
      const score = (index + 1) * 2;
      const $button = document.createElement('button');
      $button.className = 'submit-star-button';

      $button.append(Star(score <= rate));
      $button.addEventListener('click', () => {
        this.#$rateText.textContent = point;
        this.#onSubmitRate(score);
        this.#renderStar(score);
      });

      this.#$starContanier.append($button);
    });
  };
}
