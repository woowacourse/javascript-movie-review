import { MakeOptional } from '../common';

interface CommonMoviesResult {
  page: number;
  total_pages: number;
  total_results: number;
}

export type MovieInfoByKeyword = MakeOptional<MovieInfo, 'backdrop_path' | 'poster_path'>;

export interface GetPopularMoviesRes extends CommonMoviesResult {
  results: MovieInfo[];
}

export interface MovieInfo {
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

export interface GetMoviesByKeywordRes extends CommonMoviesResult {
  results: MovieInfoByKeyword[];
}
