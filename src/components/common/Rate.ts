import { createElement } from "../../utils/createElement.ts";

type Props = {
  rate: number;
  className?: string[];
  filled?: boolean;
};

const Rate = ({ rate, className, filled = false }: Props) => {
  return createElement(/*html*/ `
    <p class="rate">
      <img src="./images/star_${
        filled ? "filled" : "empty"
      }.png" class="star" />
      <span class=${className?.join(" ")}>${rate.toFixed(1)}</span>
    </p>
    `);
};

export default Rate;
