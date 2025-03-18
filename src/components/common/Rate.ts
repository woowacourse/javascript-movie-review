import { createElement } from "../../utils/createElement.ts";

type RateProps = {
  rate: number;
};

const Rate = ({ rate }: RateProps) => {
  const rateElement = createElement(/*html*/ `
    <div class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span class="rate-value">${rate}</span>
    </div>
    `);

  return rateElement;
};

export default Rate;
