import { IMovie } from '../type';
import { Response } from './type';
import ApiClient from './ApiClient';

interface SearchMoviesResponse extends Response {
  results: IMovie[];
}

export const getSearchMovies = async ({
  page,
  query
}: {
  page: number;
  query: string;
}): Promise<SearchMoviesResponse | null> => {
  try {
    const data = await ApiClient.get(`/search/movie?include_adult=false&language=en-US&page=${page}&query=${query}`);
    return data;
  } catch (error) {
    return null;
  }
};

export default getSearchMovies;
