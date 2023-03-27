import { API_KEY } from '../../apiKey.js';

import { store } from '../store';

const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovieGenre {
  id: number;
  name: string;
}
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  genres: IMovieGenre[];
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
      `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
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
      store.setState({ errorMessage: error.message });
      alert(error.message);
    }
  }
};

export const getSearchMovie = async (keyword: string, page: number): Promise<IMovie[]> => {
  try {
    const response = await fetch(
      `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=${page}`
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
      store.setState({ errorMessage: error.message });
      alert(error.message);
    }
  }
};

export const getMovieDetail = async (movieId: string): Promise<IMovie> => {
  try {
    const response = await fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`);
    if (!response.ok) {
      const error: ErrorResponse = await response.json();

      throw new Error(error.status_message);
    }

    const data: IMovie = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      store.setState({ errorMessage: error.message });
      alert(error.message);
    }
  }
};
