import { IMovie } from '../type';
import { Response } from './type';

interface SearchMoviesResponse extends Response {
  results: IMovie[];
}

const getSearchMovies = async ({ page, query }: { page: number; query: string }): Promise<SearchMoviesResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${query}`,
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
