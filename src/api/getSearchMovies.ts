import { IMovie } from '../type';
import { BASE_URL } from './constant';
import { Response } from './type';

interface SearchMoviesResponse extends Response {
  results: IMovie[];
}

const getSearchMovies = async ({ page, query }: { page: number; query: string }): Promise<SearchMoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?include_adult=false&language=en-US&page=${page}&query=${query}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
      }
    }
  );

  const data = await response.json();

  return data;
};

export default getSearchMovies;
