import { describe, expect, it } from "vitest";
import { isValidScore } from "../../src/rating/validateScore";

describe("isValidScore", () => {
  it.each([0, 2, 4, 6, 8, 10])("유효한 점수 %d → true", (score) => {
    expect(isValidScore(score)).toBe(true);
  });

  it.each([1, 3, 5, 7, 9, 11, -2, 0.5, NaN, Infinity])(
    "유효하지 않은 점수 %s → false",
    (score) => {
      expect(isValidScore(score)).toBe(false);
    },
  );
});
