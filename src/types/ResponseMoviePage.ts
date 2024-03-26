import { ResponseMovieItem } from './ResponseMovieItem';

export interface ResponseMoviePage {
  page: number;
  results: ResponseMovieItem[];
  total_pages: number;
  total_results: number;
}
