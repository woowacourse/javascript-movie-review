import { vi, expect, test, describe, afterEach } from "vitest";
import { Movie, MovieResponse } from "../types/types";
import { fetchApi } from "../src/features/api/fetchApi";

const MOCK_MOVIE: Movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
  vote_average: 7.5,
  backdrop_path: "/backdrop.jpg",
};

const MOCK_RESPONSE = {
  results: [MOCK_MOVIE],
  total_pages: 11,
};

describe("TMDB API", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("인기 영화 목록을 가져온다", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: () => MOCK_RESPONSE })));

    const data : MovieResponse = await fetchApi("movie/popular", 1);

    expect(data.results[0].title).toBe("Test Movie");
    expect(data.total_pages).toBe(11);
  });

  test("검색어로 영화 목록을 가져온다", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: () => MOCK_RESPONSE })));

    const data : MovieResponse = await fetchApi("search/movie", 1, "아바타");

    expect(data.results[0].title).toBe("Test Movie");
    expect(data.total_pages).toBe(11);
  });

  test("401 응답 시 UnauthorizedError를 던진다", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 401 })));

    await expect(fetchApi("movie/popular", 1)).rejects.toThrow("인증에 실패했습니다.");
  });

  test("404 응답 시 NotFoundError를 던진다", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404 })));

    await expect(fetchApi("movie/popular", 1)).rejects.toThrow("요청한 리소스를 찾을 수 없습니다.");
  });

  test("429 응답 시 TooManyRequestsError를 던진다", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429 })));

    await expect(fetchApi("movie/popular", 1)).rejects.toThrow("요청이 너무 많습니다.");
  });

  test("503 응답 시 ServiceUnavailableError를 던진다", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 503 })));

    await expect(fetchApi("movie/popular", 1)).rejects.toThrow("서버가 일시적으로 사용 불가 상태입니다.");
  });

  test("처리되지 않은 HTTP 에러 상태 코드는 ApiError를 던진다", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 500 })));

    await expect(fetchApi("movie/popular", 1)).rejects.toThrow("API 요청 실패: 500");
  });
});
