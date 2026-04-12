import { expect, test, describe } from "vitest";
import { getRatingToString } from "../src/utils/rating.ts";

describe("유틸 테스트", () => {
  describe("getRatingToString", () => {
    test.each([
      [10, "명작이에요"],
      [8, "재미있어요"],
      [6, "보통이에요"],
      [4, "별로에요"],
      [2, "최악이에요"],
    ])("점수가 %i이면 '%s'를 반환한다", (rating, expected) => {
      expect(getRatingToString(rating)).toBe(expected);
    });

    test("정의되지 않은 점수는 빈 문자열을 반환한다", () => {
      expect(getRatingToString(0)).toBe("");
      expect(getRatingToString(5)).toBe("");
      expect(getRatingToString(11)).toBe("");
    });
  });
});
