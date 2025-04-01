import { MovieList } from "../../../shared/types/domain/movies";
import { mapToMovieList } from "../../../shared/domain/mapToMovie";
import { createApiUrl, fetchApi } from "../../../shared/utils/apiUtils";

export const getSearchedPost = async (
  query: string,
  page: number
): Promise<MovieList> => {
  const url = createApiUrl({
    endpoint: "search/movie",
    params: {
      query,
      include_adult: "true",
      language: "ko-KR",
      page,
    },
  });

  return fetchApi(url, mapToMovieList);
};
