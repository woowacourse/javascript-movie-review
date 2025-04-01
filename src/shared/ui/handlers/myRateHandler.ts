import { getRateScore, getRateText } from "../../utils/getRateText";
import { localStorageHandler } from "../../../shared/stores/localStorage";
import URL from "../../constants/url";

const RATE_SCORE_STEP = 2;

function updateMyRateStar(newRate: number) {
  const stars = document.querySelectorAll(
    ".star-icon"
  ) as NodeListOf<HTMLImageElement>;

  if (!stars) return;

  stars.forEach((star, index) => {
    const rate = (index + 1) * RATE_SCORE_STEP;
    star.src = `${URL.BASE_STAR_IMAGE}${
      rate <= newRate ? "filled" : "empty"
    }.png`;
  });
}

const updateMyRateText = (rate: number) => {
  const rateTextDescription = document.querySelector(".rate-text-description");
  const rateTextScore = document.querySelector(".rate-score");

  if (!rateTextDescription || !rateTextScore) return;

  rateTextDescription.textContent = getRateText(rate);
  rateTextScore.textContent = getRateScore(rate);
};

export const handleRateChange = (event: Event, id: string) => {
  const target = event.target as HTMLInputElement;

  if (target.type === "radio") {
    const userRate = Number(target.value);

    updateMyRateStar(userRate);
    updateMyRateText(userRate);
    localStorageHandler.set(id, userRate.toString());
  }
};
