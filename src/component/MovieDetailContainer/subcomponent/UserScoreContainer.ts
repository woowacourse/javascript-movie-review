import { CONFIG } from '../../../constant/config';
import { UserScoreParams } from '../../../interface/MovieInterface';

interface UserScoreContainerParams {
  movieId: number;
  userScore: number | null;
  updateUserScore: ({ movieId, userScore }: UserScoreParams) => void;
}

class UserScoreContainer {
  private movieId;
  private userScore;
  private updateUserScore;
  private container;
  private userScoreStars;
  private userScoreStarsContainer;
  private userScoreText;
  private userScoreDescription;

  constructor({ movieId, userScore, updateUserScore }: UserScoreContainerParams) {
    this.movieId = movieId;
    this.userScore = userScore;
    this.updateUserScore = updateUserScore;

    this.container = document.createElement('div');
    this.container.classList.add('user-score-container');

    this.userScoreStars = this.createUserScoreStars();
    this.userScoreStarsContainer = this.createUserScoreStarsContainer();
    this.userScoreText = this.createUserScoreText();
    this.userScoreDescription = this.createUserScoreDescription();

    this.initContainer();
  }

  initContainer() {
    const userScoreTitle = document.createElement('span');
    userScoreTitle.classList.add('user-score-title');
    userScoreTitle.textContent = '내 별점';

    this.updateUserScoreStatus(this.userScore);

    this.container.append(userScoreTitle, this.userScoreStarsContainer, this.userScoreText, this.userScoreDescription);
  }

  updateUserScoreStatus(userScore: number | null) {
    this.updateUserScoreStars(userScore);
    this.updateUserScoreText(userScore);
    this.updateUserScoreDescription(userScore);
  }

  getUserScoreArray(userScore: number | null) {
    return Array.from({ length: Object.keys(CONFIG.userScore).length }, (_, index) => {
      if (userScore && index < Math.floor(userScore / 2)) {
        return true;
      }
      return false;
    });
  }

  createUserScoreStars() {
    return Array.from({ length: Object.keys(CONFIG.userScore).length }, (_, index) => {
      const scoreForStar = (index + 1) * 2;
      const star = document.createElement('div');
      star.classList.add('user-score-star');
      star.id = `user-score-${scoreForStar}`;
      this.addEventUserScoreStars(star, index);
      return star;
    });
  }

  createUserScoreStarsContainer() {
    const userScoreStarsContainer = document.createElement('div');
    userScoreStarsContainer.classList.add('star-icons');
    userScoreStarsContainer.append(...this.userScoreStars);
    return userScoreStarsContainer;
  }

  createUserScoreText() {
    const userScoreText = document.createElement('span');
    userScoreText.classList.add('user-score');
    return userScoreText;
  }

  createUserScoreDescription() {
    const userScoreDescription = document.createElement('span');
    userScoreDescription.classList.add('user-score-description');
    return userScoreDescription;
  }

  updateUserScoreStars(userScore: number | null) {
    const userScoreArray = this.getUserScoreArray(userScore);
    this.userScoreStars.forEach((star, index) => {
      if (userScoreArray[index]) star.classList.add('filled');
      else star.classList.remove('filled');
    });
  }

  updateUserScoreText(userScore: number | null) {
    this.userScoreText.textContent = userScore?.toString() || '0';
  }

  updateUserScoreDescription(userScore: number | null) {
    const userScoreMap = new Map(Object.entries(CONFIG.userScore).map(([key, value]) => [parseInt(key), value]));
    if (userScore !== null && userScoreMap.has(userScore)) {
      this.userScoreDescription.textContent = userScoreMap.get(userScore) ?? '별점을 남겨주세요!';
      return;
    }
    this.userScoreDescription.textContent = '별점을 남겨주세요!';
  }

  addEventUserScoreStars(star: HTMLDivElement, index: number) {
    const scoreForStar = (index + 1) & 2;
    star.addEventListener('click', () => this.handleClickUserScoreStar(scoreForStar));
    star.addEventListener('mouseenter', () => this.updateUserScoreStatus(scoreForStar));
    star.addEventListener('mouseleave', () => this.updateUserScoreStatus(this.userScore));
  }

  handleClickUserScoreStar(userScore: number) {
    this.setUserScore(userScore);
    this.updateUserScoreStatus(this.userScore);
    this.updateUserScore({ movieId: this.movieId, userScore });
  }

  setUserScore(userScore: number) {
    this.userScore = userScore;
  }

  render() {
    return this.container;
  }
}

export default UserScoreContainer;
