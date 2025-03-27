import { convertMovieData } from '../domain/convertMovieData';
import { errorUi } from '../view/errorUi';
import { getAppClient } from './appClient';

const getPopularMovies = async (params: Record<string, string>) => {
  try {
    const movies = await getAppClient('/movie/popular', params);
    const convertMovies = { ...movies, results: movies.results.map(convertMovieData) };

    return convertMovies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};

export default getPopularMovies;
