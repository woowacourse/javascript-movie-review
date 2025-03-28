import { createElement } from "../../utils/createElement.ts";
import { $ } from "../../utils/dom.ts";
import Rate from "../common/Rate.ts";
import loadDetailMovie from "../utils/loadDetailMovie.ts";

type Props = {
  id: number;
  src: string;
  rate: number;
  title: string;
};

const MovieItem = ({ id, src, rate, title }: Props) => {
  const movieItem = createElement(
    /*html*/ `
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
  `,
    { click: () => loadDetailMovie(id) }
  );

  $(".item-desc", movieItem).prepend(Rate({ rate: rate }));

  return movieItem;
};

export default MovieItem;
