import { MovieDetails } from "../../types/domain.ts";
import { RATING_MESSAGE, RATING_SCORE, VOTE } from "../constants/movie.ts";
import { calculateFilledStar, ratingMovie } from "../domain/ratingMovie.ts";
import { selectElement, selectElementAll } from "../utils/ui.ts";

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
    this.#onRateBoxClick();
    this.#onInitialRateClick();

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
    const filledIndex = calculateFilledStar(this.#rate) - 1;
    const starMarks = Array.from({ length: VOTE.maximumIconCount })
      .map((_, index) => {
        return /*html*/ `
          <img src="${
            index <= filledIndex ? VOTE.filledStarImage : VOTE.emptyStarImage
          }" class="star-mark" data-mark-index="${index + 1}"/>
        `;
      })
      .join("");

    const votingRate = /*html*/ `
      <div class="voting-rate">
        <div class="star-marks-container">${starMarks}</div>
        <p>${RATING_MESSAGE[this.#rate] ?? VOTE.noticeMessage}</p>
        <span>(${this.#rate}/${VOTE.MaximumRate})</span>
      </div>
    `;

    const h3 = document.createElement("h3");
    h3.textContent = "내 별점";

    description.insertAdjacentElement("beforeend", h3);
    description.insertAdjacentHTML("beforeend", votingRate);
  }

  #onRateBoxClick() {
    const starMarksContainer = selectElement<HTMLDivElement>(
      ".star-marks-container",
      this.#element
    );

    const eventHandler = this.#handleRateHover.bind(this);

    let isVotingActive = false;
    const handleRateBoxClick = () => {
      if (!isVotingActive) {
        starMarksContainer.addEventListener("mouseover", eventHandler);
        isVotingActive = true;
      } else {
        starMarksContainer.removeEventListener("mouseover", eventHandler);

        ratingMovie(this.#id, this.#rate);
        isVotingActive = false;
      }
    };

    starMarksContainer.addEventListener("click", handleRateBoxClick);
  }

  #onInitialRateClick() {
    const handleInitialRateClick = (event: MouseEvent) => {
      const hoveredStar = document.elementFromPoint(
        event.clientX,
        event.clientY
      ) as HTMLImageElement;

      const starredIndex = Number(hoveredStar.dataset.markIndex);
      const stars = selectElementAll<HTMLImageElement>(".star-mark");

      stars.forEach((star) => {
        const markIndex = Number(star.dataset.markIndex);

        star.src =
          markIndex <= starredIndex
            ? VOTE.filledStarImage
            : VOTE.emptyStarImage;
      });
    };
    const starMarksContainer = selectElement<HTMLDivElement>(
      ".star-marks-container",
      this.#element
    );

    starMarksContainer.addEventListener("click", handleInitialRateClick);
  }

  #handleRateHover(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    if (!target.closest(".star-marks-container")) {
      return;
    }
    const starredIndex = Number(target.dataset.markIndex);
    const stars = selectElementAll<HTMLImageElement>(".star-mark");
    stars.forEach((star) => {
      const markIndex = Number(star.dataset.markIndex);

      star.src =
        markIndex <= starredIndex ? VOTE.filledStarImage : VOTE.emptyStarImage;
    });

    const score = RATING_SCORE[starredIndex];
    this.#rate = score;

    const ratingMessage =
      selectElement<HTMLParagraphElement>(".voting-rate > p");
    ratingMessage.textContent = RATING_MESSAGE[score];

    const ratingScore = selectElement<HTMLParagraphElement>(
      ".voting-rate > span"
    );
    ratingScore.textContent = `(${this.#rate}/${VOTE.MaximumRate})`;
  }
}

export default MovieItemDetails;
