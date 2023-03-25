import { HttpResponse, HttpStatus } from '../HttpClient.type';

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

export type TMDBErrorResponse<Status extends HttpStatus = 400> = HttpResponse<
  Status,
  {
    status_message: string;
    status_code: number;
  }
>;

export type TMDBMoviesResponse<Status extends HttpStatus = 200> = HttpResponse<
  Status,
  {
    page: number;
    total_pages: number;
    total_results: number;
    results: TMDBMovie[];
  }
>;

export type TMDBMovieResponse<Status extends HttpStatus = 200> = HttpResponse<
  Status,
  TMDBMovieDetail
>;
