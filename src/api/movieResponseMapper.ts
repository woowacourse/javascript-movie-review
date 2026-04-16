import type { MovieListResponse } from "./apiTypes";

import type { Movie, MovieDetail } from "../../types/movie";
import { ApiParseError } from "../errors/DomainErrors";

export const mapMovieListResponse = (data: any): MovieListResponse => {
  if (!Array.isArray(data.results)) {
    throw new ApiParseError("영화 목록 응답 스킴이 올바르지 않습니다");
  }

  const movies: Movie[] = data.results.map((movie: any): Movie => {
    if (typeof movie.vote_average !== "number") {
      throw new ApiParseError("영화 목록 응답 스킴이 올바르지 않습니다");
    }
    return {
      id: movie.id,
      title: movie.title,
      rate: movie.vote_average,
      thumbnail_path: movie.poster_path,
      hero_path: movie.backdrop_path,
    };
  });

  return {
    currentPage: data.page ?? 0,
    totalPages: data.total_pages ?? 0,
    results: movies,
  };
};

export const mapMovieDetailResponse = (data: any): MovieDetail => {
  if (typeof data.vote_average !== "number") {
    throw new ApiParseError("영화 상세 응답 스킴이 올바르지 않습니다");
  }

  return {
    id: data.id,
    title: data.title,
    rate: data.vote_average,
    thumbnail_path: data.poster_path,
    hero_path: data.backdrop_path,
    genres: Array.isArray(data.genres)
      ? data.genres.map((g: any) => g.name)
      : [],
    releaseYear: typeof data.release_date === "string"
        ? data.release_date.slice(0, 4)
        : "",
    overview: data.overview ?? "",
  };
};
