import { MovieList } from "../../../shared/types/movies";
import { mapToMovieList } from "../../../shared/domain/mapToMovie";

const url = (query: string, page: number) =>
  `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const getSearchedPost = async (
  query: string,
  page: number
): Promise<MovieList> => {
  const response = await fetch(url(query, page), options);

  if (!response.ok) {
    throw new Error("Failed to fetch searched post");
  }

  const data = await response.json();

  return mapToMovieList(data);
};
