import MovieHandler from '../domain/MovieHandler';
import { Movie } from '../type/Movie';

export interface MovieAPIMetadata {
  page: number;
  results: MovieAPIData[];
  total_pages: number;
  total_results: number;
}

export interface FailedResponse {
  success: boolean;
  status_code: number;
  status_message: string;
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

export interface MovieMetaData {
  isSuccess: true;
  movieList: Movie[];
  page: number;
  totalPages: number;
}

export interface FailedFetchingData {
  isSuccess: false;
  errorCode: number;
  errorMessage: string;
}

export interface GenreAPIMetadata {
  genres: GenreAPIData[];
}

export interface GenreAPIData {
  id: number;
  name: string;
}

const SCHEME = 'https://';
const HOST = 'api.themoviedb.org';
const PATHS = { POPULAR: '/3/movie/popular', SEARCH: '/3/search/movie', GENRE: '/3/genre/movie/list' };
const DEFAULT_QUERY = `api_key=${process.env.API_KEY}&language=ko-KR`;

export const popularMovieDataFetchFuncGenerator = () => {
  let currentPage = 1;

  const getPopularMovieData = async () => {
    const queryString = new URLSearchParams(DEFAULT_QUERY);
    queryString.append('page', currentPage.toString());

    currentPage += 1;

    const url = `${SCHEME}${HOST}${PATHS.POPULAR}?${queryString}`;
    const response = await fetch(url);

    if (!response.ok) {
      const result: FailedResponse = await response.json();
      const data: FailedFetchingData = {
        isSuccess: false,
        errorCode: result.status_code,
        errorMessage: result.status_message,
      };

      currentPage -= 1;

      return data;
    }

    const result: MovieAPIMetadata = await response.json();
    const data: MovieMetaData = {
      isSuccess: true,
      movieList: MovieHandler.convertMovieList(result.results),
      page: result.page,
      totalPages: result.total_pages,
    };

    return data;
  };

  return getPopularMovieData;
};

export const searchedMovieDataFetchFuncGenerator = (query: string) => {
  let currentPage = 1;

  const getSearchedMovieData = async () => {
    const queryString = new URLSearchParams(DEFAULT_QUERY);
    queryString.append('page', currentPage.toString());
    queryString.append('query', query);
    
    currentPage += 1;

    const url = `${SCHEME}${HOST}${PATHS.SEARCH}?${queryString}`;
    const response = await fetch(url);

    if (!response.ok) {
      const result: FailedResponse = await response.json();
      const data: FailedFetchingData = {
        isSuccess: false,
        errorCode: result.status_code,
        errorMessage: result.status_message,
      };

      currentPage -= 1;

      return data;
    }


    const result: MovieAPIMetadata = await response.json();
    const data: MovieMetaData = {
      isSuccess: true,
      movieList: MovieHandler.convertMovieList(result.results),
      page: result.page,
      totalPages: result.total_pages,
    };

    return data;
  };

  return getSearchedMovieData;
};

export const getGenreAPIData = async () => {
  const url = `${SCHEME}${HOST}${PATHS.GENRE}?${DEFAULT_QUERY}`;
  const response = await fetch(url);

  const result: GenreAPIMetadata = await response.json();
  const data: GenreAPIData[] = result.genres;

  return data;
};
