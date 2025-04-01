import { convertMovieData } from '../domain/convertMovieData';
import { MovieParamsType } from '../type';
import { getAppClient } from './appClient';

const getSearchMovies = async (params: MovieParamsType) => {
  const movies = await getAppClient('/search/movie', params);
  const convertMovies = { ...movies, results: movies.results.map(convertMovieData) };

  return convertMovies;
};

export default getSearchMovies;
