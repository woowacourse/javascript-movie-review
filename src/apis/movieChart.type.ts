import { GENRES } from './../constants/movieChart';
import { MakeOptional } from '../types/common';

export interface CommonMoviesResult {
  page: number;
  total_pages: number;
  total_results: number;
}
export interface GetPopularMoviesRes extends CommonMoviesResult {
  results: RemotePopularMovieInfo[];
}

export interface RemotePopularMovieInfo {
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
  results: RemoteMovieInfoByKeyword[];
}

export type RemoteMovieInfoByKeyword = MakeOptional<RemotePopularMovieInfo, 'backdrop_path' | 'poster_path'>;

export interface RemoteMovieGenre {
  id: number;
  name: keyof typeof GENRES;
}

export interface GetMovieGenres {
  genres: RemoteMovieGenre[];
}
