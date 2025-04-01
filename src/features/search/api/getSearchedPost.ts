import { MovieList } from "../../../shared/types/movies";
import { mapToMovieList } from "../../../shared/domain/mapToMovie";
import URL from "../../../shared/constants/url";
import API_OPTIONS from "../../../shared/constants/apiOptions";

const url = (query: string, page: number) =>
  `${URL.BASE_API_URL}search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`;

export const getSearchedPost = async (
  query: string,
  page: number
): Promise<MovieList> => {
  const response = await fetch(url(query, page), {
    ...API_OPTIONS,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch searched post");
  }

  const data = await response.json();

  return mapToMovieList(data);
};
