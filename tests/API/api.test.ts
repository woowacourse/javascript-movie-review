import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchMovieDetail, fetchMoviePageData } from "../../src/API/api";
import { API_REQUEST_TIMEOUT_MS } from "../../src/constants/constant";

describe("fetchMoviePageData", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_TMDB_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("영화 목록 요청이 성공하면 매핑된 데이터를 반환한다", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          page: 2,
          total_pages: 3,
          results: [
            {
              id: 1,
              title: "해리 포터와 비밀의 방",
              vote_average: 7.4,
              poster_path: "/poster-1.jpg",
              backdrop_path: "/backdrop-1.jpg",
            },
          ],
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    const response = await fetchMoviePageData(2, "해리");

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [requestUrl, requestOptions] = fetchMock.mock.calls[0] as [URL, RequestInit];

    expect(requestUrl.pathname).toBe("/3/search/movie");
    expect(requestUrl.searchParams.get("language")).toBe("ko-KR");
    expect(requestUrl.searchParams.get("page")).toBe("2");
    expect(requestUrl.searchParams.get("query")).toBe("해리");
    expect(requestOptions).toMatchObject({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer test-api-key",
      },
    });
    expect(requestOptions.signal).toBeInstanceOf(AbortSignal);

    expect(response).toEqual({
      currentPage: 2,
      totalPages: 3,
      results: [
        {
          id: 1,
          title: "해리 포터와 비밀의 방",
          rate: 7.4,
          thumbnail_path: "/poster-1.jpg",
          hero_path: "/backdrop-1.jpg",
          userRating: null,
        },
      ],
    });
  });

  it("응답이 실패하면 에러를 던진다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(null, {
          status: 500,
        }),
      ),
    );

    await expect(fetchMoviePageData(1)).rejects.toThrow("영화 정보를 불러오는데 실패했습니다: 500");
  });

  it("응답이 너무 오래 걸리면 타임아웃 에러를 던진다", async () => {
    vi.useFakeTimers();

    vi.stubGlobal(
      "fetch",
      vi.fn((_url: URL, requestOptions?: RequestInit) => {
        return new Promise<Response>((_resolve, reject) => {
          requestOptions?.signal?.addEventListener("abort", () => {
            reject(new DOMException("The operation was aborted.", "AbortError"));
          });
        });
      }),
    );

    const requestPromise = fetchMoviePageData(1);
    const timeoutExpectation = expect(requestPromise).rejects.toThrow(
      "영화 정보를 불러오는데 시간이 너무 오래 걸립니다. 다시 시도해주세요.",
    );

    await vi.advanceTimersByTimeAsync(API_REQUEST_TIMEOUT_MS);

    await timeoutExpectation;
  });
});

describe("fetchMovieDetail", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_TMDB_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("영화 상세 요청이 성공하면 매핑된 데이터를 반환한다", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          title: "해리 포터와 아즈카반의 죄수",
          poster_path: "/detail-poster-3.jpg",
          release_date: "2004-05-31",
          genres: [{ name: "모험" }, { name: "판타지" }],
          vote_average: 8.0,
          overview: "시리우스 블랙이 탈옥하면서 벌어지는 이야기",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    const response = await fetchMovieDetail(3);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [requestUrl, requestOptions] = fetchMock.mock.calls[0] as [URL, RequestInit];

    expect(requestUrl.pathname).toBe("/3/movie/3");
    expect(requestUrl.searchParams.get("language")).toBe("ko-KR");
    expect(requestUrl.searchParams.has("page")).toBe(false);
    expect(requestUrl.searchParams.has("query")).toBe(false);
    expect(requestOptions).toMatchObject({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer test-api-key",
      },
    });
    expect(requestOptions.signal).toBeInstanceOf(AbortSignal);

    expect(response).toEqual({
      poster_path: "/detail-poster-3.jpg",
      title: "해리 포터와 아즈카반의 죄수",
      release_year: "2004",
      genres: ["모험", "판타지"],
      rate: 8,
      overview: "시리우스 블랙이 탈옥하면서 벌어지는 이야기",
      userRating: null,
    });
  });

  it("영화 상세 응답이 실패하면 에러를 던진다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(null, {
          status: 500,
        }),
      ),
    );

    await expect(fetchMovieDetail(1)).rejects.toThrow("영화 정보를 불러오는데 실패했습니다: 500");
  });
});
