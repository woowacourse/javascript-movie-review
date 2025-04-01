import { MovieList } from "../../../shared/types/movies";
import { mapToMovieList } from "../../../shared/domain/mapToMovie";
import URL from "../../../shared/constants/url";
import API_OPTIONS from "../../../shared/constants/apiOptions";

const url = (page: number) =>
  `${URL.BASE_API_URL}movie/popular?language=ko-KR&page=${page}`;

export const getMovieList = async ({
  page,
}: {
  page: number;
}): Promise<MovieList> => {
  const response = await fetch(url(page), {
    ...API_OPTIONS,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie list");
  }

  const data = await response.json();

  return mapToMovieList(data);
};
