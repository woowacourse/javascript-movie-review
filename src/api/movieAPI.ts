import { MovieData, MovieDataResult } from '../types/movie';
import { API_BASE_URL } from '../constants';
import { fetchAPI } from './fetchAPI';

async function fetchPopularMovieData(currentPage: number): Promise<MovieDataResult[]> {
  const movieData: MovieData = await fetchAPI(
    `${API_BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${currentPage}`
  );

  return movieData.results;
}

async function fetchSearchedMovieData(
  searchKey: string,
  currentPage: number
): Promise<MovieDataResult[]> {
  const movieData: MovieData = await fetchAPI(
    `${API_BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${searchKey}&page=${currentPage}&include_adult=false`
  );

  return movieData.results;
}

export { fetchPopularMovieData, fetchSearchedMovieData };
