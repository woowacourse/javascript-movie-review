import { Movie } from "../../types/domain.ts";

type MovieItemParams = Pick<Movie, "title" | "voteAverage" | "posterPath">;

class MovieItem {
  #title: string;
  #voteAverage: number;
  #posterPath: string;

  constructor({ title, voteAverage, posterPath }: MovieItemParams) {
    this.#title = title;
    this.#voteAverage = voteAverage;
    this.#posterPath = posterPath;
  }

  create() {
    const content = /*html*/ `
    <li class="item">
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
