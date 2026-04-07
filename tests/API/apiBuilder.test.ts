import { describe, expect, it } from "vitest";

import { mapFetchMoviePageDataResponse } from "../../src/api/movieResponseMapper";

describe("mapFetchMoviePageDataResponse", () => {
  it("TMDB 응답을 Movie 페이지 데이터로 변환한다", () => {
    const response = mapFetchMoviePageDataResponse({
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
    const response = mapFetchMoviePageDataResponse({
      results: [],
    });

    expect(response).toEqual({
      currentPage: 0,
      totalPages: 0,
      results: [],
    });
  });
});
