import { Movie } from '../../types/movie';
import './MovieInfoModal.css';

import { POSTER_BASE_URL } from '../../consts/URL';
import BasicModal from '../BasicModal/BasicModal';
class MovieInfoModal {
  constructor(movieInfo: Movie) {
    const movieInfoBox = document.createElement('div');
    movieInfoBox.classList.add('movie-info-modal');
    new BasicModal(movieInfoBox);

    const movieTitleHeader = document.createElement('div');
    movieTitleHeader.id = 'movie-info-modal-header';
    movieTitleHeader.textContent = movieInfo.title;
    movieInfoBox.append(movieTitleHeader);

    const movieInfoWrapper = document.createElement('div');
    movieInfoWrapper.id = 'movie-info-flex-wrapper';

    const moviePoster = document.createElement('img');
    moviePoster.id = 'movie-info-poster';
    moviePoster.setAttribute('src', POSTER_BASE_URL + movieInfo.posterPath);
    moviePoster.setAttribute('alt', movieInfo.title);
    movieInfoWrapper.append(moviePoster);

    const movieInfoDetailBox = document.createElement('div');
    movieInfoDetailBox.id = 'movie-info-modal-box';
    movieInfoWrapper.append(movieInfoDetailBox);

    movieInfoBox.append(movieTitleHeader);
    movieInfoBox.append(movieInfoWrapper);

    const movieScoreBox = document.createElement('div');
    movieScoreBox.id = 'movie-info-modal-score';
  }
}

export default MovieInfoModal;
