/* eslint-disable max-lines-per-function */
import emptyStar from "../../templates/star_empty.png";
import filledStar from "../../templates/star_filled.png";
import rateDataStateStore from "../model/RateDataStateStore";
import { Rate } from "../type/rate";
import { createElementWithAttribute } from "../utils";

const rateState = (rate: number) => {
  console.log("rateState", rate);
  if (rate > 8) return "명작이에요";
  if (rate > 6) return "재미있어요";
  if (rate > 4) return "보통이에요";
  if (rate > 2) return "별로예요";
  return "최악이예요";
};

const setStarRate = (movieId: number, rate: number) => {
  const newRate: Rate = {
    movieId,
    rate,
  };
  rateDataStateStore.setNewRate(newRate);
};

const Text = (text: string, className: string) => {
  const $text = createElementWithAttribute("p", { class: className });
  $text.textContent = text;

  return $text;
};

const Stars = (rate: number) => {
  const $stars = createElementWithAttribute("div", { class: "stars" });
  for (let i = 1; i <= 5; i += 1) {
    const $starButton = createElementWithAttribute("button", {
      id: `${i}`,
      class: "star-button",
    });
    const $star = createElementWithAttribute("img", {
      src: i * 2 <= rate ? filledStar : emptyStar,
      alt: "star",
      class: "rate-star",
    });
    $starButton.appendChild($star);
    $stars.appendChild($starButton);
  }
  return $stars;
};

const rateStateContainer = (rate: number) => {
  const $rateStateContainer = createElementWithAttribute("div", {
    class: "rate-state-container",
  });

  if (rate === 0) {
    $rateStateContainer.appendChild(Text("별점을 매겨주세요.", "rate-state"));
    return $rateStateContainer;
  }

  $rateStateContainer.appendChild(Text(String(rate), "rate-number"));
  $rateStateContainer.appendChild(Text(rateState(rate), "rate-state"));

  return $rateStateContainer;
};

const StarsContainer = ({ movieId, rate }: Rate) => {
  const $rateContainer = createElementWithAttribute("div", {
    class: "stars-container",
  });

  const $stars = Stars(rate);
  $rateContainer.appendChild($stars);
  $rateContainer.appendChild(rateStateContainer(rate));

  $rateContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const closestButton = target.closest("button");
    const $prevStars = target.closest(".stars");
    const $prevStarsState = $rateContainer.querySelector(
      ".rate-state-container",
    );

    if (closestButton) {
      const clickedStarNumber = Number(closestButton.id) * 2;
      $prevStars?.remove();
      $rateContainer.appendChild(Stars(clickedStarNumber));
      $prevStarsState?.remove();
      $rateContainer.appendChild(rateStateContainer(clickedStarNumber));
      setStarRate(movieId, clickedStarNumber);
    }
  });

  return $rateContainer;
};

const StarRate = (rate: Rate, className: string) => {
  const $rateContainer = createElementWithAttribute("div", {
    class: className,
  });

  $rateContainer.appendChild(Text("내 별점 ", "rate-title"));
  $rateContainer.appendChild(StarsContainer(rate));

  return $rateContainer;
};
export default StarRate;
