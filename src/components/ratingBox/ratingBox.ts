import { createElementWithAttributes } from "../utils/createElementWithAttributes";

type Score = keyof typeof SCORE_TEXT;

const SCORE_TEXT = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export const createRatingBox = (movieId: number) => {
  const savedRatings = JSON.parse(localStorage.getItem("rateValue") || "{}");
  const initialScore = savedRatings[movieId] || 0;

  const $scoreText = createElementWithAttributes({
    tag: "span",
    className: "score-text",
    textContent: initialScore ? SCORE_TEXT[initialScore as Score] : "0점",
  });

  const $score = createElementWithAttributes({
    tag: "span",
    className: "score",
    textContent: `(${initialScore}/10)`,
  });

  const $stars = Object.keys(SCORE_TEXT).map((score) => {
    const starScore = Number(score) as Score;
    const $star = createElementWithAttributes({
      tag: "img",
      className: "star",
      attributes: { src: "./images/star_empty.png", alt: `${starScore}` },
    }) as HTMLImageElement;

    $star.addEventListener("click", () => {
      updateStars(starScore);
      saveRating(movieId, starScore);
    });

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

  if (initialScore) updateStars(initialScore as Score);

  const saveRating = (movieId: number, score: Score) => {
    const updatedRatings = {
      ...JSON.parse(localStorage.getItem("rateValue") || "{}"),
      [movieId]: score,
    };
    localStorage.setItem("rateValue", JSON.stringify(updatedRatings));
  };

  const starsWrapper = createElementWithAttributes({
    tag: "div",
    className: "stars-wrapper",
    children: [...$stars],
  });

  const myStarText = createElementWithAttributes({
    tag: "div",
    className: "my-star-text",
    children: [$scoreText, $score],
  });

  return createElementWithAttributes({
    tag: "div",
    className: "my-star-box",
    children: [starsWrapper, myStarText],
  });
};
