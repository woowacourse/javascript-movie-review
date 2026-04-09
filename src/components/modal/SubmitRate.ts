import { Star } from '../common/Star.ts';

const POINTS = {
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
} as const;

export default class SubmitRate {
  #$element: HTMLElement;
  #$starContanier: HTMLElement;
  #rate: number;

  constructor() {
    this.#$element = document.createElement('div');
    this.#$element.className = 'submit-rate-container';

    this.#$starContanier = document.createElement('div');
    this.#$starContanier.className = 'star-container';

    this.#$element.append(this.#$starContanier);
    this.#renderStar();

    this.#rate = 0;
  }

  get $element() {
    return this.#$element;
  }

  #renderStar = () => {
    Object.entries(POINTS).map(([key, value]) => {
      console.log(key, value);
      const $button = document.createElement('button');
      $button.append(Star());

      $button.addEventListener('click', () => {
        console.log(key, value);
      });

      this.#$starContanier.append($button);
    });
    this.#$starContanier.append();
  };
}
