import { createElement } from "../../utils/createElement.ts";
import { $ } from "../../utils/dom.ts";

type RateProps = {
  size?: number;
  rate: number;
};

const Rate = ({ size = 16, rate }: RateProps) => {
  const rateElement = createElement(/*html*/ `
    <div class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span class="rate-value">${rate}</span>
    </div>
    `);
    
    $(".star", rateElement).style.width = `${size}px`;
    $(".rate-value", rateElement).style.fontSize = `${size}px`;

  return rateElement;
};

export default Rate;
