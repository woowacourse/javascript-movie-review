import { RATES } from "../../constants/rates.ts";
import { renderRateButtons } from "./RateButton.ts";

const MY_RATE_ID = "my-rate";
const RATE_BUTTON_CONTAINER_ID = "rate-button-container";

let myRateElement: HTMLElement | null = null;

const createMyRateTemplate = (userRate: number = 0) => {
  const rateConfig = RATES.find(({ rate }) => rate === userRate);

  return `
  <div class="my-rate" id="${MY_RATE_ID}">
    <h3>내 별점</h3>
    <div>
      <div id="${RATE_BUTTON_CONTAINER_ID}"></div>
      <span class="comment">${rateConfig?.comment}</span>
      <span class="score">(${rateConfig?.score}/10)</span>
    </div>
`;
};

export const renderMyRate = (parent: HTMLElement, rate: number) => {
  if (myRateElement) {
    myRateElement.remove();
  }

  parent.insertAdjacentHTML("beforeend", createMyRateTemplate(rate));
  myRateElement = document.getElementById(MY_RATE_ID);

  const rateButtonContainer = document.getElementById(RATE_BUTTON_CONTAINER_ID);
  if (rateButtonContainer) {
    renderRateButtons(rateButtonContainer, "filled", rate);
    renderRateButtons(rateButtonContainer, "empty", 5 - rate);
  }

  myRateElement?.addEventListener("click", (e) => {
    console.log(e.target);
  });
};

export const removeMyRate = () => {
  myRateElement?.remove();
  myRateElement = null;
};
