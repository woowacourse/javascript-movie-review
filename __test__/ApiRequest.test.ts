import { describe, it, expect } from "vitest";
import { fetchMovies } from "../src/movieAPIResponse.ts";
import { renderMovies } from "../src/movieRenderer.ts";

describe("Api Requests", () => {
  it("영화를 20개 가져온다", async () => {
    const pageNumber = 1;
    const movies = await fetchMovies(pageNumber);
    expect(movies).toHaveLength(20);
  });
});
