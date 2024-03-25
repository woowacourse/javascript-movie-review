import { POPULAR_MOVIES_URL, SEARCH_MOVIES_URL } from '../constants/url';
import { MovieResponse, MovieSearchResult } from '../types/movie';
import fetcher from './fetcher';

export const getPopularMovies = async (page: number): Promise<MovieSearchResult> => {
  const params = `?language=ko-KR&page=${page}`;
  const { results, total_pages, total_results } = await fetcher.get<MovieResponse>(POPULAR_MOVIES_URL + params);
  return { movies: results, totalPages: total_pages, movieCount: total_results };
};

export const searchMoviesByTitle = async (title: string, page: number): Promise<MovieSearchResult> => {
  const params = `?query=${title}&include_adult=false&language=en-US&page=${page}`;
  const { results, total_pages, total_results } = await fetcher.get<MovieResponse>(SEARCH_MOVIES_URL + params);
  return { movies: results, totalPages: total_pages, movieCount: total_results };
};
