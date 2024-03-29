import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../constants/requests';
import MovieStore from '../stores/movieStore';
import fetchData from '../utils/fetchData';

export interface Params {
  [key: string]: string | number | boolean;
}

interface FetchProps {
  onSuccess: (data: MovieResponse) => void;
  onError: (res: Response) => void;
  onLoading: () => void;
}

export const processMovieRequestResults = (data: MovieResponse) => {
  const { page, total_pages, results, total_results } = data;

  const isLastPage = page === total_pages;
  const isEmptyResults = total_results === 0;
  const movies = results.map(({ id, title, vote_average, poster_path }) => ({
    id,
    title,
    vote_average,
    poster_path,
  }));

  return { movies, page, isLastPage, isEmptyResults };
};

export const fetchSearchMovies = async ({
  onSuccess,
  onError,
  onLoading,
}: FetchProps) => {
  const { page, query } = MovieStore.search;

  const parameters = new URLSearchParams({
    ...COMMON_PARAMS,
    page: page.toString(),
    query,
  });
  const url = `${REQUEST_URL.searchMovies}${parameters}`;
  const options = COMMON_OPTIONS;

  return fetchData({ url, options }, onSuccess, onError, onLoading);
};

export const fetchPopularMovies = async ({
  onSuccess,
  onError,
  onLoading,
}: FetchProps) => {
  const { page } = MovieStore.popular;

  const parameters = new URLSearchParams({
    ...COMMON_PARAMS,
    page: page.toString(),
  });
  const url = `${REQUEST_URL.popularMovies}${parameters}`;
  const options = COMMON_OPTIONS;

  return fetchData({ url, options }, onSuccess, onError, onLoading);
};
