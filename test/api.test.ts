import { describe, it, expect, vi } from "vitest";

import { getMoviePopular } from "../src/services/api";
import { moviesFixture } from "./fixtures";

describe("api 함수 호출 테스트", () => {
  it("getMoviePopular 를 호출하면 20개의 영화 목록을 가지고 온다", async () => {
    const mockData = { ...moviesFixture };

    const fetchMock = vi.fn().mockResolvedValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    const data = await getMoviePopular({ page: 1 });

    expect(data.results.length).toEqual(20);
  });
});
