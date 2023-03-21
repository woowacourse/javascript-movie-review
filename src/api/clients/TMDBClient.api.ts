import { TMDBErrorResponse, TMDBMoviesResponse } from './TMDBClient.type';

export type TMDBAPISpec = TMDBGetMoviePopular | TMDBGetSearchMovie;

export type TMDBGetMoviePopular = {
  endpoint: 'GET /3/movie/popular';
  params: { page: number };
  response: TMDBMoviesResponse<200> | TMDBErrorResponse<401> | TMDBErrorResponse<404>;
};

export type TMDBGetSearchMovie = {
  endpoint: 'GET /3/search/movie';
  params: { query: string; page: number };
  response: TMDBMoviesResponse<200> | TMDBErrorResponse<401> | TMDBErrorResponse<404>;
};
