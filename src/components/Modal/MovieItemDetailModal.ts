import { fetchMovieDetail } from '../../domain/Movies/Request/sendRequest';
import MovieData from '../../interfaces/MovieData';
import MovieItemDetailContentContainer from '../MovieItem/MovieItemDetailContentContainer/MovieItemDetailContentContainer';
import MovieItemDetailTitleContainer from '../MovieItem/MovieItemDetailTitleContainer/MovieItemDetailTitleContainer';
import Modal from './Modal';
import './MovieItemDetailModal.css';

const movieItemDetailContainer = document.createElement('div');

class MovieItemDetailModal extends Modal {
  constructor() {
    super(movieItemDetailContainer);

    movieItemDetailContainer.classList.add('movie-item-detail-container');
  }

  async setDetailMovieData(movieData: MovieData) {
    const movieDetailData = await fetchMovieDetail(movieData.id);

    movieItemDetailContainer.appendChild(MovieItemDetailTitleContainer.create(() => super.close(), movieDetailData));
    movieItemDetailContainer.appendChild(MovieItemDetailContentContainer.create(movieDetailData));
  }
}

export default MovieItemDetailModal;
