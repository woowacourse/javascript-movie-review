import { LARGE_STAR_EMPTY, LARGE_STAR_FILLED } from '../../../assets/svg';
import { VOTE_MESSAGE } from '../../constants';
import { dispatchCustomEvent } from '../../utils/domUtils';

class VoteArea extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const voteUnits = [2, 4, 6, 8, 10];
    const myVote = Number(this.getAttribute('my-vote')) ?? 0;
    this.innerHTML = /* html */ `
      <div class="vote-area">
        내 별점
        <div class="star-area">
          ${voteUnits
            .map(
              (voteUnit) => /* html */ `
                <span class="star" voteUnit="${voteUnit}">
                  ${myVote >= voteUnit ? LARGE_STAR_FILLED : LARGE_STAR_EMPTY}
                </span>
              `
            )
            .join('')}
        </div>
        <span class="vote-message">
          ${VOTE_MESSAGE[myVote]}
        </span>
      </div>
    `;
  }

  connectedCallback() {
    this.querySelectorAll('.star')?.forEach(($element) => {
      $element.addEventListener('click', this.onClickStar);
    });
  }

  onClickStar = (e: Event) => {
    if (!(e.currentTarget instanceof HTMLSpanElement)) return;

    dispatchCustomEvent(this, 'vote', {
      id: this.getAttribute('id'),
      myVote: e.currentTarget.getAttribute('voteUnit'),
    });
  };
}

export default VoteArea;
