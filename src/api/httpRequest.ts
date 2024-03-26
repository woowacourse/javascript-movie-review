import { URL } from './url';
import httpValidation from './httpValidation';

async function fetchMovies(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  const movieList = data.results;

  httpValidation(response.status, movieList);

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
