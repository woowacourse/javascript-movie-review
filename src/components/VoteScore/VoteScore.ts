import './style.css';
import StarFilled from '../../imgs/star_filled.png';

const template = /* html */ `
  <p class="item-score"></p>
  <img class="star-icon" alt="별점" />
`;

class VoteScore {
  private template: HTMLDivElement;

  constructor(score: number) {
    this.template = this.createElements();
    this.setStarImage();
    this.setScore(score);
  }

  get element() {
    return this.template;
  }

  private createElements() {
    const itemScore = document.createElement('div');
    itemScore.className = 'item-score-container';
    itemScore.innerHTML = template;
    return itemScore;
  }

  private setStarImage() {
    this.template.querySelector('.star-icon')?.setAttribute('src', StarFilled);
  }

  private setScore(score: number) {
    const p = this.template.querySelector('p') as HTMLElement;
    p.textContent = `${score}`;
  }
}

export default VoteScore;
