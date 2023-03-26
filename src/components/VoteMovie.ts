import starEmpty from '../asset/star_empty.png';
import starFilled from '../asset/star_filled.png';
import handleLocalStorage from '../libs/handleLocalStorage';

class VoteMovie {
  private _node!: HTMLElement;
  private scores = [0, 1, 2, 3, 4, 5] as const;
  private voteResults = [
    '이 영화 어떤가요?',
    '최악이예요',
    '별로예요',
    '보통이에요',
    '재미있어요',
    '명작이에요',
  ] as const;
  private score: (typeof this.scores)[number] = 0;
  private movieId: number | null = null;

  constructor(movieId: number) {
    this.score = handleLocalStorage.getMovieStar(movieId) as 0 | 1 | 2 | 3 | 4 | 5;
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
      ` <div>내 별점</div>
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

    const hoverStarCount = Number(star.dataset.starCount) as 1 | 2 | 3 | 4 | 5;
    this.insertStar(hoverStarCount);
  }

  leaveStarIcon() {
    this.insertStar(this.score);
  }

  toggleVoteStar(event: Event) {
    const star = event.target as HTMLImageElement;

    if (!star.matches('.vote-star')) return;

    const starCount = Number(star.dataset.starCount) as 1 | 2 | 3 | 4 | 5;

    if (this.score === starCount) {
      this.cancelVoteStar();
    } else {
      this.registerVoteStar(starCount);
    }
  }

  registerVoteStar(starCount: 1 | 2 | 3 | 4 | 5) {
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
