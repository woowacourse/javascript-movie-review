import { HTTPResponse, HTTPStatus } from '../HttpClient.type';

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
  overview: string;
};

export type TMDBMovieDetail = TMDBMovie & {
  genres: Array<{ id: number; name: string }>;
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

export type TMDBMovieResponse<Status extends HTTPStatus = 200> = HTTPResponse<
  Status,
  TMDBMovieDetail
>;
