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

export interface MovieDataResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ErrorResponse {
  status_message: string;
  success?: boolean;
  status_code: number;
}

export const getPopularMovies = async (page: number): Promise<IMovie[]> => {
  try {
    const response = await fetch(
      `${BASE_PATH}/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`
    );

    if (!response.ok) {
      const error: ErrorResponse = await response.json();

      throw new Error(error.status_message);
    }

    const data: MovieDataResponse = await response.json();
    const movies: IMovie[] = data.results;

    return movies;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};

export const getSearchMovie = async (keyword: string, page: number): Promise<IMovie[]> => {
  try {
    const response = await fetch(
      `${BASE_PATH}/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${keyword}&page=${page}`
    );
    if (!response.ok) {
      const error: ErrorResponse = await response.json();

      throw new Error(error.status_message);
    }

    const data: MovieDataResponse = await response.json();
    const movies: IMovie[] = data.results;

    return movies;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
