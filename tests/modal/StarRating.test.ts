import { describe, expect, it, vi, beforeEach } from "vitest";

import { StarRating } from "../../src/modal/StarRating";

const createElements = () => {
  const container = document.createElement("div");
  const label = document.createElement("p");
  return { container, label };
};

describe("StarRating", () => {
  describe("render — 점수별 별 채움 상태", () => {
    it("score 0이면 별이 모두 비어있다", () => {
      const { container, label } = createElements();
      const starRating = new StarRating(container, label, vi.fn());

      const stars = container.querySelectorAll(".star-rating-star");
      expect(stars).toHaveLength(5);
      stars.forEach((star) => {
        expect((star as HTMLImageElement).src).toContain("star_empty.png");
      });
    });

    it("score 6이면 별 3개가 채워진다", () => {
      const { container, label } = createElements();
      const starRating = new StarRating(container, label, vi.fn());
      starRating.setScore(6);

      const stars =
        container.querySelectorAll<HTMLImageElement>(".star-rating-star");
      expect(stars[0].src).toContain("star_filled.png"); // 2점
      expect(stars[1].src).toContain("star_filled.png"); // 4점
      expect(stars[2].src).toContain("star_filled.png"); // 6점
      expect(stars[3].src).toContain("star_empty.png"); // 8점
      expect(stars[4].src).toContain("star_empty.png"); // 10점
    });

    it("score 10이면 별 5개가 모두 채워진다", () => {
      const { container, label } = createElements();
      const starRating = new StarRating(container, label, vi.fn());
      starRating.setScore(10);

      const stars =
        container.querySelectorAll<HTMLImageElement>(".star-rating-star");
      stars.forEach((star) => {
        expect(star.src).toContain("star_filled.png");
      });
    });
  });

  describe("render — 점수별 라벨", () => {
    const labelCases = [
      { score: 0, label: "" },
      { score: 2, label: "최악이예요 (2/10)" },
      { score: 4, label: "별로예요 (4/10)" },
      { score: 6, label: "보통이에요 (6/10)" },
      { score: 8, label: "재미있어요 (8/10)" },
      { score: 10, label: "명작이에요 (10/10)" },
    ];

    labelCases.forEach(({ score, label: expectedLabel }) => {
      it(`score ${score}이면 라벨이 "${expectedLabel}"이다`, () => {
        const { container, label } = createElements();
        const starRating = new StarRating(container, label, vi.fn());
        starRating.setScore(score);

        expect(label.textContent).toBe(expectedLabel);
      });
    });
  });

  describe("클릭 이벤트", () => {
    it("별 클릭 시 onRate 콜백이 해당 점수로 호출된다", () => {
      const onRate = vi.fn();
      const { container, label } = createElements();
      new StarRating(container, label, onRate);

      // data-score="8"인 별 클릭
      const star =
        container.querySelector<HTMLImageElement>('[data-score="8"]')!;
      star.click();

      expect(onRate).toHaveBeenCalledWith(8);
      expect(onRate).toHaveBeenCalledTimes(1);
    });

    it("같은 별을 다시 클릭해도 onRate가 호출된다", () => {
      const onRate = vi.fn();
      const { container, label } = createElements();
      new StarRating(container, label, onRate);

      container.querySelector<HTMLImageElement>('[data-score="6"]')!.click();
      container.querySelector<HTMLImageElement>('[data-score="6"]')!.click();

      expect(onRate).toHaveBeenCalledTimes(2);
    });
  });
});
