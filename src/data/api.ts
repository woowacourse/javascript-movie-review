import { API_KEY } from '../../apiKey.js';
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

type IGetMovies = (page: number) => Promise<IMovieList>;

export const getMovies: IGetMovies = async (page) => {
  try {
    const response = await fetch(
      `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    if (!response.ok) throw Error(response.statusText);

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

type IGetSearchMovies = (keyword: string, page: number) => Promise<IMovieList>;
export const getSearchMovie: IGetSearchMovies = async (keyword, page) => {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=${page}`
  );
  if (!response.ok) return [];
  return response.json();
};
