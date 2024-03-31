import { CONFIG } from '../constant/config';
import { MovieDetailData, UserScoreParams } from '../interface/MovieInterface';
import { $ } from '../util/selector';
import createButton from './Button';
import './MovieDetailContainer.css';

interface MovieDetailContainerParams {
  movie: MovieDetailData;
  onClose: () => void;
  onUpdateUserScore: ({ movieId, userScore }: UserScoreParams) => void;
}

class MovieDetailContainer {
  private movie;
  private userScore;
  private onClose;
  private onUpdateUserScore;
  private container;
  private userScoreStatusContainer;

  constructor({ movie, onClose, onUpdateUserScore }: MovieDetailContainerParams) {
    this.movie = movie;
    this.userScore = movie.userScore;
    this.onClose = onClose;
    this.onUpdateUserScore = onUpdateUserScore;

    this.container = document.createElement('div');
    this.container.id = 'modal__movie-detail';
    this.userScoreStatusContainer = document.createElement('div');
    this.userScoreStatusContainer.id = 'modal__movie-detail__user-score-status';
  }

  createTitleSection() {
    const titleSection = document.createElement('section');
    titleSection.id = 'modal__movie-detail__title';

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = this.movie.title;

    const closeButton = createButton({
      options: { type: 'button', id: 'modal__movie-detail__close-button', textContent: '' },
      eventType: {
        type: 'click',
        callbackFunction: () => this.onClose(),
      },
    });

    titleSection.append(title, closeButton);
    return titleSection;
  }

  createContentSection() {
    const contentSection = document.createElement('section');
    contentSection.id = 'modal__movie-detail__content';

    const posterImage = this.createPosterImage();
    const movieInfoContainer = this.createMovieInfoContainer();

    contentSection.append(posterImage, movieInfoContainer);
    return contentSection;
  }

  createPosterImage() {
    const posterImage = document.createElement('img');
    posterImage.classList.add('poster-image');
    posterImage.src = this.movie.posterPath;
    posterImage.title = this.movie.title;
    return posterImage;
  }

  createMovieInfoContainer() {
    const movieInfoContainer = document.createElement('div');
    movieInfoContainer.classList.add('movie-info-container');

    const movieInfoBox = this.createMovieInfoBox();
    const userScoreContainer = this.createUserScoreContainer();

    movieInfoContainer.append(movieInfoBox, userScoreContainer);
    return movieInfoContainer;
  }

  createUserScoreContainer() {
    const userScoreContainer = document.createElement('div');
    userScoreContainer.classList.add('user-score-container');

    const userScoreTitle = document.createElement('span');
    userScoreTitle.classList.add('user-score-title');
    userScoreTitle.textContent = '내 별점';

    this.updateUserScoreStatusContainer();
    userScoreContainer.append(userScoreTitle, this.userScoreStatusContainer);
    return userScoreContainer;
  }

  createMovieInfoBox() {
    const movieInfoBox = document.createElement('div');
    movieInfoBox.classList.add('movie-info-box');

    const movieInfo = this.createMovieInfo();

    const movieOverview = document.createElement('p');
    movieOverview.classList.add('movie-overview');
    movieOverview.textContent = this.movie.overview;

    movieInfoBox.append(movieInfo, movieOverview);
    return movieInfoBox;
  }

  createMovieInfo() {
    const movieInfo = document.createElement('p');
    movieInfo.classList.add('movie-info');
    movieInfo.textContent = this.movie.genres.join(', ');

    const averageScore = document.createElement('span');
    averageScore.classList.add('average-score');
    averageScore.textContent = this.movie.voteAverage.toFixed(CONFIG.userScoreDecimalPlaces).toString();

    movieInfo.append(averageScore);
    return movieInfo;
  }

  updateUserScoreStatusContainer() {
    this.userScoreStatusContainer.innerHTML = '';

    const userScoreStars = this.createUserScoreStars();
    const userScoreDescriptionSet = this.createUserScoreDescriptionSet();

    this.userScoreStatusContainer.append(userScoreStars, ...userScoreDescriptionSet);
  }

  createUserScoreStars() {
    const userScoreStars = document.createElement('div');
    userScoreStars.classList.add('star-icons');

    const starsFillStates = Array.from({ length: Object.keys(CONFIG.userScore).length }, (_, index) => {
      if (this.userScore && index < Math.floor(this.userScore / 2)) {
        return true;
      }
      return false;
    });

    const starElements = this.createStarElements(starsFillStates);
    userScoreStars.append(...starElements);
    return userScoreStars;
  }

  createStarElements(states: boolean[]) {
    const userScoreStars = document.createElement('div');
    userScoreStars.classList.add('star-icons');

    return states.map((state, index) => {
      const star = document.createElement('div');
      star.classList.add('user-score-star');
      if (state) star.classList.add('filled');
      star.addEventListener('click', () => {
        this.updateUserScore((index + 1) * 2);
      });
      return star;
    });
  }

  createUserScoreDescriptionSet() {
    const userScoreText = document.createElement('span');
    userScoreText.classList.add('user-score');
    userScoreText.textContent = this.userScore?.toString() || '0';

    const userScoreDescription = document.createElement('span');
    userScoreDescription.classList.add('user-score-description');
    userScoreDescription.textContent = this.getScoreDescription(this.userScore);

    return [userScoreText, userScoreDescription];
  }

  getScoreDescription(score: number | null) {
    const userScoreMap = new Map(Object.entries(CONFIG.userScore).map(([key, value]) => [parseInt(key), value]));

    if (score !== null && userScoreMap.has(score)) {
      return userScoreMap.get(score) ?? '별점을 남겨주세요!';
    }
    return '별점을 남겨주세요!';
  }

  updateUserScore(userScore: number) {
    this.userScore = userScore;
    this.updateUserScoreStatusContainer();
    this.onUpdateUserScore({ movieId: this.movie.id, userScore });
  }

  render() {
    const titleSection = this.createTitleSection();
    const contentSection = this.createContentSection();

    if (!this.container.hasChildNodes()) {
      this.container.append(titleSection, contentSection);
      return this.container;
    }

    $('#modal__movie-detail__content', this.container).replaceWith(contentSection);
    return this.container;
  }
}

export default MovieDetailContainer;
