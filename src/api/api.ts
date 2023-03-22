//import { API_KEY } from '../../apiKey.js';

const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

export interface IMovieList {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

type TGetMovies = (page: number) => Promise<IMovieList>;

type TGetSearchMovies = (keyword: string, page: number) => Promise<IMovieList>;

export const getMovies: TGetMovies = async (page) => {
  try {
    const response = await fetch(
      `${BASE_PATH}/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`
    );
    if (!response.ok) throw Error(response.statusText);

    return await response.json();
  } catch (err) {
    console.log(err);

    if (err instanceof Error) return err.message;

    return String(err);
  }
};

export const getSearchMovie: TGetSearchMovies = async (keyword, page) => {
  try {
    const response = await fetch(
      `${BASE_PATH}/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${keyword}&page=${page}`
    );
    if (!response.ok) throw Error(response.statusText);

    return response.json();
  } catch (err) {
    console.log(err);

    if (err instanceof Error) return err.message;

    return String(err);
  }
};
