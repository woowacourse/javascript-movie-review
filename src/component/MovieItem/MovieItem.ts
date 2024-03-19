import { createElement } from "./../../utility/dom";

import starFilledImg from "../../image/star_filled.png";

class MovieItem {
  #moveItemInfo;

  constructor(movieItemInfo: IMovieItemData) {
    this.#moveItemInfo = movieItemInfo;
  }

  createMovieItem() {
    const li = createElement("li");

    const article = createElement("article", {
      class: "item-card",
    });

    const thumbnail = createElement("img", {
      class: "item-thumbnail",
      src: `https://image.tmdb.org/t/p/w220_and_h330_face${
        this.#moveItemInfo.poster_path
      }`,
      loading: "lazy",
      alt: this.#moveItemInfo.title,
    });

    const title = createElement("p", {
      class: "item-title",
    });
    title.textContent = this.#moveItemInfo.title;

    const scoreWrapper = createElement("div", {
      class: "item-score-wrapper",
    });

    const score = createElement("span", {
      class: "item-score",
    });
    score.textContent = Number(this.#moveItemInfo.vote_average).toFixed(1);

    const starImg = createElement("img", { src: `${starFilledImg}` });

    scoreWrapper.appendChild(score);
    scoreWrapper.appendChild(starImg);
    article.appendChild(thumbnail);
    article.appendChild(title);
    article.appendChild(scoreWrapper);
    li.appendChild(article);
    return li;
  }
}

export default MovieItem;
