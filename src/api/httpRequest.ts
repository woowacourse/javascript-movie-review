import createMovieItems from '../components/MovieItems/MovieItems';
import HTTPError from './HttpError';
import { URL } from './url';

async function fetchMovies(url: string) {
  createMovieItems([], false);
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new HTTPError(response.status);
  }

  const data = await response.json();
  const movieList = data.results;
  const isLastPage = data.total_pages === data.page;
  return { movieList, isLastPage };
}

const httpRequest = {
  async getPopularMovies(page: number) {
    const url = `${URL.POPULAR_MOVIES}&page=${page}`;

    return fetchMovies(url);
  },

  async getSearchedMovies(page: number, input: string) {
    const url = `${URL.SEARCH_MOVIES}&query=${input}&page=${page}`;

    return fetchMovies(url);
  },
};

export default httpRequest;
