import filledStar from '../../images/star_filled.png';
import emptyStar from '../../images/star_empty.png';
import { SCORE_MESSAGE } from '../../constants/constant';
export class RecommendStar {
  private current: number;
  private total: number;
  private stars: HTMLImageElement[];
  constructor(total: number) {
    this.current = 0;
    this.total = total;
    this.stars = Array.from({ length: this.total }, (_, index) => {
      const star = document.createElement('img');
      star.className = 'recommend-star';
      star.src = emptyStar;
      return star;
    });
  }
  createRecommendStar() {
    const recommendStar = this.render();

    return recommendStar;
  }

  render() {
    const recommendStarBox = document.createElement('div');
    recommendStarBox.className = 'recommend-star-box';

    const span = document.createElement('span');
    span.textContent = '별점';

    const starBox = document.createElement('div');
    starBox.className = 'star-box';

    const recommendScore = document.createElement('span');

    const recommendMessage = document.createElement('span');

    starBox.append(...this.stars);
    recommendStarBox.append(span, starBox, recommendScore, recommendMessage);
    this.stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        this.current = index;
        this.reRenderStar();
        this.reRenderScore(recommendScore);
        this.reRenderScoreMessage(recommendMessage);
      });
    });
    return recommendStarBox;
  }

  reRenderStar() {
    this.stars.forEach((element, index) => {
      if (index <= this.current) {
        element.src = filledStar;
        return;
      }
      element.src = emptyStar;
    });
  }

  reRenderScore(recommendScore: HTMLElement) {
    recommendScore.textContent = ((this.current + 1) * 2).toString();
  }
  reRenderScoreMessage(recommendMessage: HTMLElement) {
    recommendMessage.textContent = SCORE_MESSAGE[(this.current + 1) * 2];
  }
}
