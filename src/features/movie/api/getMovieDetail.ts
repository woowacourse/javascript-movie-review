import { mapToMovieDetail } from "../../../shared/domain/mapToMovie";
import { MovieDetail } from "../../../shared/types/domain/movies";
import { createApiUrl, fetchApi } from "../../../shared/utils/apiUtils";

const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const url = createApiUrl({
    endpoint: `movie/${id}`,
    params: {
      language: "ko-KR",
    },
  });

  return fetchApi(url, mapToMovieDetail);
};

export default getMovieDetail;
