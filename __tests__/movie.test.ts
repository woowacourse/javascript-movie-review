import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  fetchPopularMovies,
  fetchSearchedMovies,
} from "../src/api/fetchMovies.ts";

describe("영화 목록 테스트", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("인기 영화 목록을 가져온다.", async () => {
    // given
    const mockData = {
      results: [
        {
          title: "이현",
          poster_path: "/path1.jpg",
          vote_average: 7.5,
        },
        {
          title: "이현2",
          poster_path: "/path2.jpg",
          vote_average: 8.0,
        },
      ],
      total_pages: 100,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    // when
    const result = await fetchPopularMovies(1);

    // then
    expect(result.movies).toHaveLength(2);
    expect(result.movies[0].title).toBe("이현");
    expect(result.totalPages).toBe(100);
  });

  it("검색된 영화 목록을 가져온다.", async () => {
    // given
    const mockSearchData = {
      results: [
        {
          title: "인사이드 아웃 2",
          poster_path: "/inside.jpg",
          vote_average: 9.0,
        },
      ],
      total_pages: 5,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockSearchData,
    } as Response);

    // when
    const result = await fetchSearchedMovies(1, "인사이드");

    // then
    expect(result.movies).toHaveLength(1);
    expect(result.movies[0].title).toBe("인사이드 아웃 2");
    expect(result.totalPages).toBe(5);
  });
});

describe("영화 목록 API 에러 테스트", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("인기 영화 목록 요청 실패 시(500 에러) 정의된 에러 메시지를 던진다.", async () => {
    // given
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    // when & then
    await expect(fetchPopularMovies(1)).rejects.toThrow(
      "영화를 불러오는 데 실패했습니다.",
    );
  });

  it("영화 검색 실패 시(404 에러) 상태 코드를 포함한 에러 메시지를 던진다.", async () => {
    // given
    const status = 404;
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: status,
    } as Response);

    // when & then
    await expect(fetchSearchedMovies(1, "인사이드")).rejects.toThrow(
      `영화 검색 중 에러가 발생했습니다.`,
    );
  });

  it("네트워크 장애(Network Error) 발생 시 에러를 던진다.", async () => {
    // given
    vi.mocked(fetch).mockRejectedValue(new Error("Network Error"));

    // when & then
    await expect(fetchPopularMovies(1)).rejects.toThrow("Network Error");
  });
});
