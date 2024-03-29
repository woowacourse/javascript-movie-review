import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no-image.png';
import Modal from './Modal';
import './MovieDetailModal.css';
import { MovieDetailAPI } from '../../domain/services/API.type';
import { POSTER_BASE_URL } from '../../consts/Api';

const movieDetailModalLayout = document.createElement('div');
movieDetailModalLayout.classList.add('movie-detail-container');

class MovieDetailModal extends Modal {
  constructor() {
    super({ child: movieDetailModalLayout });
  }

  rerender(movieData: MovieDetailAPI) {
    movieDetailModalLayout.replaceChildren();

    const detailTitle = document.createElement('h2');
    detailTitle.classList.add('detail-title');
    detailTitle.textContent = movieData.title;
    movieDetailModalLayout.append(detailTitle);

    const detailBox = document.createElement('div');
    detailBox.classList.add('detail-box');

    const detailImage = document.createElement('img');
    detailImage.classList.add('detail-image');
    if (movieData.poster_path) {
      detailImage.setAttribute('src', POSTER_BASE_URL + movieData.poster_path);
    } else {
      detailImage.setAttribute('src', NoImage);
    }

    detailBox.append(detailImage);

    const detailInfo = document.createElement('div');
    detailInfo.classList.add('detail-info');

    const detailPropertyBox = document.createElement('div');
    detailPropertyBox.classList.add('detail-property-box');

    const detailGenreAndScore = document.createElement('div');
    detailGenreAndScore.classList.add('detail-genre-and-score');

    const detailGenre = document.createElement('p');
    detailGenre.textContent = movieData.genres.map(genre => genre.name).join(', ');
    detailGenreAndScore.append(detailGenre);

    const detailScoreBox = document.createElement('div');
    detailScoreBox.classList.add('detail-score-box');

    const detailScoreIcon = document.createElement('img');
    detailScoreIcon.setAttribute('src', Star);
    detailScoreBox.append(detailScoreIcon);

    const detailScore = document.createElement('p');
    detailScore.textContent = String(movieData.vote_average);
    detailScoreBox.append(detailScore);

    detailGenreAndScore.append(detailScoreBox);
    detailInfo.append(detailGenreAndScore);

    const detailDescription = document.createElement('p');
    detailDescription.classList.add('detail-description');
    detailDescription.textContent = movieData.overview;

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
    detailRateStar.textContent = '★★★★★';
    detailRateBox.append(detailRateStar);

    const detailRateScore = document.createElement('p');
    detailRateScore.textContent = '10 명작이에요';
    detailRateBox.append(detailRateScore);

    detailInfo.append(detailPropertyBox);
    detailInfo.append(detailRateBox);

    detailBox.append(detailInfo);

    movieDetailModalLayout.append(detailTitle);
    movieDetailModalLayout.append(detailBox);
  }
}

export default MovieDetailModal;
