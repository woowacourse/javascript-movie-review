import { MovieDetail } from '../@types/movieType';
import MovieModal from '../components/MovieModal';

const modal = {
  currentModal: null as MovieModal | null,

  open: (movieId: number) => {
    const $app = document.querySelector('#app');

    if (!$app) return;

    const movieModal = new MovieModal(movieId);
    modal.currentModal = movieModal;
    $app.insertAdjacentElement('beforeend', movieModal.node);
  },

  update(movieDetail: MovieDetail) {
    if (!modal.currentModal) return;

    modal.currentModal.updateMovieDetail(movieDetail);
  },

  close() {
    const $modal = document.querySelector('.modal');

    if (!$modal) return;

    modal.currentModal = null;
    $modal.remove();
  },
};

export default modal;
