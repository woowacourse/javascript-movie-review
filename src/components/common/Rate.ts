import { createElement } from "../../utils/createElement.ts";

type RateProps = {
  rate: number;
  className?: string[];
};

const Rate = ({ rate, className }: RateProps) => {
  const rateElement = createElement(/*html*/ `
    <div class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span class=${className?.join(" ")}>${rate.toFixed(1)}</span>
    </div>
    `);

  return rateElement;
};

export default Rate;
