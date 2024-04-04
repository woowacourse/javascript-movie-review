import { $, $$ } from '../util/selector';
import starUnfilledIcon from '../asset/star_empty.png';
import starFilledIcon from '../asset/star_filled.png';
import { MovieUserServiceType } from '../domain/MovieUserServiceType';

const STAR_COUNT = 5;
const STAR_SCORE_DESCRIPTION = ['최악이예요', '별로예요', '보통이에요', '재미있어요', '명작이에요'];

class ScoreStar {
  private $container;
  private api;
  private movieId;

  constructor(api: MovieUserServiceType) {
    this.api = api;
    this.movieId = parseInt($('.movie-detail-modal')?.id);

    this.$container = document.createElement('div');
    this.$container.classList.add('score-star');
    this.render();

    const socketElement = $<HTMLDivElement>('.score-star');
    if (socketElement.parentNode) socketElement.parentNode.replaceChild(this.$container, socketElement);

    this.attachEventListener();
  }

  private render() {
    const storedStarScore = this.api.getMovieUserData(this.movieId)?.starScore || 0;

    this.$container.innerHTML = `
    <div>내 별점</div>
    <ul class='star-list'>
      ${new Array(STAR_COUNT)
        .fill(0)
        .map((_, i) => `<li id=${i}><img src='${storedStarScore / 2 > i ? starFilledIcon : starUnfilledIcon}'/></li>`)
        .join('')}
    </ul>
    ${storedStarScore ? `<div class='selected-star-score'>${storedStarScore}</div>` : ''}
    <div class='selected-star-score-description'>
        ${storedStarScore === 0 ? '별점을 남겨주세요' : STAR_SCORE_DESCRIPTION[storedStarScore / 2 - 1]}
    </div>
    `;
  }

  private attachEventListener() {
    const ul$ = $('ul', this.$container);

    // mouseover는 pc이용 시 혼란가능성 존재(별점을 확정하려면 마우스를 ul의 밖인 위나 아래로 빼야하기에)
    // ref) 네이버웹툰, 쿠팡, ye5s24

    // TODO: 리펙터링
    ul$?.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;

      const selectedLi$ = event.target.closest('li');
      const selectedStarId = parseInt(selectedLi$?.id || '0');

      this.updateStarIcon(ul$, selectedStarId);
      this.updateScore(selectedStarId);
      this.updateDescription(selectedStarId);
      this.updateStarScoreData();
    });
  }

  private updateScore(selectedStarId: number) {
    // 점수 변화
    const score$ = $('.selected-star-score', this.$container);
    score$.textContent = ((selectedStarId + 1) * 2).toString();
  }

  private updateStarIcon(ul$: HTMLElement, selectedStarId: number) {
    const starList = $$<HTMLImageElement>('img', ul$);

    new Array(STAR_COUNT).fill(0).forEach((_, i) => {
      if (i <= selectedStarId) {
        starList[i].src = starFilledIcon;
      } else starList[i].src = starUnfilledIcon;
    });
  }

  private updateDescription(selectedStarId: number) {
    const scoreDescription$ = $('.selected-star-score-description', this.$container);
    scoreDescription$.textContent = STAR_SCORE_DESCRIPTION[selectedStarId];
  }

  private updateStarScoreData() {
    const selectedStarScore = parseInt($('.selected-star-score', this.$container).innerText) || 0;
    this.api.setMovieUserData({ movieId: this.movieId, movieData: { starScore: selectedStarScore } });
  }
}

export default ScoreStar;
