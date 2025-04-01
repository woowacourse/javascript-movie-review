import { convertMovieData } from '../domain/convertMovieData';
import { MovieParamsType } from '../type';
import { getAppClient } from './appClient';

const getPopularMovies = async (params: MovieParamsType) => {
  const movies = await getAppClient('/movie/popular', params);
  const convertMovies = { ...movies, results: movies.results.map(convertMovieData) };

  return convertMovies;
};

export default getPopularMovies;
