import { MovieDetails } from "../../types/domain.ts";
import { selectElement } from "../utils/dom.ts";

class MovieItemDetails {
  #details;
  #element;

  constructor(details: MovieDetails) {
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
    <div class="modal-description">
      <hr />
    </div>
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
    const rateContents = /*html*/ `
      <img src="./images/star_filled.png" class="star" /><span>${
        this.#details.voteAverage
      }</span>
    `;

    rate.insertAdjacentHTML("beforeend", rateContents);
    description.insertAdjacentElement("beforeend", rate);
  }

  #createOverview(description: HTMLDivElement) {
    const overview = document.createElement("p");
    overview.classList.add("detail");
    overview.textContent = this.#details.overview;

    description.insertAdjacentElement("afterend", overview);
  }
}

export default MovieItemDetails;
