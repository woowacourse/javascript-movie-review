import { IMG_PREFIX } from "../constants/movie";

interface IMovieItem {
  title: string;
  vote_average: number;
  poster_path: string;
}

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
    const movieItemElement = document.createElement("li");
    const content = /*html*/ `
    <div class="item">
        <img
        class="thumbnail"
        src=${IMG_PREFIX + this.#posterPath}
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
    </div>
    `;

    movieItemElement.insertAdjacentHTML("beforeend", content);

    return movieItemElement;
  }
}

export default MovieItem;
