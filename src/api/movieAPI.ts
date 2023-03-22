import { MovieData, MovieDataResult, MovieGenreData } from '../types/movie';
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

async function fetchMovieGenreData() {
  const apiUrl = generateUrl('genre/movie/list', {});
  const movieGenreData: MovieGenreData = await fetchAPI(apiUrl);

  return movieGenreData.genres;
}

export { fetchPopularMovieData, fetchSearchedMovieData, fetchMovieGenreData };
