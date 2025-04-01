import { convertMovieData } from '../domain/convertMovieData';
import { MovieParamsType, ResponseType } from '../type';
import { getAppClient } from './appClient';

const getSearchMovies = async (params: MovieParamsType) => {
  const movies = await getAppClient<ResponseType, MovieParamsType>('/search/movie', params);
  const convertMovies = { ...movies, results: movies.results.map(convertMovieData) };

  return convertMovies;
};

export default getSearchMovies;
