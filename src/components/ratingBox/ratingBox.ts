import { createElementWithAttributes } from "../utils/createElementWithAttributes";

const SCORE_TEXT: Record<number, string> = {
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
    textContent: initialScore in SCORE_TEXT ? SCORE_TEXT[initialScore] : "0점",
  });

  const $score = createElementWithAttributes({
    tag: "span",
    className: "score",
    textContent: `(${initialScore}/10)`,
  });

  const $stars = Object.keys(SCORE_TEXT).map((score) => {
    const starScore = Number(score);
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

  const updateStars = (score: number) => {
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

  if (initialScore in SCORE_TEXT) updateStars(initialScore);

  const saveRating = (movieId: number, score: number) => {
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
