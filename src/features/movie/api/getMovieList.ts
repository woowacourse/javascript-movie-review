import { MovieList } from "../../../shared/types/domain/movies";
import { mapToMovieList } from "../../../shared/domain/mapToMovie";
import { createApiUrl, fetchApi } from "../../../shared/utils/apiUtils";

export const getMovieList = async ({
  page,
}: {
  page: number;
}): Promise<MovieList> => {
  const url = createApiUrl({
    endpoint: "movie/popular",
    params: {
      language: "ko-KR",
      page,
    },
  });

  return fetchApi(url, mapToMovieList);
};
