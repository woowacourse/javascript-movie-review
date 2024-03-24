import './style.css';

import { MENT_BY_RATE, Rate } from '../../types/StarRate';
import EachStar from './EachStar';

interface StarRatingProps {
  initRate?: Rate;
}

const template = /* html */ `
  <p class="star-score text-body"></p>
  <p class="score-ment text-body"></p>
`;

const STAR_COUNT = 5;

class StarRating {
  private template: HTMLElement;

  private starIcons: EachStar[];

  private score: Rate;

  constructor({ initRate }: StarRatingProps) {
    this.template = this.createElements();
    this.score = initRate ?? 2;
    this.starIcons = this.createStarIcons();
    this.appendStarIcons();
    this.setScoreAndMent();
  }

  get element() {
    return this.template;
  }

  private createElements() {
    const starRating = document.createElement('div');
    starRating.className = 'star-rating';
    starRating.innerHTML = template;

    return starRating;
  }

  private createStarIcons() {
    const stars = Array.from({ length: STAR_COUNT }).map(() => new EachStar());
    return stars;
  }

  private appendStarIcons() {
    const fragment = document.createDocumentFragment();
    this.starIcons.forEach((starIcon) => {
      fragment.appendChild(starIcon.element);
    });

    this.template.prepend(fragment);
  }

  private setScoreAndMent() {
    const score = this.template.querySelector('.star-score') as HTMLParagraphElement;
    score.textContent = `${this.score}`;
    const ment = this.template.querySelector('.score-ment') as HTMLParagraphElement;
    ment.textContent = MENT_BY_RATE[this.score];
  }
}

export default StarRating;
