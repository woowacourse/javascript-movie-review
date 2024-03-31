import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../constants/requests';
import MovieStore from '../stores/movieStore';
import fetchData from '../utils/fetchData';

export const processMovieListResponse = (data: MovieListResponse) => {
  const { page, total_pages, results } = data;

  const isLastPage = page === total_pages;
  const movies = results.map(({ id, title, vote_average, poster_path }) => ({
    id,
    title,
    vote_average,
    poster_path,
  }));

  return { movies, page, isLastPage };
};

export const processMovieDetailResponse = (
  data: MovieDetailResponse,
): MovieDetail => {
  const {
    id,
    genres,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
  }: MovieDetail = data;

  return {
    id,
    genres,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
  };
};

export const fetchSearchMovies = ({
  onSuccess,
  onError,
  onLoading,
}: FetchSearchMoviesProps) => {
  const { page, query } = MovieStore.search;

  const parameters = new URLSearchParams({
    ...COMMON_PARAMS,
    page: page.toString(),
    query,
  });
  const url = `${REQUEST_URL.searchMovies}${parameters}`;
  const options = COMMON_OPTIONS;

  return fetchData<MovieListResponse>(
    { url, options },
    onSuccess,
    onError,
    onLoading,
  );
};

export const fetchPopularMovies = ({
  onSuccess,
  onError,
  onLoading,
}: FetchPopularMoviesProps) => {
  const { page } = MovieStore.popular;

  const parameters = new URLSearchParams({
    ...COMMON_PARAMS,
    page: page.toString(),
  });
  const url = `${REQUEST_URL.popularMovies}${parameters}`;
  const options = COMMON_OPTIONS;

  return fetchData<MovieListResponse>(
    { url, options },
    onSuccess,
    onError,
    onLoading,
  );
};

export const fetchMovieDetail = ({
  onSuccess,
  onError,
  onLoading,
  id,
}: FetchMovieDetailProps) => {
  const parameters = new URLSearchParams({
    ...COMMON_PARAMS,
  });
  const url = `${REQUEST_URL.movieDetail}/${id}?${parameters}`;
  const options = COMMON_OPTIONS;

  return fetchData<MovieDetailResponse>(
    { url, options },
    onSuccess,
    onError,
    onLoading,
  );
};
