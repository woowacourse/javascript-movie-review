import { fetchData } from "./fetchData";
import MovieDetails from "../movie/MovieDetails";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovieDetailsData = async (movieId: string) => {
  if (!API_KEY) {
    throw new Error(
      "유효하지 않은 API 키입니다. API 키를 확인하고 다시 시도해주세요."
    );
  }

  const movieDetailsUrl = `${BASE_URL}/movie/${movieId}`;

  const params = {
    api_key: API_KEY,
    language: "ko-KR",
  };

  const movieDetailsQueryString = `${movieDetailsUrl}?${new URLSearchParams(
    params
  ).toString()}`;

  const movieDetails = await fetchData(movieDetailsQueryString);

  if (movieDetails) {
    return new MovieDetails(movieDetails);
  } else {
    throw new Error("영화 상세 정보를 불러오는 데 실패했습니다.");
  }
};
