import { Movie, MovieResponse } from "../../types/movie";
import APIClient from "./APIClient";

export const fetchPopularMovies = async (
  page: number = 1
): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams({
      language: "ko-KR",
      page: page.toString(),
    });

    const response = await APIClient.get(`/movie/popular?${params.toString()}`);

    return response.results;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
    return [];
  }
};

export const fetchSearchedMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse | null> => {
  try {
    const params = new URLSearchParams({
      query,
      include_adult: "false",
      language: "ko-KR",
      page: page.toString(),
    });

    const response = await APIClient.get(`/search/movie?${params.toString()}`);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
    return null;
  }
};
