import http from "./http.ts";
import { popularApiUrl, searchApiUrl, movieDetailApiUrl } from "./constants.ts";

const fetchPopularMovies = (page = 1) => {
  return http.get(`${popularApiUrl}?language=ko-KR&region=ko-KR&page=${page}`);
};

const fetchSearchedMovies = (searchQuery: string, page = 1) => {
  const queryString = `query=${encodeURIComponent(
    searchQuery
  )}&page=${page}&language=ko-KR&region=ko-KR&include_adult=false`;
  const url = `${searchApiUrl}?${queryString}`;

  return http.get(url);
};

const fetchMovieDetail = (movieId: number) => {
  return http.get(`${movieDetailApiUrl}/${movieId}?language=ko-KR`);
};

export const movieApi = {
  fetchPopularMovies,
  fetchSearchedMovies,
  fetchMovieDetail,
};
