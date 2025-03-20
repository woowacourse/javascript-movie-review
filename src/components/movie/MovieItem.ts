import { createElement } from "../../utils/createElement.ts";
import { $ } from "../../utils/dom.ts";
import Rate from "../common/Rate.ts";

type MovieItem = {
  src: string;
  rate: number;
  title: string;
};

const MovieItem = ({ src, rate, title }: MovieItem) => {
  const movieItem = createElement(/*html*/ `
    <li>
      <div class="item">
        <img
          class="thumbnail"
          src=${src}
          alt=${title}
        />
        <div class="item-desc">
          <strong>${title}</strong>
        </div>
      </div>
    </li>
  `);

  $(".item-desc", movieItem).prepend(Rate({ rate: rate }));

  return movieItem;
};

export default MovieItem;
