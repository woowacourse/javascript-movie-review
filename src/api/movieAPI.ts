import { MovieData, MovieDataResult } from '../types/movie';
import { convertKeysToCamelCase } from '../utils/camelCaseConverter';
import { generateUrl } from './generateUrl';
import { fetchAPI } from './fetchAPI';

async function fetchPopularMovieData(currentPage: number): Promise<MovieDataResult[]> {
  const apiUrl = generateUrl('movie/popular', { page: currentPage });
  const movieData: MovieData = await fetchAPI(apiUrl);

  return movieData.results;
}

async function fetchSearchedMovieData(
  searchQuery: string,
  currentPage: number
): Promise<MovieDataResult[]> {
  const apiUrl = generateUrl('search/movie', {
    query: searchQuery,
    page: currentPage,
    include_adult: false,
  });
  const movieData: MovieData = await fetchAPI(apiUrl);

  return movieData.results;
}

export { fetchPopularMovieData, fetchSearchedMovieData };
