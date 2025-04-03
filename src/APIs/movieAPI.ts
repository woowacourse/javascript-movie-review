import { Movie, MovieResponse } from "../../types/movie";
import { fetchAPI } from "./fetchAPI";

export const fetchPopularMovies = async (
  page: number = 1
): Promise<Movie[]> => {
  const data = await fetchAPI<MovieResponse>({
    url: "/movie/popular",
    params: { language: "ko-KR", page },
  });

  return data?.results ?? [];
};

export const fetchSearchedMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse | null> => {
  return await fetchAPI<MovieResponse>({
    url: "/search/movie",
    params: {
      query,
      include_adult: "false",
      language: "ko-KR",
      page,
    },
  });
};

export const fetchMovieDetail = async (movieId: number): Promise<Movie> => {
  const data = await fetchAPI<Movie>({
    url: `/movie/${movieId}`,
    params: { language: "ko-KR" },
  });

  return data ?? ({} as Movie);
};
