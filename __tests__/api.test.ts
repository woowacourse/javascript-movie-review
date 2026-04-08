import { vi, expect, test, describe } from "vitest";
import { Movie } from "../types/types";
import { fetchMoviesApi } from "../src/features/api/fetchMoviesApi";
import { fetchMovieDetailApi } from "../src/features/api/fetchMovieDetailApi";

describe("TMDB API에서 영화 목록을 가져온다.", () => {
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

  test("API 응답이 실패하면 에러를 던진다", async () => {
    global.fetch = vi.fn(async () => ({
      ok: false,
      status: 500,
    })) as any;

    await expect(fetchMoviesApi("movie/popular", 1)).rejects.toThrow(
      "HTTP ERROR: 500",
    );
  });

  test("네트워크 에러가 발생하면 안내 메시지를 던진다", async () => {
    global.fetch = vi.fn(async () => {
      throw new TypeError("Fail");
    }) as any;

    await expect(fetchMoviesApi("movie/popular", 1)).rejects.toThrow(
      "REQUEST ERROR",
    );
  });
});

describe("TMDB API에서 영화 상세 정보를 가져온다.", () => {
  test("API 성공 시 데이터 반환", async () => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: () => ({
        id: 1,
        title: "Test Movie",
        poster_path: "/test.jpg",
        vote_average: 7.5,
        overview: "Test Movie Overview",
        genres: [{ name: "액션" }, { name: "로맨스" }],
        release_date: "2026-04-07",
      }),
    })) as any;

    const data = await fetchMovieDetailApi(1);

    expect(data.title).toBe("Test Movie");
    expect(data.poster_path).toBe("/test.jpg");
    expect(data.vote_average).toBe(7.5);
    expect(data.overview).toBe("Test Movie Overview");
    expect(data.genres.length).toBe(2);
    expect(data.release_date).toBe("2026-04-07");
  });

  test("API 응답이 실패하면 에러를 던진다", async () => {
    global.fetch = vi.fn(async () => ({
      ok: false,
      status: 500,
    })) as any;

    await expect(fetchMovieDetailApi(1)).rejects.toThrow("HTTP ERROR: 500");
  });

  test("네트워크 에러가 발생하면 안내 메시지를 던진다", async () => {
    global.fetch = vi.fn(async () => {
      throw new TypeError("Fail");
    }) as any;

    await expect(fetchMovieDetailApi(1)).rejects.toThrow("REQUEST ERROR");
  });
});
