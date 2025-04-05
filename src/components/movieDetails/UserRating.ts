import { RATING_MESSAGE, RATING_SCORE, VOTE } from "../../constants/movie";
import movieService from "../../service/movieService";
import { selectElement, selectElementAll } from "../../utils/ui";

interface UserRatingParams {
  id: number;
  rate: number;
}

class UserRating {
  #id;
  #rate;
  #element;

  constructor({ id, rate }: UserRatingParams) {
    this.#id = id;
    this.#rate = rate;
    this.#element = document.createElement("div");
    this.#element.classList.add("voting-rate");
  }

  create() {
    this.#init();

    return this.#element;
  }

  #init() {
    const starMarks = this.#createStars();
    const rateMessage = this.#createRateMessage();
    this.#element.insertAdjacentElement("beforeend", starMarks);
    this.#element.insertAdjacentHTML("beforeend", rateMessage);

    this.#onRateBoxClick(starMarks);
    this.#onInitialRateClick(starMarks);
  }

  #createStars() {
    const starMarksContainer = document.createElement("div");
    starMarksContainer.classList.add("star-marks-container");

    const filledIndex = movieService.getRateStars(this.#rate) - 1;
    const starMarks = Array.from({ length: VOTE.maximumIconCount })
      .map((_, index) => {
        return /*html*/ `
          <img src="${
            index <= filledIndex ? VOTE.filledStarImage : VOTE.emptyStarImage
          }" class="star-mark" data-mark-index="${index + 1}"/>
        `;
      })
      .join("");

    starMarksContainer.insertAdjacentHTML("beforeend", starMarks);

    return starMarksContainer;
  }

  #createRateMessage() {
    const rateMessage = /*html*/ `
        <p class="rate-message">${
          RATING_MESSAGE[this.#rate] ?? VOTE.noticeMessage
        }
          <span>(${this.#rate}/${VOTE.MaximumRate})</span>
        </p>
    `;

    return rateMessage;
  }

  #onRateBoxClick(eventContainer: HTMLDivElement) {
    const eventHandler = this.#handleRateHover.bind(this);

    let isVotingActive = false;
    const handleRateBoxClick = (event: MouseEvent) => {
      eventHandler(event);

      if (!isVotingActive) {
        eventContainer.addEventListener("mouseover", eventHandler);
        isVotingActive = true;
      } else {
        eventContainer.removeEventListener("mouseover", eventHandler);

        this.#ratingMovie(this.#id, this.#rate);
        isVotingActive = false;
      }
    };

    eventContainer.addEventListener("click", handleRateBoxClick);
  }

  #onInitialRateClick(eventContainer: HTMLDivElement) {
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

    eventContainer.addEventListener("click", handleInitialRateClick);
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

    const ratingMessage = selectElement<HTMLParagraphElement>(".rate-message");
    ratingMessage.textContent = RATING_MESSAGE[score];

    const ratingScore = document.createElement("span");
    ratingScore.textContent = `(${this.#rate}/${VOTE.MaximumRate})`;
    ratingMessage.insertAdjacentElement("beforeend", ratingScore);
  }

  #ratingMovie = (id: number, rate: number) => {
    const movieRate = { id, rate };
    const isRated = movieService.checkHasRated(id);
    if (isRated) {
      movieService.updateRateById(id, movieRate);
      return;
    }

    movieService.addRate(movieRate);
  };
}

export default UserRating;
