import { MovieDetails } from "../../../types/domain.ts";
import MovieDetailsHeader from "./MovieDetailsHeader.ts";
import MoviePoster from "./MoviePoster.ts";
import UserRating from "./UserRating.ts";

class MovieItemDetails {
  #id;
  #rate;
  #details;
  #element;

  constructor({ id, rate, ...details }: MovieDetails) {
    this.#id = id;
    this.#rate = rate;
    this.#details = details;
    this.#element = document.createElement("div");
    this.#element.classList.add("modal-container");
  }

  create() {
    this.#element.insertAdjacentElement("beforeend", this.#createPoster());
    this.#element.insertAdjacentElement("beforeend", this.#createDescription());

    return this.#element;
  }

  #createPoster() {
    const { posterPath, title } = this.#details;
    const poster = new MoviePoster({ posterPath, title });
    return poster.create();
  }

  #createDescription() {
    const description = document.createElement("div");
    description.classList.add("modal-description");

    this.#createHeader(description);
    this.#createDivider(description);
    this.#createVotingRate(description);
    this.#createDivider(description);
    this.#createOverview(description);

    return description;
  }

  #createHeader(description: HTMLDivElement) {
    const { title, releaseYear, genres, voteAverage } = this.#details;
    const { movieTitle, category, rate } = new MovieDetailsHeader({
      title,
      releaseYear,
      genres,
      voteAverage,
    }).create();

    description.insertAdjacentElement("beforeend", movieTitle);
    description.insertAdjacentElement("beforeend", category);
    description.insertAdjacentElement("beforeend", rate);
  }

  #createOverview(description: HTMLDivElement) {
    const h3 = document.createElement("h3");
    h3.textContent = "줄거리";

    const overview = document.createElement("p");
    overview.classList.add("detail");
    overview.textContent = this.#details.overview;

    description.insertAdjacentElement("beforeend", h3);
    description.insertAdjacentElement("beforeend", overview);
  }

  #createDivider(description: HTMLDivElement) {
    const hr = document.createElement("hr");

    description.insertAdjacentElement("beforeend", hr);
  }

  #createVotingRate(description: HTMLDivElement) {
    const h3 = document.createElement("h3");
    h3.textContent = "내 별점";

    const userRating = new UserRating({
      id: this.#id,
      rate: this.#rate,
    }).create();

    description.insertAdjacentElement("beforeend", h3);
    description.insertAdjacentElement("beforeend", userRating);
  }
}

export default MovieItemDetails;
