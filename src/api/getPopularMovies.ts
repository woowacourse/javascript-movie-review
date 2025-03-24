import { IMovie } from '../type';
import { Response } from './type';
import ApiClient from './ApiClient';

interface PopularMoviesResponse extends Response {
  results: IMovie[];
}
export const getPopularMovies = async ({ page }: { page: number }): Promise<PopularMoviesResponse | null> => {
  try {
    const data = await ApiClient.get(`/movie/popular?language=en-US&page=${page}`);
    return data;
  } catch (error) {
    ApiClient.handleError();
    return null;
  }
};

export default getPopularMovies;
