import { HTTPResponse, HTTPStatus } from '../Client.type';

export type TMDBClientProps = {
  apiKey: string;
  base?: string;
  language?: TMDBLanguage;
};

export type TMDBLanguage = 'ko-KR' | 'en-US';

export type TMDBMovie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};

export type TMDBErrorResponse<Status extends HTTPStatus = 400> = HTTPResponse<
  Status,
  {
    status_message: string;
    status_code: number;
  }
>;

export type TMDBMoviesResponse<Status extends HTTPStatus = 200> = HTTPResponse<
  Status,
  {
    page: number;
    total_pages: number;
    total_results: number;
    results: TMDBMovie[];
  }
>;

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
