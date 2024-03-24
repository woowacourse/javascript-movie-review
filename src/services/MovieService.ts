import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../constants/requests';
import fetchData from '../utils/fetchData';

interface Params {
  [key: string]: string | number | boolean;
}

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

export interface MovieData {
  movies: Movie[];
  page: number;
  isLastPage: boolean;
  isEmptyResults: boolean;
}

const fetchMovies = async (url: string): Promise<MovieData> => {
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
};

const buildUrl = (baseURL: string, params: Params): string => {
  const queryParams = new URLSearchParams({
    ...COMMON_PARAMS,
    ...params,
  });
  return `${baseURL}${queryParams}`;
};

export const MovieService = {
  async fetchMovies(url: string): Promise<MovieData> {
    return fetchMovies(url);
  },

  async fetchSearchMovies(params: Params) {
    const url = buildUrl(REQUEST_URL.searchMovies, params);
    return fetchMovies(url);
  },

  async fetchPopularMovies(params: Params) {
    const url = buildUrl(REQUEST_URL.popularMovies, params);
    return fetchMovies(url);
  },
};
