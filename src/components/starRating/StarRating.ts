import { getMovieRating } from "../../utils/localStorage";
import { $ } from "../../utils/domHelper";
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

  // 이벤트 위임을 위한 useEvents 호출
  const [addEvent] = useEvents(`.${containerClass}`);

  // 별점 클릭 이벤트
  addEvent("click", ".star", (e) => {
    const target = e.target as HTMLElement;
    const index = Math.ceil(parseInt(target.dataset.value || "0") / 2) - 1;

    const container = target.closest(`.${containerClass}`) as HTMLElement;
    if (!container) return;

    const { handleStarClick } = useStarRating(movieId, container);
    handleStarClick(index);
  });

  // 별점 마우스오버 이벤트
  addEvent("mouseover", ".star", (e) => {
    const target = e.target as HTMLElement;
    const index = Math.ceil(parseInt(target.dataset.value || "0") / 2) - 1;

    const container = target.closest(`.${containerClass}`) as HTMLElement;
    if (!container) return;

    const { handleStarHover } = useStarRating(movieId, container);
    handleStarHover(index);
  });

  // 별점 마우스아웃 이벤트
  addEvent("mouseout", ".star", (e) => {
    const container = (e.target as HTMLElement).closest(
      `.${containerClass}`
    ) as HTMLElement;
    if (!container) return;

    const { handleStarLeave } = useStarRating(movieId, container);
    handleStarLeave();
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
