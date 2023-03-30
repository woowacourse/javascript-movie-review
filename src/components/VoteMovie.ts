import starEmpty from '../asset/star_empty.png';
import starFilled from '../asset/star_filled.png';
import { RATING } from '../constant/constant';
import handleLocalStorage from '../libs/handleLocalStorage';

type Score = VoteMovie['scores'][number];

class VoteMovie {
  private _node!: HTMLElement;
  private scores = [RATING.DEFAULT, RATING.WORST, RATING.BAD, RATING.AVERAGE, RATING.FUN, RATING.MASTERPIECE] as const;
  private voteResults = [
    '이 영화 어떤가요?',
    '최악이예요',
    '별로예요',
    '보통이에요',
    '재미있어요',
    '명작이에요',
  ] as const;
  private score: Score = 0;
  private movieId: number | null = null;

  constructor(movieId: number) {
    this.score = handleLocalStorage.getMovieStar(movieId) as Score;
    this.movieId = movieId;

    this.createTemplate();
    this.insertStar(this.score);
    this.initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('div');
    this._node.classList.add('movie-detail-voteContainer');

    this._node.insertAdjacentHTML(
      'afterbegin',
      /*html*/ ` <div>내 별점</div>
        <div class="voted-star-container">
        </div>
        <div class="voted-result">${this.calculateVotedResult()}</div>`
    );
  }

  calculateVotedResult() {
    const score = this.score > 0 ? this.score * 2 : '';
    return `<span>${score}</span><span class="voted-result-content">${this.voteResults[this.score]}<span>`;
  }

  insertStar(hoverStarCount: number) {
    const $voteStarContainer = this._node.querySelector<HTMLDivElement>('.voted-star-container');

    if (!$voteStarContainer) return;

    const starHTML = this.createStarNodes(hoverStarCount);

    $voteStarContainer.innerHTML = '';
    $voteStarContainer.insertAdjacentHTML('beforeend', starHTML);
  }

  createStarNodes(scoreCount: number) {
    return Array.from({ length: 5 }, (v, idx) => {
      if (scoreCount > idx)
        return `<img src="${starFilled}" class="vote-star" data-star-count=${idx + 1} alt="별점" />`;
      else return `<img src="${starEmpty}" class="vote-star" data-star-count=${idx + 1} alt="별점" />`;
    }).join('');
  }

  hoverStarIcon(event: Event) {
    const star = event.target as HTMLImageElement;

    if (!star.matches('.vote-star')) return;

    const hoverStarCount = Number(star.dataset.starCount) as Score;
    this.insertStar(hoverStarCount);
  }

  leaveStarIcon() {
    this.insertStar(this.score);
  }

  toggleVoteStar(event: Event) {
    const star = event.target as HTMLImageElement;

    if (!star.matches('.vote-star')) return;

    const starCount = Number(star.dataset.starCount) as Score;

    if (this.score === starCount) {
      this.cancelVoteStar();
    } else {
      this.registerVoteStar(starCount);
    }
  }

  registerVoteStar(starCount: Score) {
    const $votedResult = document.querySelector<HTMLDivElement>('.voted-result');

    if (!$votedResult || !this.movieId) return;

    handleLocalStorage.setMovieStar(this.movieId, starCount);
    this.score = starCount;
    this.insertStar(this.score);
    $votedResult.innerHTML = this.calculateVotedResult();
  }

  cancelVoteStar() {
    const $votedResult = document.querySelector<HTMLDivElement>('.voted-result');

    if (!$votedResult || !this.movieId) return;

    handleLocalStorage.setMovieStar(this.movieId, 0);
    this.score = 0;
    this.insertStar(this.score);
    $votedResult.innerHTML = this.calculateVotedResult();
  }

  initEventHandler() {
    const $votedStarContainer = this._node.querySelector<HTMLDivElement>('.voted-star-container');

    if (!$votedStarContainer) return;

    $votedStarContainer.addEventListener('mousemove', this.hoverStarIcon.bind(this));
    $votedStarContainer.addEventListener('mouseleave', this.leaveStarIcon.bind(this));
    $votedStarContainer.addEventListener('click', this.toggleVoteStar.bind(this));
  }
}

export default VoteMovie;
