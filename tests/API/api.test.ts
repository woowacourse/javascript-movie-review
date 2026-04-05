import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TmdbClient } from "../../src/api/TmdbClient";
import { ApiError, ApiParseError, ConfigError, NetworkError } from "../../src/errors/DomainErrors";

describe("TmdbClient", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_TMDB_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe("생성자", () => {
    it("API key 가 빈 문자열이면 ConfigError 를 throw 한다", () => {
      expect(() => new TmdbClient("")).toThrow(ConfigError);
    });

    it("API key 가 있으면 정상 생성된다", () => {
      expect(() => new TmdbClient("test-api-key")).not.toThrow();
    });
  });

  describe("searchMovies", () => {
    it("요청이 성공하면 매핑된 데이터를 반환한다", async () => {
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
            headers: { "Content-Type": "application/json" },
          },
        ),
      );
      vi.stubGlobal("fetch", fetchMock);

      const client = new TmdbClient("test-api-key");
      const response = await client.searchMovies("해리", 2);

      expect(fetchMock).toHaveBeenCalledTimes(1);

      const [requestUrl, requestOptions] = fetchMock.mock.calls[0] as [URL, RequestInit];

      expect(requestUrl.pathname).toBe("/3/search/movie");
      expect(requestUrl.searchParams.get("language")).toBe("ko-KR");
      expect(requestUrl.searchParams.get("page")).toBe("2");
      expect(requestUrl.searchParams.get("query")).toBe("해리");
      expect(requestOptions).toEqual({
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer test-api-key",
        },
      });

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
          },
        ],
      });
    });
  });

  describe("fetchPopular", () => {
    it("popular 엔드포인트로 요청한다", async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ page: 1, total_pages: 1, results: [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );
      vi.stubGlobal("fetch", fetchMock);

      const client = new TmdbClient("test-api-key");
      await client.fetchPopular(1);

      const [requestUrl] = fetchMock.mock.calls[0] as [URL, RequestInit];
      expect(requestUrl.pathname).toBe("/3/movie/popular");
      expect(requestUrl.searchParams.get("page")).toBe("1");
      expect(requestUrl.searchParams.get("query")).toBeNull();
    });
  });

  describe("에러 번역", () => {
    it("fetch 자체가 실패하면 NetworkError 를 throw 한다", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

      const client = new TmdbClient("test-api-key");
      await expect(client.fetchPopular(1)).rejects.toBeInstanceOf(NetworkError);
    });

    it("응답이 2xx 가 아니면 ApiError 를 throw 하고 status 를 담는다", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

      const client = new TmdbClient("test-api-key");
      await expect(client.fetchPopular(1)).rejects.toMatchObject({
        name: "ApiError",
        status: 500,
      });
      await expect(client.fetchPopular(1)).rejects.toBeInstanceOf(ApiError);
    });

    it("JSON 파싱에 실패하면 ApiParseError 를 throw 한다", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          new Response("not a json", {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        ),
      );

      const client = new TmdbClient("test-api-key");
      await expect(client.fetchPopular(1)).rejects.toBeInstanceOf(ApiParseError);
    });
  });
});
