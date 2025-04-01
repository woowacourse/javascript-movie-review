import { mapToMovieDetail } from "../../../shared/domain/mapToMovie";
import { IMovieDetail } from "../../../shared/types/movies";
import URL from "../../../shared/constants/url";

const url = (id: number) => `${URL.BASE_API_URL}movie/${id}?language=ko-KR`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

const getMovieDetail = async (id: number): Promise<IMovieDetail> => {
  const response = await fetch(url(id), options);

  if (!response.ok) {
    throw new Error("Failed to fetch movie detail");
  }

  const data = await response.json();

  return mapToMovieDetail(data);
};

export default getMovieDetail;
