import { convertMovieData } from '../domain/convertMovieData';
import { MovePramsType } from '../type';
import { errorUi } from '../view/errorUi';
import { getAppClient } from './appClient';
import { ERROR } from './constant';

const getPopularMovies = async (params: MovePramsType) => {
  try {
    const movies = await getAppClient('/movie/popular', params);
    if (movies.results.length === 0) {
      throw Error(ERROR.NO_SEARCH_RESULTS);
    }

    const convertMovies = { ...movies, results: movies.results.map(convertMovieData) };

    return convertMovies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};

export default getPopularMovies;
