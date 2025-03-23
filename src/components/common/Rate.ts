import { createElement } from "../../utils/createElement.ts";

type Props = {
  rate: number;
  className?: string[];
};

const Rate = ({ rate, className }: Props) => {
  return createElement(/*html*/ `
    <div class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span class=${className?.join(" ")}>${rate.toFixed(1)}</span>
    </div>
    `);
};

export default Rate;
