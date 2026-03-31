import { describe, it, expect } from "vitest";
import { fetchMovies } from "../src/movieAPIResponse.ts";
import { renderMovies } from "../src/movieRenderer.ts";

describe("Api Requests", () => {
  it("영화를 20개 가져온다", async () => {
    const movies = await fetchMovies();
    console.log(movies);
    expect(movies).toHaveLength(20);
  });
});

describe("Render Tests", () => {
  (it("각 영화당 <li> 태그를 반환한다."), async () => {});
});
