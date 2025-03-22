import { IMG_PREFIX } from "../constants/movie";

interface MovieItemProps {
  title: string;
  vote_average: number;
  poster_path: string;
}

class MovieItem {
  #title: string;
  #rate: number;
  #posterPath: string;

  constructor({ title, vote_average, poster_path }: MovieItemProps) {
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
    </div>
    `;

    movieItemElement.insertAdjacentHTML("beforeend", content);

    return movieItemElement;
  }
}

export default MovieItem;
