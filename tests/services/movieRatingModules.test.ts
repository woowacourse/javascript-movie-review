import { describe, expect, it } from "vitest";

import { createMovieRatingRepository } from "../../src/repositories/MovieRatingRepository";
import {
  applyMovieUserRating,
  applyMovieUserRatings,
  formatMovieUserRatingScore,
  getMovieUserRatingLabel,
  isMovieUserRating,
} from "../../src/services/MovieRatingService";

const createMemoryStorage = (initialValue: Record<string, string> = {}) => {
  const storage = new Map(Object.entries(initialValue));

  return {
    getItem(key: string) {
      return storage.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      storage.set(key, value);
    },
  };
};

describe("movie rating modules", () => {
  it("별점 값 유효성을 판별하고 문구와 점수를 포맷한다", () => {
    expect(isMovieUserRating(8)).toBe(true);
    expect(isMovieUserRating(5)).toBe(false);
    expect(getMovieUserRatingLabel(8)).toBe("재미있어요");
    expect(getMovieUserRatingLabel(null)).toBe("별점을 남겨보세요");
    expect(formatMovieUserRatingScore(8)).toBe("(8/10)");
    expect(formatMovieUserRatingScore(null)).toBe("(0/10)");
  });

  it("영화 데이터에 사용자 별점을 적용한다", () => {
    const movie = {
      id: 1,
      title: "인사이드 아웃 2",
      rate: 8.3,
      thumbnail_path: "/poster.jpg",
      hero_path: "/hero.jpg",
      userRating: null,
    };

    expect(applyMovieUserRating(movie, 8)).toEqual({
      ...movie,
      userRating: 8,
    });

    expect(
      applyMovieUserRatings([movie, { ...movie, id: 2, title: "엘리멘탈" }], {
        1: 8,
        2: null,
      }),
    ).toEqual([
      {
        ...movie,
        userRating: 8,
      },
      {
        ...movie,
        id: 2,
        title: "엘리멘탈",
        userRating: null,
      },
    ]);
  });

  it("localStorage 저장소 구현이 별점을 저장하고 다시 읽어온다", async () => {
    const repository = createMovieRatingRepository(createMemoryStorage());

    expect(await repository.get(1)).toBeNull();

    await repository.set(1, 8);
    await repository.set(2, 10);

    expect(await repository.get(1)).toBe(8);
  });

  it("저장된 데이터가 깨져 있어도 안전하게 빈 값으로 처리한다", async () => {
    const repository = createMovieRatingRepository(
      createMemoryStorage({
        "movie-user-ratings": "{not-json}",
      }),
    );

    expect(await repository.get(1)).toBeNull();
  });
});
