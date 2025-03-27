import STORAGE_KEY from "../../constants/storageKey";
import { getStorage, setStorage } from "../../utils/storage";
import $StarIcon, { fillStarIcon, unFillStarIcon } from "../StarIcon/StarIcon";

type RateValue = keyof typeof rateMessage;
const rateMessage = {
  0: "-",
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

const getRateValue = () => {
  return getStorage(STORAGE_KEY.rateValue) ?? {};
};

const getInitialRateValue = (id: number): RateValue => {
  const rateValueObject = getRateValue();
  const rateValue = rateValueObject[id] ?? 0;
  return rateValue;
};

const setRateValue = (id: number, rateValue: RateValue) => {
  const rateValueObject = getRateValue();
  const newRateValue = { ...rateValueObject, [id]: rateValue };
  setStorage(STORAGE_KEY.rateValue, newRateValue);
};

const getRateValueDataset = (element: HTMLElement): RateValue => {
  return Number(element.dataset.rateValue) as RateValue;
};

const setRateMessage = (rateValue: RateValue) => {
  const $rateMessage = document.querySelector(".rate-message") as HTMLElement;
  $rateMessage.textContent = rateMessage[rateValue];

  const $rateValueMessage = document.querySelector(
    ".rate-value-message"
  ) as HTMLElement;
  $rateValueMessage.textContent = `(${rateValue}/10)`;
};

const controlRateStarIconFill = (targetRateValue: RateValue) => {
  const $rateButtons = document.querySelectorAll(
    ".rate-button"
  ) as NodeListOf<HTMLButtonElement>;

  $rateButtons.forEach(($rateButton) => {
    const rateValue = getRateValueDataset($rateButton);
    const $starIcon = $rateButton.querySelector(".star-icon") as SVGSVGElement;

    if (rateValue <= targetRateValue) {
      fillStarIcon($starIcon);
      return;
    }

    unFillStarIcon($starIcon);
  });
};

const handleRateButtonClick = (e: MouseEvent, id: number) => {
  const $targetRateButton = e.currentTarget as HTMLButtonElement;
  const targetRateValue = getRateValueDataset(
    $targetRateButton as HTMLButtonElement
  );
  controlRateStarIconFill(targetRateValue);
  setRateMessage(targetRateValue);
  setRateValue(id, targetRateValue);
};

const $RateBox = (id: number) => {
  const initialRateValue = getInitialRateValue(id);

  const [zeroRate, ...rateValue] = Object.keys(rateMessage);
  const $rateButtonList = rateValue.map((rate) => {
    const $rateButton = createElement("button", {
      type: "button",
      className: "rate-button",
      dataset: {
        "rate-value": rate,
      },
    });

    $rateButton.appendChild(
      $StarIcon({
        className: "star-icon",
        fill: Number(rate) <= initialRateValue ? "#FFC700" : "none",
      })
    );
    $rateButton.addEventListener("click", (e: MouseEvent) =>
      handleRateButtonClick(e, id)
    );

    return $rateButton;
  });
  const $rateButtonBox = createElement("div", {
    className: "rate-button-box",
  });
  $rateButtonBox.append(...$rateButtonList);

  const $rateMessageBox = createElement("div", {
    className: "rate-message-box",
  });
  const $rateMessage = createElement("p", {
    className: "rate-message",
    textContent: rateMessage[initialRateValue],
  });
  const $rateValueMessage = createElement("span", {
    className: "rate-value-message",
    textContent: initialRateValue ? `${initialRateValue}/10` : "(0/10)",
  });
  $rateMessageBox.append($rateMessage, $rateValueMessage);

  const $rateContentBox = createElement("div", {
    className: "rating-content-box",
  });
  $rateContentBox.append($rateButtonBox, $rateMessageBox);

  const $rateTitle = createElement("h3", {
    className: "rate-title",
    textContent: "내 별점",
  });
  const $rateBox = createElement("div", {
    className: "rate-box",
  });
  $rateBox.append($rateTitle, $rateContentBox);
  return $rateBox;
};

export default $RateBox;
