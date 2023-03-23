import { MovieDetailResponse } from '../domain/remotes/movieDetail';
import { $ } from '../utils/domUtils';
import CustomModal from './common/CustomModal';

class MovieDetailModal extends HTMLElement {
  render(movieDetail: MovieDetailResponse) {
    const { title, genres, overview } = movieDetail;

    this.innerHTML = /* html */ `
      <h3>${title}</h3>
    `;

    const $customModal = $('custom-modal') as CustomModal;
    $customModal.openModal();
  }
}

export default MovieDetailModal;
