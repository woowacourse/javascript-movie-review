import { vi, expect, test, describe } from "vitest";
import { Movie } from "../types/types";
import {
  getPopularMovies,
  getSearchMovies,
} from "../src/features/movieModel.ts";

describe("TMDB API에서 영화 목록을 가져온다.", () => {
  test("인기 영화 API 성공 시 데이터 반환", async () => {
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
      await getPopularMovies(1);

    expect(data.results[0].title).toBe("Test Movie");
    expect(data.total_pages).toBe(11);
  });

  test("인기 영화 API 요청 실패 시 에러 발생", async () => {
    global.fetch = vi.fn(async () => ({
      ok: false,
      status: 404,
    })) as any;

    await expect(getPopularMovies(1)).rejects.toThrow("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  });

  test("검색 API 성공 시 데이터 반환", async () => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: () => ({
        results: [
          {
            id: 1,
            title: "Search Movie",
            poster_path: "/search.jpg",
            vote_average: 8.0,
          },
        ],
        total_pages: 5,
      }),
    })) as any;

    const data: { results: Movie[]; total_pages: number } =
      await getSearchMovies(1, "아바타");

    expect(data.results[0].title).toBe("Search Movie");
    expect(data.total_pages).toBe(5);
  });

  test("검색 API 요청 실패 시 에러 발생", async () => {
    global.fetch = vi.fn(async () => ({
      ok: false,
      status: 500,
    })) as any;

    await expect(getSearchMovies(1, "아바타")).rejects.toThrow(
      "영화 데이터를 불러오는 중 오류가 발생했습니다.",
    );
  });
});
