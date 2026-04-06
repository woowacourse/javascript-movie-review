import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchMovies, fetchSearchedMovies } from "../src/movieAPIResponse.ts";
import mockMovies from "../cypress/fixtures/movies.json";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMovies),
    }),
  );
});

describe("Api Requests", () => {
  it("영화를 20개 가져온다", async () => {
    const result = await fetchMovies(1);
    expect(result.results).toHaveLength(20);
  });

  it("response.ok가 false이면 fetchMovies는 에러를 throw한다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );
    await expect(fetchMovies(1)).rejects.toThrow("FAILED TO FETCH POPULAR MOVIES");
  });

  it("response.ok가 false이면 fetchSearchedMovies는 에러를 throw한다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );
    await expect(fetchSearchedMovies("아이언맨", 1)).rejects.toThrow("FAILED TO FETCH SEARCHED MOVIES");
  });
});
