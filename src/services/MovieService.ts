import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../constants/requests';
import fetchData from '../utils/fetchData';

export interface Params {
  [key: string]: string | number | boolean;
}

interface FetchProps {
  params: Params;
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
  params,
  onSuccess,
  onError,
  onLoading,
}: FetchProps) => {
  const parameters = new URLSearchParams({
    ...COMMON_PARAMS,
    ...params,
  });
  const url = `${REQUEST_URL.searchMovies}${parameters}`;
  const options = COMMON_OPTIONS;

  return fetchData({ url, options }, onSuccess, onError, onLoading);
};

export const fetchPopularMovies = async ({
  params,
  onSuccess,
  onError,
  onLoading,
}: FetchProps) => {
  const parameters = new URLSearchParams({
    ...COMMON_PARAMS,
    ...params,
  });
  const url = `${REQUEST_URL.popularMovies}${parameters}`;
  const options = COMMON_OPTIONS;

  return fetchData({ url, options }, onSuccess, onError, onLoading);
};
