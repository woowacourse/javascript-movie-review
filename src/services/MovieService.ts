import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../constants/requests';
import fetchData from '../utils/fetchData';

export interface Params {
  [key: string]: string | number | boolean;
}

interface MovieData {
  movies: Movie[];
  page: number;
  isLastPage: boolean;
  isEmptyResults: boolean;
}

const MovieService = {
  async fetchMovies(url: string): Promise<MovieData> {
    const data = await fetchData({
      url,
      options: COMMON_OPTIONS,
    });

    const { page, total_pages, results, total_results } = data;
    const isLastPage: boolean = page === total_pages;
    const isEmptyResults: boolean = total_results === 0;
    const movies: Movie[] = results.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
    }));

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
