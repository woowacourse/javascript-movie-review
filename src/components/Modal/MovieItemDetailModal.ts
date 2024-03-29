import { fetchMovieDetail } from '../../domain/Movies/Request/sendRequest';
import MovieData from '../../interfaces/MovieData';
import MovieItemDetail from '../MovieItem/MovieItemDetail';
import Modal from './Modal';

const movieItemDetailContainer = document.createElement('div');

class MovieItemDetailModal extends Modal {
  constructor() {
    super(movieItemDetailContainer);

    movieItemDetailContainer.classList.add('movie-item-detail-container');
  }

  async setDetailMovieData(movieData: MovieData) {
    const movieDetailData = await fetchMovieDetail(movieData.id);

    MovieItemDetail.append(movieItemDetailContainer, () => super.close(), movieDetailData);
  }
}

export default MovieItemDetailModal;
