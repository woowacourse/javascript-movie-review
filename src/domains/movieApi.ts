import { MovieRoot } from '../types/movieApi';

const getPopularMovieRequestUrl = (page: number) => {
  return `https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/popular?language=ko-KR&page=${page}`;
};

const getSearchMovieRequestUrl = (query: string, page: number) => {
  return `https://ornate-swan-ce5a5e.netlify.app/tmdb/search/movie?language=ko-KR&query=${query}&page=${page}&include_adult=false`;
};

const fetchMovieList = async (query: string, currentPage: number): Promise<MovieRoot> => {
  const requestUrl = query ? getSearchMovieRequestUrl(query, currentPage) : getPopularMovieRequestUrl(currentPage);
  const result = await fetch(requestUrl);

  return await result.json();
};

export const getPopularMovieList = async (): Promise<MovieRoot> => {
  return await fetchMovieList('', 1);
};

export const searchMovieList = async (query: string, page: number): Promise<MovieRoot> => {
  return await fetchMovieList(query, page);
};

export const getMoreMovieList = async (query: string, nextPage: number): Promise<MovieRoot> => {
  return await fetchMovieList(query, nextPage);
};
