import { Validation } from '../Validation';

const API_KEY = process.env.API_KEY;
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface MovieInterface {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

export interface MovieListInterface {
  page: number;
  results: MovieInterface[];
  total_pages: number;
  total_results: number;
}

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
