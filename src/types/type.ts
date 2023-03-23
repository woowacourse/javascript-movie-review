import { MovieDetailResult } from '../apis/tmdbType';

export interface MovieInfo {
  id: number;
  title: string;
  imgUrl: string;
  score: number;
  description: string;
}

export interface MovieDetailInfo {
  category: MovieDetailResult['genres'];
}

export interface ParsedMovieResult {
  isLastPage: boolean;
  movies: MovieInfo[];
}
