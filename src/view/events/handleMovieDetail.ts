import getMovieDetail from '../../api/getMovieDetail';
import { getStoredRate } from '../../domain/localStorageRate';
import { errorUi } from '../errorUi';
import { renderModal } from '../render/renderModal';

export const handleMovieDetail = async (id: number) => {
  try {
    const params = {
      language: 'ko-KR'
    };
    const movieDetail = await getMovieDetail(params, id);
    const currentRate = getStoredRate(movieDetail.id);

    renderModal(movieDetail, currentRate);
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};
