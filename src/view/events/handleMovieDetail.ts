import getMovieDetail from '../../api/getMovieDetail';
import { errorUi } from '../errorUi';
import { renderModal } from '../render/renderModal';

export const handleMovieDetail = async (id: number) => {
  try {
    const params = {
      language: 'ko-KR'
    };
    const movieDetail = await getMovieDetail(params, id);
    renderModal(movieDetail);
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};
