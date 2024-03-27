import './style.css';

import { SETTING } from '../../constants/setting';

import StarFilled from '../../imgs/star_filled.png';
import StarEmpty from '../../imgs/star_empty.png';

const SCORE_LOOKUP_TABLE: Record<number, string> = {
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

class ScoreSelector {
  private template: HTMLElement;

  constructor() {
    this.template = this.createTemplate();
    this.setEventListener();
  }

  createTemplate() {
    const div = document.createElement('div');
    div.classList.add('score-selector');

    const myScoreTitle = document.createElement('p');
    myScoreTitle.classList.add('font-body-bold', 'my-score-title');
    myScoreTitle.textContent = '내 별점';

    const myScore = document.createElement('p');
    myScore.classList.add('font-body', 'my-score');

    const starContainer = this.createStarIconContainer();

    const scoreDetail = document.createElement('p');
    scoreDetail.classList.add('font-body', 'my-score-detail');
    scoreDetail.textContent = '별을 눌러주세요';

    div.appendChild(myScoreTitle);
    div.appendChild(starContainer);
    div.appendChild(myScore);
    div.appendChild(scoreDetail);

    return div;
  }

  createStarIconContainer() {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-icon-container');

    for (let i = 0; i < SETTING.scoreStarIcons; i++) {
      const starIcon = document.createElement('img');
      starIcon.src = StarEmpty;
      starIcon.classList.add('star-icon');
      starIcon.id = i + 1 + '';
      starContainer.appendChild(starIcon);
    }

    return starContainer;
  }

  getElement() {
    return this.template;
  }

  setEventListener() {
    this.template.querySelector('.star-icon-container')?.addEventListener('click', (event) => {
      this.handleStarIcons((event.target as HTMLElement).id);
      this.handleScoreDetail((event.target as HTMLElement).id);
    });
  }

  handleStarIcons(targetId: string) {
    const icons = this.template.querySelectorAll('.star-icon');
    icons.forEach((icon) => {
      if (icon.id <= targetId) {
        (icon as HTMLImageElement).src = StarFilled;
      } else {
        (icon as HTMLImageElement).src = StarEmpty;
      }
    });
  }

  handleScoreDetail(targetId: string) {
    const score = +targetId * 2;
    (this.template.querySelector('.my-score') as HTMLParagraphElement).textContent = score + '';
    (this.template.querySelector('.my-score-detail') as HTMLParagraphElement).textContent =
      SCORE_LOOKUP_TABLE[score];
  }

  reset() {
    const icons = this.template.querySelectorAll('.star-icon');
    icons.forEach((icon) => {
      (icon as HTMLImageElement).src = StarEmpty;
    });
    (this.template.querySelector('.my-score') as HTMLParagraphElement).textContent = '';
    (this.template.querySelector('.my-score-detail') as HTMLParagraphElement).textContent =
      '별을 눌러주세요';
  }
}

export default ScoreSelector;
