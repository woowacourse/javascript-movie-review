import { VOTE } from '../constants';

import StarFilled from '../images/star_filled.png';
import StarEmpty from '../images/star_empty.png';

export default class VoteHandler {
  #movieId: number;

  #modalElement: HTMLElement | null = null;

  #myVoteResult: { [key: string]: number } = {};

  constructor(movieId: number, modalElement: HTMLElement | null) {
    this.#movieId = movieId;
    this.#modalElement = modalElement;

    const savedVotes = localStorage.getItem('myVoteResult');
    if (savedVotes) {
      this.#myVoteResult = JSON.parse(savedVotes);
    }
  }

  VoteHandler() {
    const savedVotes = localStorage.getItem('myVoteResult');
    const voteForMovie = savedVotes ? JSON.parse(savedVotes)[this.#movieId] : null;

    if (voteForMovie) {
      this.#updateVoteStar(voteForMovie);
      this.#updateVoteText(voteForMovie);
    }
  }

  #updateVoteStar(voteForMovie: number) {
    const starButtons = this.#modalElement?.querySelectorAll('.my-vote-body button img');

    if (!starButtons) return;

    starButtons.forEach((starButton, index) => {
      starButton.setAttribute('src', index < voteForMovie / 2 ? StarFilled : StarEmpty);
    });
  }

  #updateVoteText(voteForMovie: number) {
    const myVoteNumber = this.#modalElement?.querySelector('.my-vote-number');
    const myVoteDescription = this.#modalElement?.querySelector('.my-vote-description');

    if (!myVoteNumber || !myVoteDescription) return;

    myVoteNumber.textContent = voteForMovie.toString();
    myVoteDescription.textContent = VOTE[voteForMovie];
  }

  handleStarClick(starIndex: number) {
    const myVoteNumber = this.#modalElement?.querySelector('.my-vote-number');
    const myVoteDescription = this.#modalElement?.querySelector('.my-vote-description');

    if (!myVoteNumber || !myVoteDescription) return;

    const starButtons = this.#modalElement?.querySelectorAll('.my-vote-body button img');
    if (!starButtons) return;

    this.updateStarButtons(starButtons, starIndex);
    this.updateVoteInfo(myVoteNumber, myVoteDescription, starIndex);
  }

  updateStarButtons(starButtons: NodeListOf<Element>, starIndex: number) {
    starButtons.forEach((starButton, index) => {
      starButton.setAttribute('src', index <= starIndex ? StarFilled : StarEmpty);
    });
  }

  updateVoteInfo(myVoteNumber: Element, myVoteDescription: Element, starIndex: number) {
    const newMyVoteNumber = myVoteNumber as HTMLElement;
    const newMyVoteDescription = myVoteDescription as HTMLElement;

    const myVoteKey = (starIndex + 1) * 2;
    newMyVoteNumber.textContent = myVoteKey.toString();
    newMyVoteDescription.textContent = VOTE[myVoteKey];

    this.#myVoteResult[this.#movieId] = myVoteKey;
    localStorage.setItem('myVoteResult', JSON.stringify(this.#myVoteResult));
  }
}
