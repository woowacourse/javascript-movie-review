import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../constants/requests';
import fetchData from '../utils/fetchData';

export interface Params {
  [key: string]: string | number | boolean;
}

interface MovieRequestResult {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

const MovieService = {
  async fetchMovies(url: string) {
    const data = await fetchData({
      url,
      options: COMMON_OPTIONS,
    });

    const { page, total_pages, results, total_results } = data;
    const isLastPage = page === total_pages;
    const isEmptyResults = total_results === 0;
    const movies = results.map(
      ({ id, title, vote_average, poster_path }: MovieRequestResult) => ({
        id,
        title,
        vote_average,
        poster_path,
      }),
    );

    return { movies, page, isLastPage, isEmptyResults };
  },

  async fetchSearchMovies(params: Params) {
    const url = `${REQUEST_URL.searchMovies}${new URLSearchParams({
      ...COMMON_PARAMS,
      ...params,
    })}`;
    return this.fetchMovies(url);
  },

  async fetchPopularMovies(params: Params) {
    const url = `${REQUEST_URL.popularMovies}${new URLSearchParams({
      ...COMMON_PARAMS,
      ...params,
    })}`;
    return this.fetchMovies(url);
  },
};

export default MovieService;
