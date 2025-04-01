import { mapToMovieDetail } from "../../../shared/domain/mapToMovie";
import { IMovieDetail } from "../../../shared/types/movies";
import URL from "../../../shared/constants/url";
import API_OPTIONS from "../../../shared/constants/apiOptions";

const url = (id: number) => `${URL.BASE_API_URL}movie/${id}?language=ko-KR`;

const getMovieDetail = async (id: number): Promise<IMovieDetail> => {
  const response = await fetch(url(id), {
    ...API_OPTIONS,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie detail");
  }

  const data = await response.json();

  return mapToMovieDetail(data);
};

export default getMovieDetail;
