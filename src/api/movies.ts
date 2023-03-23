import { request } from './index';

export interface MoviesResponse {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const fetchPopularMovies = async (page: number): Promise<MovieData[]> => {
  const { results } = await request<MoviesResponse>(`movie/popular?page=${page}`);

  return results;
};

export const fetchSearchedMovies = async (query: string, page = 1): Promise<MovieData[]> => {
  const { results } = await request<MoviesResponse>(`search/movie?query=${query}&page=${page}`);

  return results;
};
