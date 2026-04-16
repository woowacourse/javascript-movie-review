import { ApiParseError } from "./../../src/errors/DomainErrors";
import { describe, expect, it } from "vitest";

import {
  mapMovieDetailResponse,
  mapMovieListResponse,
} from "../../src/api/movieResponseMapper";

describe("mapMovieListResponse", () => {
  it("TMDB 응답을 MovieListResponse로 변환한다", () => {
    const response = mapMovieListResponse({
      page: 3,
      total_pages: 10,
      results: [
        {
          id: 1,
          title: "해리 포터와 마법사의 돌",
          vote_average: 7.8,
          poster_path: "/poster-1.jpg",
          backdrop_path: "/backdrop-1.jpg",
        },
      ],
    });

    expect(response).toEqual({
      currentPage: 3,
      totalPages: 10,
      results: [
        {
          id: 1,
          title: "해리 포터와 마법사의 돌",
          rate: 7.8,
          thumbnail_path: "/poster-1.jpg",
          hero_path: "/backdrop-1.jpg",
        },
      ],
    });
  });

  it("페이지 정보가 없으면 기본값 0으로 변환한다", () => {
    const result = mapMovieListResponse({
      results: [],
    });

    expect(result).toEqual({
      currentPage: 0,
      totalPages: 0,
      results: [],
    });
  });

  it("results가 없는 깨진 응답이면 ApiParseError를 throw한다", () => {
    expect(() => mapMovieListResponse({})).toThrow(ApiParseError);
    expect(() => mapMovieListResponse({ results: null })).toThrow(
      ApiParseError,
    );
    expect(() => mapMovieListResponse({ results: "not-array" })).toThrow(
      ApiParseError,
    );
  });
});

describe("mapMovieDetailResponse", () => {
  it("TMDB 상세 응답을 MovieDetail로 변환한다", () => {
    const result = mapMovieDetailResponse({
      id: 1022789,
      title: "인사이드 아웃 2",
      vote_average: 7.617,
      poster_path: "/poster.jpg",
      backdrop_path: "/backdrop.jpg",
      genres: [
        { id: 16, name: "애니메이션" },
        { id: 10751, name: "가족" },
      ],
      release_date: "2024-06-11",
      overview: "13살이 된 라일리의 이야기",
    });

    expect(result).toEqual({
      id: 1022789,
      title: "인사이드 아웃 2",
      rate: 7.617,
      thumbnail_path: "/poster.jpg",
      hero_path: "/backdrop.jpg",
      genres: ["애니메이션", "가족"],
      releaseYear: "2024",
      overview: "13살이 된 라일리의 이야기",
    });
  });

  it("genres가 없으면 빈 배열을 반환한다", () => {
    const result = mapMovieDetailResponse({
      id: 1,
      title: "테스트",
      vote_average: 5,
      poster_path: null,
      backdrop_path: null,
      release_date: "2024-01-01",
      overview: "줄거리",
    });

    expect(result.genres).toEqual([]);
  });

  it("release_date가 없으면 releaseYear는 빈 문자열이다", () => {
    const result = mapMovieDetailResponse({
      id: 1,
      title: "테스트",
      vote_average: 5,
      poster_path: null,
      backdrop_path: null,
      overview: "줄거리",
    });

    expect(result.releaseYear).toBe("");
  });

  it("상세 응답에 vote_average가 없으면 ApiParseError를 throw한다", () => {
    expect(() =>
      mapMovieDetailResponse({
        id: 1,
        title: "테스트",
        release_date: "2024-01-01",
        genres: [],
        poster_path: null,
        backdrop_path: null,
        overview: "",
      }),
    ).toThrow(ApiParseError);
  });

  it("목록 응답의 movie에 vote_average가 없으면 ApiParseError를 throw한다", () => {
    expect(() =>
      mapMovieListResponse({
        page: 1,
        total_pages: 1,
        results: [
          { id: 1, title: "테스트", poster_path: null, backdrop_path: null },
        ],
      }),
    ).toThrow(ApiParseError);
  });
});
