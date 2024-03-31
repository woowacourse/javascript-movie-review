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

  constructor({ movie, onClose, onUpdateUserScore }: MovieDetailContainerParams) {
    this.movie = movie;
    this.userScore = movie.userScore;
    this.onClose = onClose;
    this.onUpdateUserScore = onUpdateUserScore;
    this.container = document.createElement('div');
    this.container.id = 'modal__movie-detail';
    this.initialize();
  }

  initialize() {
    this.render();
  }

  createTitleSection() {
    const titleSection = document.createElement('section');
    titleSection.id = 'modal__movie-detail-title';

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = this.movie.title;

    const closeButton = createButton({
      options: { type: 'button', id: 'modal__movie-detail-close-button', textContent: '' },
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
    contentSection.id = 'modal__movie-detail-content';

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

  createMovieInfoBox() {
    const movieInfoBox = document.createElement('div');
    movieInfoBox.classList.add('movie-info-box');

    const movieInfo = document.createElement('p');
    movieInfo.classList.add('movie-info');
    movieInfo.textContent = this.movie.genres.join(', ');

    const averageScore = document.createElement('span');
    averageScore.classList.add('average-score');
    averageScore.textContent = this.movie.voteAverage.toFixed(CONFIG.userScoreDecimalPlaces).toString();

    const movieOverview = document.createElement('p');
    movieOverview.classList.add('movie-overview');
    movieOverview.textContent = this.movie.overview;

    movieInfo.append(averageScore);
    movieInfoBox.append(movieInfo, movieOverview);
    return movieInfoBox;
  }

  createUserScoreContainer() {
    const userScoreContainer = document.createElement('div');
    userScoreContainer.id = 'modal__movie-detail-user-score';

    const userScoreTitle = document.createElement('span');
    userScoreTitle.classList.add('user-score-title');
    userScoreTitle.textContent = '내 별점';
    const userScoreStarsContainer = this.createUserScoreStarsContainer();
    const userScoreDescriptionSet = this.createUserScoreDescriptionSet();

    userScoreContainer.append(userScoreTitle, userScoreStarsContainer, ...userScoreDescriptionSet);
    return userScoreContainer;
  }

  renderUpdatedUserScore() {
    const userScoreStarsContainer = this.createUserScoreStarsContainer();
    const userScoreDescriptionSet = this.createUserScoreDescriptionSet();

    const userScoreContainer = $('#modal__movie-detail-user-score', this.container);
    userScoreContainer.innerHTML = '';

    const userScoreTitle = document.createElement('span');
    userScoreTitle.classList.add('user-score-title');
    userScoreTitle.textContent = '내 별점';

    userScoreContainer.append(userScoreTitle, userScoreStarsContainer, ...userScoreDescriptionSet);
  }

  createUserScoreStarsContainer() {
    const starsFillStates = Array.from({ length: Object.keys(CONFIG.userScore).length }, (_, index) => {
      if (this.userScore && index < Math.floor(this.userScore / 2)) {
        return true;
      }
      return false;
    });

    const userScoreStarsContainer = this.createUserScoreStars(starsFillStates);
    return userScoreStarsContainer;
  }

  createUserScoreStars(states: boolean[]) {
    const userScoreStars = document.createElement('div');
    userScoreStars.classList.add('star-icons');

    const starElements = states.map((state, index) => {
      const star = document.createElement('div');
      star.classList.add('user-score-star');
      if (state) star.classList.add('filled');
      return star;
    });

    userScoreStars.append(...starElements);
    return userScoreStars;
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
    this.renderUpdatedUserScore();
    this.onUpdateUserScore({ movieId: this.movie.id, userScore });
  }

  render() {
    const titleSection = this.createTitleSection();
    const contentSection = this.createContentSection();

    if (!this.container.hasChildNodes()) {
      this.container.append(titleSection, contentSection);
      return this.container;
    }

    $('#modal__movie-detail-content', this.container).replaceWith(contentSection);
    return this.container;
  }
}

export default MovieDetailContainer;
