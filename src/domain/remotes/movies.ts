import { QUERY_PARAMS } from './constants';
import { request } from './index';

export interface MoviesResponse {
  page: number;
  results: MovieResponse[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  id: MovieResponse['id'];
  title: MovieResponse['title'];
  posterPath: MovieResponse['poster_path'];
  voteAverage: MovieResponse['vote_average'];
}

export const fetchPopularMovies = async (page: number): Promise<Movie[]> => {
  const response = await request<MoviesResponse>(`movie/popular?page=${page}`, QUERY_PARAMS);

  if (isInvalidMoviesResponse(response)) {
    throw new Error('유효하지 않은 데이터입니다.');
  }

  return response.results.map(createMovie);
};

export const fetchSearchedMovies = async (query: string, page = 1): Promise<Movie[]> => {
  const response = await request<MoviesResponse>(
    `search/movie?query=${query}&page=${page}`,
    QUERY_PARAMS
  );

  if (isInvalidMoviesResponse(response)) {
    throw new Error('유효하지 않은 데이터입니다.');
  }

  return response.results.map(createMovie);
};

const isInvalidMoviesResponse = (moviesResponse: MoviesResponse) => {
  const { page, results, total_pages, total_results } = moviesResponse;

  return (
    typeof page !== 'number' ||
    !Array.isArray(results) ||
    typeof total_pages !== 'number' ||
    typeof total_results !== 'number'
  );
};

const createMovie = (movieResponse: MovieResponse): Movie => {
  if (isInvalidMovieResponse(movieResponse)) {
    throw new Error('유효하지 않은 데이터입니다.');
  }

  const { id, title, poster_path, vote_average } = movieResponse;

  return {
    id,
    title,
    posterPath: poster_path,
    voteAverage: vote_average,
  };
};

const isInvalidMovieResponse = (movieResponse: MovieResponse) => {
  const { id, title, poster_path, vote_average } = movieResponse;

  return (
    typeof id !== 'number' ||
    typeof title !== 'string' ||
    typeof poster_path !== 'string' ||
    typeof vote_average !== 'number'
  );
};
