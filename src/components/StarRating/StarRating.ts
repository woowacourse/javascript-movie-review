import './style.css';

import { MENT_BY_RATE, Rate } from '../../types/StarRate';
import EachStar from './EachStar';

interface StarRatingProps {
  initRate?: Rate;
  saveRating?: (score: Rate) => void;
}

const template = /* html */ `
  <p class="rate-label text-label">내 별점</p>
  <fieldset></fieldset>
  <p class="star-score text-body"></p>
  <p class="score-ment text-body"></p>
`;

const STAR_COUNT = 5;

class StarRating {
  private template: HTMLFormElement;

  private stars: EachStar[];

  private score: Rate;

  private saveRating: ((score: Rate) => void) | undefined;

  constructor({ initRate, saveRating }: StarRatingProps) {
    this.template = this.createElements();
    this.score = initRate ?? 0;
    this.stars = this.createStarIcons();
    this.saveRating = saveRating;
    this.setScoreAndMent();
    this.initStarFill();
    this.onMouseOver();
    this.onMouseLeave();
  }

  get element() {
    return this.template;
  }

  private setScore(score: Rate) {
    this.score = score;
    if (this.saveRating !== undefined) this.saveRating(score);
    this.stars.forEach((star) => star.fillStars(this.score));
    this.setScoreAndMent();
  }

  private createElements() {
    const starRating = document.createElement('form');
    starRating.className = 'star-rating';
    starRating.innerHTML = template;
    return starRating;
  }

  private initStarFill() {
    this.stars.forEach((star) => star.fillStars(this.score));
  }

  private createStarIcons() {
    const fragment = document.createDocumentFragment();
    const stars = Array.from({ length: STAR_COUNT }).map((_, index) => {
      const rate = new EachStar({ index, setScore: this.setScore.bind(this) });
      fragment.appendChild(rate.element);
      return rate;
    });
    this.template.querySelector('fieldset')?.appendChild(fragment);
    return stars;
  }

  private setScoreAndMent() {
    const score = this.template.querySelector('.star-score') as HTMLParagraphElement;
    score.textContent = `${this.score}`;
    const ment = this.template.querySelector('.score-ment') as HTMLParagraphElement;
    ment.textContent = MENT_BY_RATE[this.score];
  }

  private onMouseOver() {
    this.template.addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;
      if (target instanceof HTMLImageElement) {
        this.stars.forEach((star) => star.fillStars(Number(target.className)));
      } else {
        this.resetThisScore();
      }
    });
  }

  private onMouseLeave() {
    this.template.addEventListener('mouseleave', (event) => {
      const target = event.target as HTMLElement;
      if (target instanceof HTMLImageElement) {
        this.stars.forEach((star) => star.emptyStars(Number(target.className)));
      } else {
        this.resetThisScore();
      }
    });
  }

  private resetThisScore() {
    if (this.score === 0) {
      this.stars.forEach((star) => star.fillStars(0));
    } else {
      this.stars.forEach((star) => star.fillStars(this.score));
    }
  }
}

export default StarRating;
