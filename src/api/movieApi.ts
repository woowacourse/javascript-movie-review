import { popularApiUrl, searchApiUrl } from "./config.ts";
import http from "./http.ts";

const fetchPopularMovies = (page = 1) => {
  try {
    return http.get(
      `${popularApiUrl}?language=ko-KR&region=ko-KR&page=${page}`
    );
  } catch (error) {
    throw error;
  }
};

const fetchSearchedMovies = (searchQuery: string, page = 1) => {
  try {
    const queryString = `query=${encodeURIComponent(
      searchQuery
    )}&page=${page}&language=ko-KR&region=ko-KR&include_adult=false`;
    const url = `${searchApiUrl}?${queryString}`;

    return http.get(url);
  } catch (error) {
    throw error;
  }
};

export const movieApi = {
  fetchPopularMovies,
  fetchSearchedMovies,
};
