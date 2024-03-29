import emptyStar from "../../templates/star_empty.png";
import filledStar from "../../templates/star_filled.png";
import { rateDataStateStore } from "../model";
import { Rate } from "../type/rate";
import { createElementWithAttribute } from "../utils";

const rateState = (rate: number) => {
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

const StarButton = (index: number) =>
  createElementWithAttribute("button", {
    id: `${index}`,
    class: "star-button",
  });

const StarImg = (index: number, rate: number) =>
  createElementWithAttribute("img", {
    src: index * 2 <= rate ? filledStar : emptyStar,
    alt: "star",
    class: "rate-star",
  });

const Stars = (rate: number) => {
  const $stars = createElementWithAttribute("div", { class: "stars" });
  for (let i = 1; i <= 5; i += 1) {
    const $starButton = StarButton(i);
    const $star = StarImg(i, rate);
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

const handleRemovePreStar = (
  target: HTMLElement,
  $rateContainer: HTMLElement,
) => {
  const $prevStars = target.closest(".stars");
  $prevStars?.remove();
  const $prevStarsState = $rateContainer.querySelector(".rate-state-container");
  $prevStarsState?.remove();
};

const handleClickStar = (
  e: Event,
  movieId: number,
  $rateContainer: HTMLElement,
) => {
  const target = e.target as HTMLElement;
  handleRemovePreStar(target, $rateContainer);

  const clickedStarNumber = Number(target.closest("button")?.id) * 2;
  $rateContainer.appendChild(Stars(clickedStarNumber));
  $rateContainer.appendChild(rateStateContainer(clickedStarNumber));
  setStarRate(movieId, clickedStarNumber);
};

const StarsContainer = ({ movieId, rate }: Rate) => {
  const $rateContainer = createElementWithAttribute("div", {
    class: "stars-container",
  });

  $rateContainer.appendChild(Stars(rate));
  $rateContainer.appendChild(rateStateContainer(rate));

  $rateContainer.addEventListener("click", (e) => {
    handleClickStar(e, movieId, $rateContainer);
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
