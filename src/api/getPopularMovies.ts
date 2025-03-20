import { IMovie } from '../type';
import { BASE_URL } from './constant';

interface PopularMoviesResponse extends Response {
  results: IMovie[];
}

const getPopularMovies = async ({ page }: { page: number }): Promise<PopularMoviesResponse> => {
  const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=${page}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
  });

  const data = await response.json();
  return data;
};

export default getPopularMovies;
