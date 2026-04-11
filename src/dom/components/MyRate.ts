import { RATES } from "../../constants/rates.ts";
import { renderRateButtons } from "./RateButton.ts";

const MY_RATE_ID = "my-rate";
const RATE_BUTTON_CONTAINER_ID = "rate-button-container";

let myRateElement: HTMLElement | null = null;

// TODO: (typeof RATES)[number]["rate"]로 타입을 엄격히 검사할 필요가 있을까?
const createMyRateTemplate = (userRate: number) => {
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

export const renderMyRate = (parent: HTMLElement, rate: number = 0) => {
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

  // TODO: 이벤트 핸들러, 분리해야 하나?
  myRateElement?.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement) {
      const rateButtonContainer = document.getElementById(
        RATE_BUTTON_CONTAINER_ID,
      ) as HTMLElement;
      const clickedButton = e.target.closest("button");

      const buttonIndex = Array.from(rateButtonContainer.children).findIndex(
        (element) => element === clickedButton,
      );
      renderMyRate(parent, buttonIndex + 1);
    }
  });
};

export const removeMyRate = () => {
  myRateElement?.remove();
  myRateElement = null;
};
