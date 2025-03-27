import { createElementWithAttributes } from "../utils/createElementWithAttributes";

type Score = keyof typeof SCORE_TEXT;

const SCORE_TEXT = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export const createRatingBox = (movieId: number, title: string) => {
  const $scoreText = createElementWithAttributes({
    tag: "span",
    className: "score-text",
    textContent: "0점",
  });

  const $score = createElementWithAttributes({
    tag: "span",
    className: "score",
    textContent: "(0/10)",
  });

  const $stars = Object.keys(SCORE_TEXT).map((score) => {
    const starScore = Number(score) as Score;
    const $star = createElementWithAttributes({
      tag: "img",
      className: "star",
      attributes: { src: "./images/star_empty.png", alt: `${starScore}` },
    }) as HTMLImageElement;

    $star.addEventListener("click", () => updateStars(starScore));

    return $star;
  });

  const updateStars = (score: Score) => {
    $scoreText.textContent = SCORE_TEXT[score] || "0점";
    $score.textContent = `(${score}/10)`;

    $stars.forEach((star, index) => {
      const starScore = (index + 1) * 2;
      star.src =
        starScore <= score
          ? "./images/star_filled.png"
          : "./images/star_empty.png";
    });
  };

  return createElementWithAttributes({
    tag: "div",
    className: "star-wrapper",
    children: [...$stars, $scoreText, $score],
  });
};
