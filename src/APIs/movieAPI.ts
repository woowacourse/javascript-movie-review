import { Movie, MovieResponse, MovieResult } from "../../types/movie";
import APIClient from "./APIClient";

export const fetchPopularMovies = async (
  onError?: (error: Error) => void,
  page: number = 1
): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams({
      language: "ko-KR",
      page: page.toString(),
    });

    const response = await APIClient.get(`/movie/popular?${params.toString()}`);

    return response.results.map((movie: MovieResult) => ({
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average.toFixed(1),
    }));
  } catch (error) {
    if (error instanceof Error && onError) {
      onError(error);
    }
    throw error;
  }
};

export const fetchSearchedMovies = async (
  query: string,
  onError?: (error: Error) => void,
  page: number = 1
): Promise<MovieResponse> => {
  try {
    const params = new URLSearchParams({
      query,
      include_adult: "false",
      language: "ko-KR",
      page: page.toString(),
    });

    const response = await APIClient.get(`/search/movie?${params.toString()}`);

    return { ...response, results: response.results as Movie[] };
  } catch (error) {
    if (error instanceof Error && onError) {
      onError(error);
    }
    throw error;
  }
};
