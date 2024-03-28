import './StarVoteBox.css';
import StarEmptyIcon from '../../assets/star_empty.png';
import { VOTE_MESSAGE } from '../../consts/message';

class StarVoteBox {
  score: number;
  starVoteBox;
  starContainer;

  constructor(score = 0) {
    this.score = score;
    this.starVoteBox = document.createElement('div');
    this.starVoteBox.id = 'star-vote-box';
    this.starContainer = document.createElement('div');
    this.starContainer.id = 'stars-container';

    this.setEvent();
  }

  render() {
    const voteTitle = document.createElement('span');
    voteTitle.textContent = '내 별점';

    this.starVoteBox.append(voteTitle);
    this.renderStars();
    this.renderScoreInfo();

    return this.starVoteBox;
  }

  renderScoreInfo() {
    const scoreInfo = document.createElement('span');
    scoreInfo.id = 'score-info';

    if (!this.score) {
      scoreInfo.textContent = '평점을 매겨주세요!';
    } else {
      scoreInfo.textContent = String(this.score * 2) + VOTE_MESSAGE[String(this.score)];
    }
    this.starVoteBox.append(scoreInfo);
  }

  renderStars() {
    // const starsContainer = document.createElement('div');
    // starsContainer.id = 'stars-container';

    const fragment = new DocumentFragment();

    Array.from({ length: 5 }).forEach((e, i) => {
      const starIcon = document.createElement('img');
      starIcon.classList.add('star-empty', 'star');
      starIcon.setAttribute('src', StarEmptyIcon);
      starIcon.dataset.scoreNumber = String(i + 1);
      fragment.append(starIcon);
    });

    this.starContainer.append(fragment);
    this.starVoteBox.append(this.starContainer);
  }

  setEvent() {
    const stars = document.querySelectorAll('star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        console.log('a');
      });
    });
  }
}

export default StarVoteBox;
