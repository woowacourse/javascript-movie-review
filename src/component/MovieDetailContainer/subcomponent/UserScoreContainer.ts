import { CONFIG } from '../../../constant/config';
import { UserScoreParams, UserScoreType } from '../../../interface/MovieInterface';

interface UserScoreContainerParams {
  movieId: number;
  userScore: UserScoreType | null;
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

  updateUserScoreStatus(userScore: UserScoreType | null) {
    this.updateUserScoreStars(userScore);
    this.updateUserScoreText(userScore);
    this.updateUserScoreDescription(userScore);
  }

  updateUserScoreStars(userScore: UserScoreType | null) {
    const userScoreArray = this.getUserScoreArray(userScore);
    this.userScoreStars.forEach((star, index) => {
      if (userScoreArray[index]) star.classList.add('filled');
      else star.classList.remove('filled');
    });
  }

  updateUserScoreText(userScore: UserScoreType | null) {
    this.userScoreText.textContent = userScore?.toString() || '0';
  }

  updateUserScoreDescription(userScore: UserScoreType | null) {
    if (userScore !== null && userScore in CONFIG.userScore) {
      this.userScoreDescription.textContent = CONFIG.userScore[userScore] ?? '별점을 남겨주세요!';
      return;
    }
    this.userScoreDescription.textContent = '별점을 남겨주세요!';
  }

  getUserScoreArray(userScore: UserScoreType | null) {
    return Array.from({ length: Object.keys(CONFIG.userScore).length }, (_, index) => {
      if (userScore && index < Math.floor(userScore / 2)) {
        return true;
      }
      return false;
    });
  }

  getUserScoreByStarIndex(index: number) {
    const userScore = (index + 1) * 2;
    if (userScore in CONFIG.userScore) {
      return userScore as keyof typeof CONFIG.userScore;
    }
    return null;
  }

  addEventUserScoreStars(star: HTMLDivElement, index: number) {
    const userScore = this.getUserScoreByStarIndex(index);
    if (userScore) {
      star.addEventListener('click', () => this.handleClickUserScoreStar(userScore));
      star.addEventListener('mouseenter', () => this.updateUserScoreStatus(userScore));
      star.addEventListener('mouseleave', () => this.updateUserScoreStatus(this.userScore));
    }
  }

  createUserScoreStars() {
    return Array.from({ length: Object.keys(CONFIG.userScore).length }, (_, index) => {
      const scoreForStar = this.getUserScoreByStarIndex(index);
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

  handleClickUserScoreStar(userScore: UserScoreType) {
    this.setUserScore(userScore);
    this.updateUserScoreStatus(this.userScore);
    this.updateUserScore({ movieId: this.movieId, userScore });
  }

  setUserScore(userScore: UserScoreType) {
    this.userScore = userScore;
  }

  render() {
    return this.container;
  }
}

export default UserScoreContainer;
