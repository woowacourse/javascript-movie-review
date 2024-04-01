import {
  API_KEY,
  DETAIL_MOVIE_URL_WITHOUT_ID,
  IMAGE_BASE_URL,
} from "../constants/api";

import IMAGE_PLACEHOLDER from "../../templates/image-Placeholder.png";
import validateResponse from "./validateResponse";

const getMovieDetails = async (id: number) => {
  const url = DETAIL_MOVIE_URL_WITHOUT_ID;
  const queryParams = `language=ko-KR&api_key=${API_KEY}`;
  const detailMovieUrl = `${url}/${id}?${queryParams}`;

  const res = await fetch(detailMovieUrl);
  validateResponse(res.status);

  const movieDetails = await res.json();

  return extractMovieDetails(movieDetails);
};

const extractMovieDetails = (res: MovieDetailResult) => {
  return {
    id: res.id,
    korTitle: res.title,
    genres: res.genres.map((el) => el.name),
    voteAverage: res.vote_average,
    descriptions: res.overview ? res.overview : "이 영화의 설명이 없습니다.",
    posterPath: res.poster_path
      ? IMAGE_BASE_URL + res.poster_path
      : IMAGE_PLACEHOLDER,
  };
};

export default getMovieDetails;

export interface MovieDetailResult {
  id: number;
  title: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  poster_path: string;
}
