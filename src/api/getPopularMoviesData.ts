import { getData } from './getData';
import { ERROR_MESSAGE } from '../constant/setting';

const API_KEY = process.env.API_KEY as string;
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;

export const getPopularMoviesData = async (currentPage: string) => {
  if (!API_KEY) {
    throw new Error(ERROR_MESSAGE.INVALID_API_KEY);
  }

  const params = {
    api_key: API_KEY,
    language: 'ko-KR',
    page: currentPage,
  };

  const popularMovieUrl = `${POPULAR_MOVIES_URL}?${new URLSearchParams(
    params,
  ).toString()}`;

  const popularMovies = await getData(popularMovieUrl);

  if (!popularMovies || !popularMovies.results) {
    throw new Error(ERROR_MESSAGE.FETCH_POPULAR_MOVIES_FAILED);
  }

  return popularMovies.results;
};
