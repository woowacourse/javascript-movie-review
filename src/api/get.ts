import MovieHandler from '../domain/MovieHandler';
import { Movie, DetailMovie } from '../type/Movie';
import { FaildResponse, MovieAPIMetaData, DetailMovieAPIData } from './types';

const BASE_URL = 'https://api.themoviedb.org/3';

// fetch Functions type
export type FetchMovieData = () => Promise<FaildData | MovieMetadata>;
export type FetchDetailMovieData = (movieId: string) => Promise<FaildData | DetailMovieData>;

export type FaildData = {
  isOk: false;
  statusCode: number;
  statusMessage: string;
};

export type MovieMetadata = {
  isOk: true;
  movieList: Movie[];
  page: number;
  totalPages: number;
};

export type DetailMovieData = DetailMovie & {
  isOk: true;
};

export const popularMovieDataFetchFuncGenerator = () => {
  let currentPage = 1;

  const getPopularMovieData: FetchMovieData = async () => {
    const url = `
    ${BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${currentPage}`;

    const response = await fetch(url);

    if (!response.ok) {
      const data: FaildResponse = await response.json();

      const { status_code: statusCode, status_message: statusMessage } = data;

      return { isOk: response.ok, statusCode, statusMessage };
    }

    currentPage += 1;

    const data: MovieAPIMetaData = await response.json();

    const movieList = MovieHandler.convertMovieList(data.results);
    const { page, total_pages: totalPages } = data;

    return { isOk: response.ok, movieList, page, totalPages };
  };

  return getPopularMovieData;
};

export const searchedMovieDataFetchFuncGenerator = (query: string) => {
  let currentPage = 1;

  const getSearchedMovieData: FetchMovieData = async () => {
    const url = `
    ${BASE_URL}/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&page=${currentPage}&query=${query}`;

    const response = await fetch(url);

    if (!response.ok) {
      const data: FaildResponse = await response.json();

      const { status_code: statusCode, status_message: statusMessage } = data;

      return { isOk: response.ok, statusCode, statusMessage };
    }

    currentPage += 1;

    const data: MovieAPIMetaData = await response.json();

    const movieList = MovieHandler.convertMovieList(data.results);
    const { page, total_pages: totalPages } = data;

    return { isOk: response.ok, movieList, page, totalPages };
  };

  return getSearchedMovieData;
};

export const getDetailMovieData: FetchDetailMovieData = async (movieId: string) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${process.env.API_KEY}&language=ko-KR`;

  const response = await fetch(url);

  if (!response.ok) {
    const data: FaildResponse = await response.json();
    const { status_code: statusCode, status_message: statusMessage } = data;

    return { isOk: response.ok, statusCode, statusMessage };
  }

  const data: DetailMovieAPIData = await response.json();

  const { id, title, poster_path: posterPath, vote_average: voteAverage } = data;
  const genres = MovieHandler.convertGenreList(data.genres);

  return { isOk: response.ok, id, title, posterPath, voteAverage, genres };
};
