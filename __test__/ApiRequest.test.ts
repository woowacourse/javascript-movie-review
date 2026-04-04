import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchMovies } from "../src/movieAPIResponse.ts";
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
});
