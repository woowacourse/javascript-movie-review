import { vi, expect, test, describe } from "vitest";
import { Movie } from "../types/types";
import { fetchMoviesApi } from "../src/features/api/fetchMoviesApi";

describe("TMDB API에서 인기 영화 목록을 가져온다.", () => {
  test("API 성공 시 데이터 반환", async () => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: () => ({
        results: [
          {
            id: 1,
            title: "Test Movie",
            poster_path: "/test.jpg",
            vote_average: 7.5,
          },
        ],
        total_pages: 11,
      }),
    })) as any;

    const data: { results: Movie[]; total_pages: number } =
      await fetchMoviesApi("movie/popular", 1);

    expect(data.results[0].title).toBe("Test Movie");
    expect(data.total_pages).toBe(11);
  });

  test("검색 API 성공 시 데이터 반환", async () => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: () => ({
        results: [
          {
            id: 1,
            title: "Test Movie",
            poster_path: "/test.jpg",
            vote_average: 7.5,
          },
        ],
        total_pages: 11,
      }),
    })) as any;

    const data: { results: Movie[]; total_pages: number } =
      await fetchMoviesApi("search/movie", 1, "아바타");

    expect(data.results[0].title).toBe("Test Movie");
    expect(data.total_pages).toBe(11);
  });
});
