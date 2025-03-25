import { createElement } from "../../utils/createElement.ts";

type RateProps = {
  rate: number;
  className?: string[];
  isFilled?: boolean;
};

const Rate = ({ rate, className, isFilled = false }: RateProps) => {
  const starImgSrc = isFilled
    ? "./images/star_filled.png"
    : "./images/star_empty.png";

  const rateElement = createElement(/*html*/ `
    <div class="rate">
        <img src=${starImgSrc} class="star" />
        <span class=${className?.join(" ")}>${rate.toFixed(1)}</span>
    </div>
    `);

  return rateElement;
};

export default Rate;
