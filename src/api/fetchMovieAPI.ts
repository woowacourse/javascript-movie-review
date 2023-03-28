import { MovieData, MovieDataResult, MovieGenreData } from '../types/movie';
import { generateApiUrl } from './generateApiUrl';
import { fetchAPI } from './fetchAPI';

function checkAPIKey() {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY 환경 변수가 없습니다.');
  }
}

async function fetchPopularMovieData(currentPage: number): Promise<MovieDataResult[]> {
  checkAPIKey();

  const apiUrl = generateApiUrl('movie/popular', {
    api_key: process.env.API_KEY,
    language: 'ko-KR',
    page: currentPage,
  });
  const movieData: MovieData = await fetchAPI(apiUrl);

  return movieData.results;
}

async function fetchSearchedMovieData(
  searchQuery: string,
  currentPage: number
): Promise<MovieDataResult[]> {
  checkAPIKey();

  const apiUrl = generateApiUrl('search/movie', {
    api_key: process.env.API_KEY,
    language: 'ko-KR',
    query: searchQuery,
    page: currentPage,
    include_adult: false,
  });
  const movieData: MovieData = await fetchAPI(apiUrl);

  return movieData.results;
}

async function fetchMovieGenreData() {
  checkAPIKey();

  const apiUrl = generateApiUrl('genre/movie/list', {
    api_key: process.env.API_KEY,
    language: 'ko-KR',
  });
  const movieGenreData: MovieGenreData = await fetchAPI(apiUrl);

  return movieGenreData.genres;
}

export { fetchPopularMovieData, fetchSearchedMovieData, fetchMovieGenreData };
