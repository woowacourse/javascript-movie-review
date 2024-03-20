export const BASE_URL = 'https://api.themoviedb.org/3';
import { API_URL } from './../../consts/Api';

type SearchAPIParamsType = {
  query: string;
  pageNumber: number;
};

type PopularAPIParamsType = {
  pageNumber: number;
};

type UrlParamsType = {
  [key: string]: string | number;
};

export interface MovieItemReturnType {
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

export interface MovieAPIReturnType {
  page: number;
  results: MovieItemReturnType[];
  total_pages: number;
  total_results: number;
}

const APIService = {
  generateMovieApiUrl(url: string, params: UrlParamsType) {
    const API_KEY = process.env.API_KEY;
    const queryParams = new URLSearchParams({
      api_key: API_KEY as string,
      language: 'ko-KR',
      ...params,
    });

    return `${url}?${queryParams.toString()}`;
  },

  async fetchPopularMovies({ pageNumber = 1 }: PopularAPIParamsType): Promise<MovieAPIReturnType> {
    const popularMoviesUrl = this.generateMovieApiUrl(API_URL.POPULAR_MOVIES, {
      page: pageNumber,
    });

    const response = await fetch(popularMoviesUrl);
    const popularMovieResult = await response.json();

    return popularMovieResult;
  },

  async fetchSearchMovies({ query, pageNumber = 1 }: SearchAPIParamsType): Promise<MovieAPIReturnType> {
    const searchMoviesUrl = this.generateMovieApiUrl(API_URL.SEARCH_MOVIES, {
      page: pageNumber,
      query,
    });

    const response = await fetch(searchMoviesUrl);
    const searchMovieResult = await response.json();

    return searchMovieResult;
  },
};

export default APIService;
