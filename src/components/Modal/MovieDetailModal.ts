import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no-image.png';
import './MovieDetailModal.css';
import { MovieDetailAPI } from '../../domain/services/API.type';
import { POSTER_BASE_URL } from '../../consts/Api';

class MovieDetailModal {
  modal = document.createElement('div');

  constructor() {
    this.render();
    this.mount();
    this.setEvents();
  }

  render() {
    const backdrop = document.createElement('div');
    const container = document.createElement('div');

    this.modal.classList.add('modal');
    backdrop.classList.add('modal-backdrop');
    container.classList.add('movie-detail-container');

    this.modal.appendChild(backdrop);

    const detailTitle = document.createElement('h2');
    detailTitle.classList.add('detail-title', 'skeleton');
    // detailTitle.textContent = movieData.title;
    container.append(detailTitle);

    const detailBox = document.createElement('div');
    detailBox.classList.add('detail-box');

    const detailImage = document.createElement('img');
    detailImage.classList.add('detail-image');
    // if (movieData.poster_path) {
    //   detailImage.setAttribute('src', POSTER_BASE_URL + movieData.poster_path);
    // } else {
    //   detailImage.setAttribute('src', NoImage);
    // }

    detailBox.append(detailImage);

    const detailInfo = document.createElement('div');
    detailInfo.classList.add('detail-info');

    const detailPropertyBox = document.createElement('div');
    detailPropertyBox.classList.add('detail-property-box');

    const detailGenreAndScore = document.createElement('div');
    detailGenreAndScore.classList.add('detail-genre-and-score');

    const detailGenre = document.createElement('p');
    detailGenre.classList.add('detail-genre');
    // detailGenre.textContent = movieData.genres.map(genre => genre.name).join(', ');
    detailGenreAndScore.append(detailGenre);

    const detailScoreBox = document.createElement('div');
    detailScoreBox.classList.add('detail-score-box');

    const detailScoreIcon = document.createElement('img');
    detailScoreIcon.setAttribute('src', Star);
    detailScoreBox.append(detailScoreIcon);

    const detailScore = document.createElement('p');
    detailScore.classList.add('detail-score');
    // detailScore.textContent = String(movieData.vote_average);
    detailScoreBox.append(detailScore);

    detailGenreAndScore.append(detailScoreBox);
    detailInfo.append(detailGenreAndScore);

    const detailDescription = document.createElement('p');
    detailDescription.classList.add('detail-description');
    // detailDescription.textContent = movieData.overview;

    detailPropertyBox.append(detailGenreAndScore);
    detailPropertyBox.append(detailDescription);

    const detailRateBox = document.createElement('div');
    detailRateBox.classList.add('detail-rate-box');

    const detailRateCaption = document.createElement('p');
    detailRateCaption.classList.add('detail-rate-caption');
    detailRateCaption.textContent = '내 별점';
    detailRateBox.append(detailRateCaption);

    // const detailRateStarBox = document.createElement('div');

    const detailRateStar = document.createElement('p');
    // detailRateStar.textContent = '★★★★★';
    detailRateBox.append(detailRateStar);

    const detailRateScore = document.createElement('p');
    // detailRateScore.textContent = '10 명작이에요';
    detailRateBox.append(detailRateScore);

    detailInfo.append(detailPropertyBox);
    detailInfo.append(detailRateBox);

    detailBox.append(detailInfo);

    container.append(detailTitle);
    container.append(detailBox);

    this.modal.appendChild(container);
  }

  mount() {
    console.log('hi');
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
      if (movieData.poster_path) {
        detailImage.setAttribute('src', POSTER_BASE_URL + movieData.poster_path);
      } else {
        detailImage.setAttribute('src', NoImage);
      }
    }
    if (detailGenre) detailGenre.textContent = movieData.genres.map(genre => genre.name).join(', ');
    if (detailScore) detailScore.textContent = String(movieData.vote_average);
    if (detailDescription) detailDescription.textContent = movieData.overview;
  }

  setEvents() {
    const backdrop = this.modal.querySelector('.modal-backdrop');
    if (!backdrop) return;
    backdrop.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.modal.classList.contains('modal--open')) {
      this.modal.classList.remove('modal--open');
    } else {
      this.modal.classList.add('modal--open');
    }
  }
}

export default MovieDetailModal;
