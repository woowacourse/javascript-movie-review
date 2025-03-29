import { convertMovieData } from '../domain/convertMovieData';
import { MovePramsType } from '../type';
import { errorUi } from '../view/errorUi';
import { getAppClient } from './appClient';
import { ERROR } from './constant';

const getSearchMovies = async (params: MovePramsType) => {
  try {
    const movies = await getAppClient('/search/movie', params);
    if (movies.length === 0) {
      throw Error(ERROR.NOT_FOUND);
    }
    const convertMovies = { ...movies, results: movies.results.map(convertMovieData) };

    return convertMovies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};

export default getSearchMovies;
