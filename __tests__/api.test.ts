import { vi, expect, test, describe } from "vitest";
import { Movie } from "../types/types";

describe("TMDB API에서 인기 영화 목록을 가져온다.", () => {
  test("API 성공 시 데이터 반환", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              {
                id: 1,
                title: "Test Movie",
                poster_path: "/test.jpg",
                vote_average: 7.5,
              },
            ],
          }),
      }),
    ) as any;

    const data: { results: Movie[] } = await fetchMovies();

    expect(data.results[0].title).toBe("Test Movie");
  });
});
