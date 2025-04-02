import { MovieDetails } from "../../types/domain.ts";
import { VOTE } from "../constants/movie.ts";
import { selectElement } from "../utils/ui.ts";
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
  }

  create() {
    this.#createContainer();
    this.#createPoster();
    this.#createDescription();

    this.#element.classList.add("modal-container");
    return this.#element;
  }

  #createContainer() {
    const template = /*html*/ `
    <div class="modal-image"></div>
    <div class="modal-description"></div>
    `;

    this.#element.insertAdjacentHTML("beforeend", template);
  }

  #createPoster() {
    const div = selectElement<HTMLDivElement>(".modal-image", this.#element);
    const posterImage = document.createElement("img");
    posterImage.src = this.#details.posterPath;
    posterImage.alt = this.#details.title;

    div.insertAdjacentElement("beforeend", posterImage);
  }

  #createDescription() {
    const description = selectElement<HTMLDivElement>(
      ".modal-description",
      this.#element
    );

    this.#createTitle(description);
    this.#createCategory(description);
    this.#createRate(description);
    this.#createDivider(description);
    this.#createVotingRate(description);
    this.#createDivider(description);
    this.#createOverview(description);
  }

  #createTitle(description: HTMLDivElement) {
    const title = document.createElement("h2");
    title.textContent = this.#details.title;

    description.insertAdjacentElement("beforeend", title);
  }

  #createCategory(description: HTMLDivElement) {
    const category = document.createElement("p");
    category.classList.add("category");
    category.textContent =
      this.#details.releaseYear + " · " + this.#details.genres.join(", ");

    description.insertAdjacentElement("beforeend", category);
  }

  #createRate(description: HTMLDivElement) {
    const rate = document.createElement("p");
    rate.classList.add("rate");
    rate.textContent = "평균";

    const rateContents = /*html*/ `
      <img src="${VOTE.filledStarImage}" class="star" />
      <span>${this.#details.voteAverage}</span>
    `;

    rate.insertAdjacentHTML("beforeend", rateContents);
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
