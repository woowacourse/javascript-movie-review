import { MovieDetails } from "../../types/domain";
import { VOTE } from "../constants/movie.ts";

export type MovieHeader = Pick<
  MovieDetails,
  "genres" | "releaseYear" | "title" | "voteAverage"
>;

class MovieDetailsHeader {
  #title;
  #releaseYear;
  #genres;
  #voteAverage;

  constructor({ title, releaseYear, genres, voteAverage }: MovieHeader) {
    this.#title = title;
    this.#releaseYear = releaseYear;
    this.#genres = genres;
    this.#voteAverage = voteAverage;
  }

  create() {
    const movieTitle = this.#createTitle();
    const category = this.#createCategory();
    const rate = this.#createRate();

    return {
      movieTitle,
      category,
      rate,
    };
  }

  #createTitle() {
    const title = document.createElement("h2");
    title.textContent = this.#title;

    return title;
  }

  #createCategory() {
    const category = document.createElement("p");
    category.classList.add("category");
    category.textContent = this.#releaseYear + " · " + this.#genres.join(", ");

    return category;
  }

  #createRate() {
    const rate = document.createElement("p");
    rate.classList.add("rate");
    rate.textContent = "평균";

    const rateContents = /*html*/ `
        <img src="${VOTE.filledStarImage}" class="star" />
        <span>${this.#voteAverage}</span>
      `;

    rate.insertAdjacentHTML("beforeend", rateContents);
    return rate;
  }
}

export default MovieDetailsHeader;
