import { Movie } from "../../types/domain.ts";

type MovieItemParams = Pick<
  Movie,
  "id" | "title" | "voteAverage" | "posterPath"
>;

class MovieItem {
  #id: number;
  #title: string;
  #voteAverage: number;
  #posterPath: string;

  constructor({ id, title, voteAverage, posterPath }: MovieItemParams) {
    this.#id = id;
    this.#title = title;
    this.#voteAverage = voteAverage;
    this.#posterPath = posterPath;
  }

  create() {
    const content = /*html*/ `
    <li class="item" data-id="${this.#id}">
        <img
        class="thumbnail"
        src=${this.#posterPath}
        onerror="this.src='./images/null_image.png'"
        alt=${this.#title}
        />
        <div class="item-desc">
        <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span>${
              this.#voteAverage
            }</span>
        </p>
        <strong>${this.#title}</strong>
        </div>
    </li>
    `;

    return content;
  }
}

export default MovieItem;
