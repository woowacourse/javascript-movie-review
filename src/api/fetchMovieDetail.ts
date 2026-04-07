import { MovieDetail } from "../../types/movie.ts";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const fetchMovieDetail = async (
  movieId: number,
): Promise<MovieDetail> => {
  const response = await fetch(`${apiUrl}/movie/${movieId}?language=ko-KR`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("영화 상세 정보를 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  const {
    id,
    poster_path,
    title,
    release_date,
    genres,
    vote_average,
    overview,
  } = data;

  return {
    id,
    poster_path,
    title,
    release_date,
    genres,
    vote_average,
    overview,
  };
};
