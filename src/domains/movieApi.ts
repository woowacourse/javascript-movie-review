import { generateMovieListTemplate } from '../components/templates/movieList';
import { MovieResult, MovieRoot } from '../types/movieApi';

const getPopularMovieRequestUrl = (page: number) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;
};

const getSearchMovieRequestUrl = (query: string, page: number) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;
};

const fetchMovieList = async (query: string, currentPage: number): Promise<MovieRoot> => {
  const requestUrl = query ? getSearchMovieRequestUrl(query, currentPage) : getPopularMovieRequestUrl(currentPage);
  const result = await fetch(requestUrl);

  return await result.json();
};

export const getPopularMovieList = async (page: number): Promise<MovieRoot> => {
  return await fetchMovieList('', page);
};

export const searchMovieList = async (query: string, page: number): Promise<MovieRoot> => {
  return await fetchMovieList(query, page);
};

export const getMoreMovieList = async (query: string, nextPage: number): Promise<MovieRoot> => {
  return await fetchMovieList(query, nextPage);
};
