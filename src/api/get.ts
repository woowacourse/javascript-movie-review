import MovieHandler from '../domain/MovieHandler';
import { Movie } from '../type/Movie';

// TMDB API interface
export interface MovieAPIMetaData {
  page: number;
  results: MovieAPIData[];
  total_pages: number;
  total_results: number;
}

export interface MovieAPIData {
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

// TMDB Faild response - https://www.themoviedb.org/documentation/api/status-codes
export interface FaildResponse {
  status_code: number;
  status_message: string;
  success: false;
}

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

export type FetchMovieData = () => Promise<FaildData | MovieMetadata>;

const BASE_URL = 'https://api.themoviedb.org/3';

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

  const getSearchedMovieData = async () => {
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
