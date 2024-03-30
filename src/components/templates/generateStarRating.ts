import { HTMLTemplate } from "../../types/common";
import IMAGES from "../../images";

const { starFilled, starEmpty } = IMAGES;

const SCORE = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
} as const;

type ScoreKey = keyof typeof SCORE;

const createScoreDescription = (count: number): string => {
  if (count === 0) return "";

  const scoreKey: ScoreKey = (count * 2) as ScoreKey;
  const scoreText = SCORE[scoreKey];

  return `<div>${scoreKey} ${scoreText}</div>`;
};

export const generateStarRating = (count: number = 0): HTMLTemplate => {
  const starsHtml = Array.from({ length: 5 }, (_, i) =>
    i < count
      ? `<img src="${starFilled}" alt="filled star" data-index="${i + 1}"/>`
      : `<img src="${starEmpty}" alt="empty star" data-index="${i + 1}"/>`
  ).join("");

  const scoreDescription = createScoreDescription(count);

  return `
    <div id="star-rating-container" class="star-rating-container">
        <div>내 별점</div>
        <div>${starsHtml}</div>
        ${scoreDescription}
    </div>
  `;
};
