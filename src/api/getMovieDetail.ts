import { convertMovieData } from '../domain/convertMovieData';
import { MovePramsType } from '../type';
import { errorUi } from '../view/errorUi';
import { getAppClient } from './appClient';

const getMovieDetail = async (params: MovePramsType, movieId: number) => {
  try {
    const movies = await getAppClient(`/movie/${movieId}`, params);
    // const convertMovies = { ...movies, results: movies.results.map(convertMovieData) };

    return movies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};

export default getMovieDetail;
