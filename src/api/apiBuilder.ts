import { API_PATH, BASE_URL, DEFAULT_LANGUAGE } from "../constants/constant";

import type { MovieListResponse } from "./apiTypes";

import type { Movie } from "../../types/movie";

const getMovieEndpointPath = (query: string): string => (query ? API_PATH.SEARCH_MOVIE : API_PATH.POPULAR_MOVIE);

export const createMovieApiUrl = (page: number, query: string): URL => {
  const url = new URL(`${BASE_URL.TMDB_BASE_URL}${getMovieEndpointPath(query)}`);

  url.searchParams.set("language", DEFAULT_LANGUAGE);
  url.searchParams.set("page", String(page));

  if (query) {
    url.searchParams.set("query", query);
  }

  return url;
};

export const mapMovieListResponse = (data: any): MovieListResponse => {
  const movies: Movie[] = data.results.map((movie: any): Movie => {
    return {
      id: movie.id,
      title: movie.title,
      rate: movie.vote_average,
      thumbnail_path: movie.poster_path,
      hero_path: movie.backdrop_path,
    };
  });

  return {
    currentPage: data.page ?? 0,
    totalPages: data.total_pages ?? 0,
    results: movies,
  };
};
