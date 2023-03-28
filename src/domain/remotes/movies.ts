import { request } from './index';

export interface MoviesResponse {
  page: number;
  results: MovieResponse[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse {
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

export const fetchPopularMovies = async (page: number): Promise<MovieResponse[]> => {
  const { results } = await request<MoviesResponse>(`movie/popular?page=${page}`);

  return results;
};

export const fetchSearchedMovies = async (query: string, page = 1): Promise<MovieResponse[]> => {
  const { results } = await request<MoviesResponse>(`search/movie?query=${query}&page=${page}`);

  return results;
};
