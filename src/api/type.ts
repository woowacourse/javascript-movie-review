import { IMovie } from '../type';

export interface Response {
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}
