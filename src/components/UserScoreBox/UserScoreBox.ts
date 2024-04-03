import './UserScoreBox.css';
import StarEmptyIcon from '../../assets/star_empty.png';
import StarFillIcon from '../../assets/star_filled.png';
import { SCORE_MESSAGE, VOTE_MESSAGE } from '../../consts/message';
import ScoreDBService from '../../domain/services/ScoreDBService';
import { getUrlParams } from '../../utils/queryString';
import Toast from '../Toast/Toast';
import { debounce } from '../../utils/debounce';

class UserScoreBox {
  score: number;
  userVoteBox;
  starAndInfoBox;
  movieId;

  constructor() {
    this.movieId = getUrlParams('movie_id');
    this.score = ScoreDBService.getScore(Number(this.movieId)) || 0;
    this.userVoteBox = document.createElement('div');
    this.userVoteBox.id = 'user-vote-box';
    this.starAndInfoBox = document.createElement('div');
    this.starAndInfoBox.id = 'star-with-info-box';

    this.getOriginalUserScore();
    this.render();

    this.setEvent();
  }

  setEvent() {
    this.setClickStarsEvent();
  }

  getOriginalUserScore() {
    this.score = ScoreDBService.getScore(Number(this.movieId));
  }

  render() {
    const scoreTitle = document.createElement('span');
    scoreTitle.textContent = '내 별점';
    scoreTitle.id = 'score-title';

    this.userVoteBox.append(scoreTitle);

    this.createStarsByScore();
    this.createScoreInfo();

    const detailBox = document.querySelector('#movie-info-detail-box');
    if (!detailBox) return;

    detailBox.append(this.userVoteBox);
  }

  createStarsByScore() {
    const filledStars = Array(this.score).fill(StarFillIcon);
    const emptyStars = Array(5 - this.score).fill(StarEmptyIcon);

    const stars = [...filledStars, ...emptyStars];

    const fragment = new DocumentFragment();

    stars.forEach((star, i) => {
      const starIcon = document.createElement('img');
      starIcon.classList.add('star');
      star === StarFillIcon ? starIcon.classList.add('filled-star') : starIcon.classList.add('empty-star');
      starIcon.dataset.score = String(i + 1);
      starIcon.setAttribute('src', star);
      fragment.append(starIcon);
    });

    this.userVoteBox.append(fragment);
  }

  createScoreInfo() {
    const scoreInfo = document.createElement('span');
    scoreInfo.id = 'score-info';

    const scoreNumber = document.createElement('span');
    const scoreText = document.createElement('span');

    scoreNumber.id = 'score-number';
    scoreText.id = 'score-text';

    if (this.score) {
      scoreNumber.textContent = String(this.score * 2);
    }

    scoreText.textContent = VOTE_MESSAGE[String(this.score)];
    scoreInfo.append(scoreNumber);
    scoreInfo.append(scoreText);
    this.userVoteBox.append(scoreInfo);
  }

  setClickStarsEvent() {
    const stars = [...document.querySelectorAll('.star')];

    const saveScoreEvent = debounce(() => {
      ScoreDBService.updateScore({ movieId: Number(this.movieId), newScore: this.score });
      new Toast(SCORE_MESSAGE);
    }, 1000);

    stars.forEach(star => {
      star.addEventListener('click', (e: Event) => {
        const userScore = Number((e.currentTarget as HTMLElement).dataset.score);
        this.updateScoreView(userScore);

        saveScoreEvent();
      });
    });
  }

  updateScoreView(userScore: number) {
    this.score = userScore;
    this.updateStars(this.score);
    this.updateScoreInfo(this.score);
  }

  updateStars(userScore: number) {
    const stars = document.querySelectorAll('.star');

    [...stars].forEach((star, i) => {
      star.classList.remove('filled-star', 'empty-star');

      if (i + 1 <= userScore) {
        star.classList.add('filled-star');
        star.setAttribute('src', StarFillIcon);
      } else {
        star.classList.add('empty-star');
        star.setAttribute('src', StarEmptyIcon);
      }
    });
  }

  updateScoreInfo(userScore: number) {
    const scoreNumber = document.querySelector('#score-number');
    const scoreText = document.querySelector('#score-text');

    if (!scoreNumber) return;
    if (!scoreText) return;

    scoreNumber.textContent = String(userScore * 2);
    scoreText.textContent = VOTE_MESSAGE[String(userScore)];
  }
}

export default UserScoreBox;
