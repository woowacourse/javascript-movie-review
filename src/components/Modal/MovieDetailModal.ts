import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no-image.png';
import './MovieDetailModal.css';
import { MovieDetailAPI } from '../../domain/services/API.type';
import { POSTER_BASE_URL } from '../../consts/Api';
import StarEmpty from '../../assets/star_empty.png';
import StarFilled from '../../assets/star_filled.png';
import UserRatingStore from '../../domain/services/UserRatingStore';
import { RATING_SCORE, RATING_STAR_SIZE } from '../../consts/userRating';

type Score = 0 | 2 | 4 | 6 | 8 | 10;

class MovieDetailModal {
  movieId: number = 0;
  movieScore: Score = 0;
  modal = document.createElement('div');

  constructor() {
    this.render();
    this.mount();
    this.setModalEvents();
  }

  render() {
    const backdrop = document.createElement('div');
    const container = document.createElement('div');

    this.modal.classList.add('modal');
    backdrop.classList.add('modal-backdrop');
    container.classList.add('movie-detail-container');

    this.modal.appendChild(backdrop);

    const detailTitle = document.createElement('h2');
    detailTitle.classList.add('detail-title');
    container.append(detailTitle);

    const detailCloseButton = document.createElement('button');
    detailCloseButton.classList.add('detail-close-button');
    detailCloseButton.textContent = 'X';
    container.append(detailCloseButton);

    const detailBox = document.createElement('div');
    detailBox.classList.add('detail-box');

    const detailImage = document.createElement('img');
    detailImage.classList.add('detail-image');

    detailBox.append(detailImage);

    const detailInfo = document.createElement('div');
    detailInfo.classList.add('detail-info');

    const detailPropertyBox = document.createElement('div');
    detailPropertyBox.classList.add('detail-property-box');

    const detailGenreAndScore = document.createElement('div');
    detailGenreAndScore.classList.add('detail-genre-and-score');

    const detailGenre = document.createElement('p');
    detailGenre.classList.add('detail-genre');
    detailGenreAndScore.append(detailGenre);

    const detailScoreBox = document.createElement('div');
    detailScoreBox.classList.add('detail-score-box');

    const detailScoreIcon = document.createElement('img');
    detailScoreIcon.setAttribute('src', Star);
    detailScoreBox.append(detailScoreIcon);

    const detailScore = document.createElement('p');
    detailScore.classList.add('detail-score');
    detailScoreBox.append(detailScore);

    detailGenreAndScore.append(detailScoreBox);
    detailInfo.append(detailGenreAndScore);

    const detailDescription = document.createElement('p');
    detailDescription.classList.add('detail-description');

    detailPropertyBox.append(detailGenreAndScore);
    detailPropertyBox.append(detailDescription);

    detailInfo.append(detailPropertyBox);

    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');

    const ratingCaption = document.createElement('p');
    ratingCaption.classList.add('rating-caption');
    ratingCaption.textContent = '내 별점';
    ratingContainer.append(ratingCaption);

    const ratingStarBox = document.createElement('div');

    ratingContainer.append(ratingStarBox);
    ratingStarBox.classList.add('rating-star-box');

    this.drawStar();

    const ratingScoreText = document.createElement('p');
    ratingScoreText.classList.add('rating-score-text');
    ratingScoreText.textContent = `${this.movieScore} ${RATING_SCORE[this.movieScore]}`;
    ratingContainer.append(ratingScoreText);

    detailInfo.append(ratingContainer);

    detailBox.append(detailInfo);

    container.append(detailTitle);
    container.append(detailBox);

    this.modal.appendChild(container);
  }

  mount() {
    const target = document.querySelector('main');
    if (!target) return;
    target.append(this.modal);
  }

  rerender(movieData: MovieDetailAPI) {
    const detailTitle = this.modal.querySelector('.detail-title');
    const detailImage = this.modal.querySelector('.detail-image');
    const detailGenre = this.modal.querySelector('.detail-genre');
    const detailScore = this.modal.querySelector('.detail-score');
    const detailDescription = this.modal.querySelector('.detail-description');

    if (detailTitle) detailTitle.textContent = movieData.title;
    if (detailImage) {
      detailImage.setAttribute('src', movieData.poster_path ? POSTER_BASE_URL + movieData.poster_path : NoImage);
    }
    if (detailGenre) detailGenre.textContent = movieData.genres.map(genre => genre.name).join(', ');
    if (detailScore) detailScore.textContent = String(movieData.vote_average);
    if (detailDescription) detailDescription.textContent = movieData.overview;

    const userRatingList = UserRatingStore.fetch();
    const isRatedMovie = userRatingList.some(rating => rating.movieId === movieData.id);

    this.movieScore = isRatedMovie
      ? (userRatingList.find(rating => rating.movieId === movieData.id)?.rateScore as Score)
      : 0;
    this.movieId = movieData.id;

    this.drawStar();
  }

  drawStar() {
    const fragment = new DocumentFragment();

    for (let i = 1; i <= RATING_STAR_SIZE; i++) {
      const star = document.createElement('img');
      star.classList.add('rate-star');
      if (this.movieScore / 2 >= i) star.setAttribute('src', StarFilled);
      else star.setAttribute('src', StarEmpty);
      fragment.append(star);
    }

    const ratingStarBox = this.modal.querySelector('.rating-star-box');
    if (!ratingStarBox) return;
    ratingStarBox.replaceChildren(fragment);

    const ratingText = this.modal.querySelector('.rating-score-text');
    if (ratingText) {
      ratingText.textContent = `${this.movieScore} ${RATING_SCORE[this.movieScore]}`;
    }

    this.setStarEvents();
  }

  setStarEvents() {
    const starImages = Array.from(this.modal.querySelectorAll('.rate-star'));
    starImages.forEach((star, index) => {
      star.addEventListener('click', () => {
        this.movieScore = ((index + 1) * 2) as Score;
        UserRatingStore.store(this.movieId, this.movieScore);
        this.drawStar();
      });
    });
  }

  setModalEvents() {
    const backdrop = this.modal.querySelector('.modal-backdrop');
    if (!backdrop) return;
    backdrop.addEventListener('click', () => this.toggle());

    const closeButton = this.modal.querySelector('.detail-close-button');
    if (!closeButton) return;
    closeButton.addEventListener('click', () => this.close());

    window.addEventListener('keydown', this.handleModalCloseWithKey.bind(this));
  }

  handleModalCloseWithKey(e: KeyboardEvent) {
    if (e.key === 'Escape') this.close();
  }

  toggle() {
    if (this.modal.classList.contains('modal--open')) {
      this.modal.classList.remove('modal--open');
      document.body.classList.remove('stop-scroll');
    } else {
      this.modal.classList.add('modal--open');
      document.body.classList.add('stop-scroll');
    }
  }

  close() {
    this.modal.classList.remove('modal--open');
    window.removeEventListener('keydown', this.handleModalCloseWithKey.bind(this));
  }
}

export default MovieDetailModal;
