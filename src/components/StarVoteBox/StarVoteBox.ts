import './StarVoteBox.css';
import StarEmptyIcon from '../../assets/star_empty.png';
import { VOTE_MESSAGE } from '../../consts/message';
import ScoreDBService from '../../domain/services/ScoreDBService';

class StarVoteBox {
  score;
  starVoteBox;
  starContainer;

  constructor() {
    this.score = new ScoreDBService().get();
    this.starVoteBox = document.createElement('div');
    this.starVoteBox.id = 'star-vote-box';
    this.starContainer = document.createElement('div');
    this.starContainer.id = 'stars-container';
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
      scoreInfo.textContent = String(this.score * 2) + VOTE_MESSAGE[String(this.score * 2)];
    }
    this.starVoteBox.append(scoreInfo);
  }

  renderStars() {
    const fragment = new DocumentFragment();

    Array.from({ length: 5 }).forEach((e, i) => {
      const starIcon = document.createElement('img');
      starIcon.classList.add('star-empty', 'star');
      starIcon.setAttribute('src', StarEmptyIcon);
      starIcon.dataset.scoreNumber = String((i + 1) * 2);

      starIcon.addEventListener('click', () => {
        console.log(starIcon.dataset.scoreNumber);
      });
      fragment.append(starIcon);
    });

    this.starContainer.append(fragment);
    this.starVoteBox.append(this.starContainer);
  }
}

export default StarVoteBox;
