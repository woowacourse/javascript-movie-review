import { Movie, MovieResponse } from "../../types/movie";
import { ERROR_MESSAGES } from "../constants/config";
import store from "../store/store";

export const fetchPopularMovies = async (
  page: number = 1
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_TMDB_API_URL
      }/movie/popular?language=ko-KR&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.MOVIE_FETCH_FAILED);
    }

    const data = await response.json();
    return data.results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      store.setState({ errorMessage: error.message });
    }
    return [];
  }
};

export const fetchSearchedMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse | null> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_TMDB_API_URL
      }/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.MOVIE_FETCH_FAILED);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      store.setState({ errorMessage: error.message });
    }
    return null;
  }
};
