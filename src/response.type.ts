import { Genre, Movie } from './movies.type';

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
};

export type TMDBErrorResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};

export type TMDBGenres = {
  genres: Genre[];
};
