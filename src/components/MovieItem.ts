import { IMovie } from "../../types/domain";
import { IMAGE } from "../constants/movie";

type IMovieItem = Pick<IMovie, "title" | "vote_average" | "poster_path">;

class MovieItem {
  #title: string;
  #rate: number;
  #posterPath: string;

  constructor({ title, vote_average, poster_path }: IMovieItem) {
    this.#title = title;
    this.#rate = vote_average;
    this.#posterPath = poster_path;
  }

  create() {
    const content = /*html*/ `
    <li class="item">
        <img
        class="thumbnail"
        src=${IMAGE.prefix + this.#posterPath}
        onerror="this.src='./images/null_image.png'"
        alt=${this.#title}
        />
        <div class="item-desc">
        <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span>${
              this.#rate
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
