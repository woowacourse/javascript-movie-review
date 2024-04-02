import { fetchMovieDetail } from '../apis/fetchData';
import createMovieDetailModal from '../components/modal/detailModal';
import modal from '../components/modal/emptyModal';

export async function openMovieDetailModal(movieId: number) {
  const movieDetail = await fetchMovieDetail(movieId);
  document.body.classList.add('stop-scroll');
  modal.create('modal--open', createMovieDetailModal(movieDetail));
}
