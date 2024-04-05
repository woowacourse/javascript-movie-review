import { getData } from './getData';
import { BASE_URL, ERROR_MESSAGE } from '../constant/setting';

const API_KEY = process.env.API_KEY as string;
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

export const getSearchedMoviesData = async (
  currentPage: string,
  title: string,
) => {
  if (!API_KEY) {
    throw new Error(ERROR_MESSAGE.INVALID_API_KEY);
  }

  const params = {
    api_key: API_KEY,
    language: 'ko-KR',
    page: currentPage,
    query: `${title}`,
  };

  const searchMovieUrl = `${MOVIE_SEARCH_URL}?${new URLSearchParams(
    params,
  ).toString()}`;

  const searchedMovies = await getData(searchMovieUrl);
  if (searchedMovies.results.length === 0) {
    throw new Error(ERROR_MESSAGE.FETCH_SEARCHED_MOVIES_FAILED);
  }

  return searchedMovies.results;
};
