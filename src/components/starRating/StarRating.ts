import { getMovieRating } from "../../utils/localStorage";
import { $, $$ } from "../../utils/domHelper";
import useStarRating from "../../hooks/useStarRating";
import { getStarSrc, ratingTexts } from "../../utils/rating";
import Stars from "../stars/Stars";

interface StarRatingProps {
  movieId: number;
  containerClass?: string;
}

const StarRating = (props: StarRatingProps) => {
  const { movieId, containerClass = "rating-container" } = props;
  const currentRating = getMovieRating(movieId) || 0;

  setTimeout(() => {
    const container = $(`.${containerClass}`);
    if (!container) return;

    const { updateRating, handleStarClick, handleStarHover, handleStarLeave } =
      useStarRating(movieId, container);

    updateRating(currentRating);

    const stars = $$(".star", container);
    stars.forEach((star, index) => {
      star.addEventListener("click", () => handleStarClick(index));
      star.addEventListener("mouseover", () => handleStarHover(index));
      star.addEventListener("mouseout", handleStarLeave);
    });
  }, 0);

  return `
    <div class="${containerClass}">
      <div class="stars">
        ${Object.entries(ratingTexts)
          .map(([key, _]) =>
            Stars({
              attribute: {
                src: getStarSrc(currentRating, parseInt(key)),
                class: "star",
                "data-value": key,
                alt: `${key}점`,
              },
            })
          )
          .join("")}
      </div>
      <span class="rating-text ${currentRating ? "visible" : ""}">
        ${
          currentRating in ratingTexts
            ? ratingTexts[currentRating as keyof typeof ratingTexts]
            : ""
        }
      </span>
    </div>
  `;
};

export default StarRating;
