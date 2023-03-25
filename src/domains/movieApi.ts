import { MovieDetailRoot, MovieRoot } from '../types/movieApi';

const getPopularMovieRequestUrl = (page: number) => {
  return `https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/popular?language=ko-KR&page=${page}`;
};

const getSearchMovieRequestUrl = (query: FormDataEntryValue, page: number) => {
  return `https://ornate-swan-ce5a5e.netlify.app/tmdb/search/movie?language=ko-KR&query=${query}&page=${page}`;
};

const getMovieDetailRequestUrl = (id: number) => {
  return `https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/${id}?language=ko-KR`;
};

const fetchMovieList = async (query: FormDataEntryValue, currentPage: number): Promise<MovieRoot> => {
  const requestUrl = query ? getSearchMovieRequestUrl(query, currentPage) : getPopularMovieRequestUrl(currentPage);
  const result = await fetch(requestUrl);

  return await result.json();
};

export const getPopularMovieList = async (): Promise<MovieRoot> => {
  return await fetchMovieList('', 1);
};

export const searchMovieList = async (query: FormDataEntryValue, page: number): Promise<MovieRoot> => {
  return await fetchMovieList(query, page);
};

export const getMoreMovieList = async (query: FormDataEntryValue, nextPage: number): Promise<MovieRoot> => {
  return await fetchMovieList(query, nextPage);
};

export const getMovieDetails = async (id: string): Promise<MovieDetailRoot> => {
  const result = await fetch(`https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/${id}?language=ko-KR`);

  return await result.json();
};
