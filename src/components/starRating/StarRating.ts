import { getMovieRating } from "../../utils/localStorage";
import useStarRating from "../../hooks/useStarRating";
import { getStarSrc, ratingTexts } from "../../utils/rating";
import Stars from "../stars/Stars";
import { useEvents } from "../../utils/Core";

interface StarRatingProps {
  movieId: number;
  containerClass?: string;
}

const StarRating = (props: StarRatingProps) => {
  const { movieId, containerClass = "rating-container" } = props;
  const currentRating = getMovieRating(movieId) || 0;

  const [addEvent] = useEvents(`.${containerClass}`);

  const getStar = (e: Event) => {
    const target = e.target as HTMLElement;
    const index = Math.ceil(parseInt(target.dataset.value || "0") / 2) - 1;
    const container = target.closest(`.${containerClass}`) as HTMLElement;

    if (!container) return null;

    const handlers = useStarRating(movieId, container);
    return { index, container, handlers };
  };

  addEvent("click", ".star", (e) => {
    const context = getStar(e);
    if (!context) return;

    context.handlers.handleStarClick(context.index);
  });

  addEvent("mouseover", ".star", (e) => {
    const context = getStar(e);
    if (!context) return;

    context.handlers.handleStarHover(context.index);
  });

  addEvent("mouseout", ".star", (e) => {
    const context = getStar(e);
    if (!context) return;

    context.handlers.handleStarLeave();
  });

  return `
    <div class="${containerClass}" data-movie-id="${movieId}">
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
