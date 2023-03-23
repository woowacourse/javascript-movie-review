import { Validation } from '../Validation';
import { MovieListInterface } from '../utils/type';

const API_KEY = process.env.API_KEY;
const BASE_PATH = 'https://api.themoviedb.org/3';

type getMoviesType = (page: number) => Promise<MovieListInterface>;
export const getMovies: getMoviesType = async (page) => {
  const response = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
  );
  Validation.api(response.status);
  return response.json();
};

type getSearchMoviesType = (keyword: string, page: number) => Promise<MovieListInterface>;
export const getSearchMovie: getSearchMoviesType = async (keyword, page) => {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=${page}`
  );
  Validation.api(response.status);
  return response.json();
};
