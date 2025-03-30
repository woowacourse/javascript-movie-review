import { getRateText } from "../../utils/getRateText";
import { localStorageHandler } from "../../../shared/stores/localStorage";

function updateMyRateStar(newRate: number) {
  const stars = document.querySelectorAll(
    ".star-icon"
  ) as NodeListOf<HTMLImageElement>;

  if (!stars) return;

  stars.forEach((star, index) => {
    const rate = (index + 1) * 2;
    star.src = `/images/star_${rate <= newRate ? "filled" : "empty"}.png`;
  });
}

const updateMyRateText = (rate: number) => {
  const rateText = document.querySelector(".rate-text");

  if (!rateText) return;

  rateText.textContent = getRateText(rate);
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
