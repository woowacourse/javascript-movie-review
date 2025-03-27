import { MovieListResponse } from "../../../shared/types/movies";

const url = (page: number) =>
  `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const getMovieList = async ({
  page,
}: {
  page: number;
}): Promise<MovieListResponse> => {
  const response = await fetch(url(page), options);

  if (!response.ok) {
    throw new Error("Failed to fetch movie list");
  }

  return response.json();
};
