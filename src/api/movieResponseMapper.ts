import type { MovieListResponse } from "./apiTypes";

import type { Movie, MovieDetail } from "../../types/movie";
import { ApiParseError } from "../errors/DomainErrors";

export const mapMovieListResponse = (data: unknown): MovieListResponse => {
  if (typeof data != "object" || data === null) {
    throw new ApiParseError("영화 목록 응답이 객체가 아닙니다");
  }

  const raw = data as Record<string, unknown>;

  if (!Array.isArray(raw.results)) {
    throw new ApiParseError("영화 목록 응답 스킴이 올바르지 않습니다");
  }

  const movies: Movie[] = raw.results.map((movie: unknown): Movie => {
    if (typeof movie !== "object" || movie === null) {
      throw new ApiParseError("영화 목록 응답 스킴이 올바르지 않습니다");
    }

    const m = movie as Record<string, unknown>;

    if (typeof m.vote_average !== "number") {
      throw new ApiParseError("영화 목록 응답 스킴이 올바르지 않습니다");
    }

    return {
      id: typeof m.id === "number" ? m.id : 0,
      title: typeof m.title === "string" ? m.title : "",
      rate: m.vote_average,
      thumbnail_path: typeof m.poster_path === "string" ? m.poster_path : null,
      hero_path: typeof m.backdrop_path === "string" ? m.backdrop_path : null,
    };
  });

  return {
    currentPage: typeof raw.page === "number" ? raw.page : 0,
    totalPages: typeof raw.total_pages === "number" ? raw.total_pages : 0,
    results: movies,
  };
};

export const mapMovieDetailResponse = (data: unknown): MovieDetail => {
  if (typeof data !== "object" || data === null) {
    throw new ApiParseError("영화 상세 응답이 객체가 아닙니다");
  }
  const raw = data as Record<string, unknown>;

  if (typeof raw.vote_average !== "number") {
    throw new ApiParseError("영화 상세 응답 스킴이 올바르지 않습니다");
  }

  return {
    id: typeof raw.id === "number" ? raw.id : 0,
    title: typeof raw.title === "string" ? raw.title : "",
    rate: raw.vote_average,
    thumbnail_path:
      typeof raw.poster_path === "string" ? raw.poster_path : null,
    hero_path: typeof raw.backdrop_path === "string" ? raw.backdrop_path : null,
    // 없어도 "장르 미분류"로 보이는 게 정상
    // filter(Boolean): 각 g.name이 문자열이 아니면 위 map에서 ""로 매핑되므로 걸러냄
    genres: Array.isArray(raw.genres)
      ? raw.genres
          .map((g) =>
            typeof g === "object" &&
            g !== null &&
            typeof (g as { name?: unknown }).name === "string"
              ? (g as { name: string }).name
              : "",
          )
          .filter(Boolean)
      : [],
    // 개봉 전 영화는 release_date가 비어있는 게 정상
    releaseYear:
      typeof raw.release_date === "string" ? raw.release_date.slice(0, 4) : "",
    overview: typeof raw.overview === "string" ? raw.overview : "",
  };
};
