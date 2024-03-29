import './UserScoreBox.css';
import StarEmptyIcon from '../../assets/star_empty.png';
import StarFillIcon from '../../assets/star_filled.png';
import { VOTE_MESSAGE } from '../../consts/message';
import ScoreDBService from '../../domain/services/ScoreDBService';
import { getUrlParams } from '../../utils/queryString';

class UserScoreBox {
  score: number;
  starVoteBox;
  starAndInfoBox;
  movieId;

  constructor() {
    this.movieId = getUrlParams('movie_id');
    this.score = ScoreDBService.getScore(Number(this.movieId)) || 0;
    this.starVoteBox = document.createElement('div');
    this.starVoteBox.id = 'star-vote-box';
    this.starAndInfoBox = document.createElement('div');
    this.starAndInfoBox.id = 'star-with-info-box';

    this.getOriginalUserScore();
    this.render();

    this.setEvent();
  }

  setEvent() {
    this.addClickStarEvent();
  }

  getOriginalUserScore() {
    const userScore = ScoreDBService.getScore(Number(this.movieId));
    console.log('userScore', userScore);
    // this.score = ScoreDBService.getScore(Number(this.movieId));
  }

  render() {
    const scoreTitle = document.createElement('span');
    scoreTitle.textContent = '내 별점';
    scoreTitle.id = 'score-title';

    this.starVoteBox.append(scoreTitle);

    this.createStarsByScore();
    this.createScoreInfo();

    const detailBox = document.querySelector('#movie-info-detail-box');
    if (!detailBox) return;

    detailBox.append(this.starVoteBox);
  }

  createStarsByScore() {
    const filledStars = Array(this.score).fill(StarFillIcon);
    const emptyStars = Array(5 - this.score).fill(StarEmptyIcon);

    const stars = [...filledStars, ...emptyStars];

    const fragment = new DocumentFragment();

    stars.forEach((star, i) => {
      const starIcon = document.createElement('img');
      starIcon.classList.add('star');
      starIcon.dataset.score = String(i + 1);
      starIcon.setAttribute('src', star);
      fragment.append(starIcon);
    });

    this.starVoteBox.append(fragment);
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
    this.starVoteBox.append(scoreInfo);
  }

  addClickStarEvent() {
    const stars = document.querySelectorAll('.star');
    [...stars].forEach(star => {
      if (star) {
        star.addEventListener('click', (e: Event) => {
          const userScore = Number((e.currentTarget as HTMLElement).dataset.score);
          this.score = userScore;
          this.updateStars(this.score);
          this.updateScoreInfo(this.score);
          ScoreDBService.updateScore({ movieId: Number(this.movieId), newScore: this.score });
        });
      }
    });
  }

  updateStars(userScore: number) {
    const stars = document.querySelectorAll('.star');
    [...stars].forEach((star, i) => {
      if (i + 1 <= userScore) {
        star.setAttribute('src', StarFillIcon);
      } else {
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
