import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  createMovieApiUrl,
  createMovieDetailApiUrl,
  createRequestOptions,
  mapFetchMovieDetailResponse,
  mapFetchMoviePageDataResponse,
} from "../../src/API/apiBuilder";
import type { TmdbFetchMoviePageDataResponse, TmdbMovieDetailResponse } from "../../src/API/api.types";

describe("apiBuilder", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_TMDB_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("인기 영화 조회 URL을 생성한다", () => {
    const url = createMovieApiUrl(1, "");

    expect(url.pathname).toBe("/3/movie/popular");
    expect(url.searchParams.get("language")).toBe("ko-KR");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.has("query")).toBe(false);
  });

  it("검색어가 있으면 검색 URL을 생성한다", () => {
    const url = createMovieApiUrl(2, "해리");

    expect(url.pathname).toBe("/3/search/movie");
    expect(url.searchParams.get("language")).toBe("ko-KR");
    expect(url.searchParams.get("page")).toBe("2");
    expect(url.searchParams.get("query")).toBe("해리");
  });

  it("영화 상세 조회 URL을 생성한다", () => {
    const url = createMovieDetailApiUrl(7);

    expect(url.pathname).toBe("/3/movie/7");
    expect(url.searchParams.get("language")).toBe("ko-KR");
    expect(url.searchParams.has("page")).toBe(false);
    expect(url.searchParams.has("query")).toBe(false);
  });

  it("TMDB 요청 옵션을 생성한다", () => {
    expect(createRequestOptions()).toEqual({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer test-api-key",
      },
    });
  });

  it("TMDB 응답을 Movie 페이지 데이터로 변환한다", () => {
    const moviePageData: TmdbFetchMoviePageDataResponse = {
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
    };

    const response = mapFetchMoviePageDataResponse(moviePageData);

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
          userRating: null,
        },
      ],
    });
  });

  it("페이지 정보가 없으면 기본값 0으로 변환한다", () => {
    const moviePageData: TmdbFetchMoviePageDataResponse = {
      results: [],
    };

    const response = mapFetchMoviePageDataResponse(moviePageData);

    expect(response).toEqual({
      currentPage: 0,
      totalPages: 0,
      results: [],
    });
  });

  it("TMDB 상세 응답을 MovieDetail 데이터로 변환한다", () => {
    const movieDetailData: TmdbMovieDetailResponse = {
      title: "해리 포터와 비밀의 방",
      poster_path: "/detail-poster-1.jpg",
      release_date: "2002-11-13",
      genres: [{ name: "모험" }, { name: "판타지" }],
      vote_average: 7.7,
      overview: "도비가 나타나 학교로 돌아가지 말라고 경고한다.",
    };

    const response = mapFetchMovieDetailResponse(movieDetailData);

    expect(response).toEqual({
      poster_path: "/detail-poster-1.jpg",
      title: "해리 포터와 비밀의 방",
      release_year: "2002",
      genres: ["모험", "판타지"],
      rate: 7.7,
      overview: "도비가 나타나 학교로 돌아가지 말라고 경고한다.",
      userRating: null,
    });
  });
});
