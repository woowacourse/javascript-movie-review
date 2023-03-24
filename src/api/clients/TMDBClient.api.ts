import { TMDBErrorResponse, TMDBMovieResponse, TMDBMoviesResponse } from './TMDBClient.type';

export type TMDBAPISpec = TMDBGetMoviePopular | TMDBGetSearchMovie | TMDBGetMovie;

export type TMDBGetMoviePopular = {
  endpoint: 'GET /3/movie/popular';
  params: { page: number };
  response: TMDBMoviesResponse<200> | TMDBErrorResponse<401 | 404>;
};

export type TMDBGetSearchMovie = {
  endpoint: 'GET /3/search/movie';
  params: { query: string; page: number };
  response: TMDBMoviesResponse<200> | TMDBErrorResponse<401 | 404>;
};

export type TMDBGetMovie = {
  endpoint: `GET /3/movie/${number}`;
  response: TMDBMovieResponse<200> | TMDBErrorResponse<401 | 404>;
};
