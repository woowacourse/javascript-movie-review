import getMovieDetail from '../../api/getMovieDetail';
import { renderModal } from '../render/renderModal';

export const handleMovieDetail = async (id: number) => {
  const params = {
    language: 'ko-KR'
  };
  const movieDetail = await getMovieDetail(params, id);
  if (movieDetail) {
    renderModal(movieDetail);
  }
};
