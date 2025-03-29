import { convertMovieDetailData } from '../domain/convertMovieDetailData';
import { MovePramsType } from '../type';
import { errorUi } from '../view/errorUi';
import { getAppClient } from './appClient';

const getMovieDetail = async (params: MovePramsType, movieId: number) => {
  try {
    const movies = await getAppClient(`/movie/${movieId}`, params);
    const convertMovies = convertMovieDetailData(movies);

    return convertMovies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};

export default getMovieDetail;
