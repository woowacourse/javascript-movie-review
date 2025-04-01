import { convertMovieDetailData } from '../domain/convertMovieDetailData';
import { MovieParamsType } from '../type';
import { getAppClient } from './appClient';

const getMovieDetail = async (params: MovieParamsType, movieId: number) => {
  const movies = await getAppClient(`/movie/${movieId}`, params);
  const convertMovies = convertMovieDetailData(movies);

  return convertMovies;
};

export default getMovieDetail;
