import MovieInputStorage from "../../storage/MovieInputStorage";

import starFilledImg from "../../image/star_filled.png";
import emptyStarImg from "../../image/star_empty.png";

import { $, createElement } from "../../utility/dom";
import { StarRatingButton } from "./../StarRatingsButton/StarRatingsButton";
import { STAR_RATINGS } from "./../../constant/starRatings.const";

class StarRatings {
  #movieId: number;
  #starRatingsButtons: HTMLElement[];

  constructor() {
    this.#movieId = 0;
    this.#starRatingsButtons = this.createStarRatingButtons();
  }

  setMovieId(movieId: number) {
    this.#movieId = movieId;
  }

  getMovieInputData(movieId: number) {
    return MovieInputStorage.getMovieInput(movieId);
  }

  initMyScoreSection(movieId: number) {
    this.setAllStarRatingsButtonEmpty();

    const movieInputData = this.getMovieInputData(movieId);
    let starFilledCount = Number(movieInputData.starFilledCount) || 0;

    this.setScoreDetailsElements(starFilledCount);
    this.initStarRatingsButtons(starFilledCount);
  }

  initStarRatingsButtons(starFilledCount: number) {
    this.#starRatingsButtons.forEach((starButton, index) => {
      if (index < starFilledCount) {
        const img = starButton.querySelector("img") as HTMLImageElement;
        img.src = starFilledImg;
      }
    });
  }

  starRatingsButtonClickHandler(event: Event) {
    const targetElement = event?.target;

    if (targetElement instanceof Image) {
      const starButtonId = Number(
        targetElement.parentElement?.id.replace(/\D/g, "")
      );
      this.setStarRatingButtonsStatus(starButtonId + 1);
    }
  }

  setScoreDetailsElements(starFilledCount: number) {
    const myRatingsElement = $(".myscore-ratings") as HTMLElement;
    const myRatingsDescriptionElement = $(
      ".myscore-description"
    ) as HTMLElement;

    const score = starFilledCount * STAR_RATINGS.scoreConvertMultiplier;
    const description = STAR_RATINGS.scoreDescription[score];

    myRatingsElement.textContent = `${score}`;
    myRatingsDescriptionElement.textContent = `${description}`;
  }

  setStarRatingButtonsStatus(starButtonId: number) {
    this.setAllStarRatingsButtonEmpty();

    let starFilledCount = 0;
    for (let i = 0; i < starButtonId; i++) {
      const img = this.#starRatingsButtons[i].querySelector(
        "img"
      ) as HTMLImageElement;
      img.src = starFilledImg;
      starFilledCount += 1;
    }

    this.setScoreDetailsElements(starFilledCount);
    this.setMovieInputData(starFilledCount);
  }

  setMovieInputData(starFilledCount: number) {
    MovieInputStorage.setMovieDetail({
      movieId: this.#movieId,
      starFilledCount: starFilledCount,
    });
  }

  setAllStarRatingsButtonEmpty() {
    this.#starRatingsButtons.forEach((starButton) => {
      const img = starButton.querySelector("img") as HTMLImageElement;
      img.src = emptyStarImg;
    });
  }

  createStarRatingButtons() {
    let count = 0;

    const starRatingsButtons = new Array(STAR_RATINGS.starCount)
      .fill(null)
      .map(() => {
        const starRatingsButton = StarRatingButton.createStarRatingButton();
        starRatingsButton.id = `star-button${count}`;

        count += 1;
        return starRatingsButton;
      });

    return starRatingsButtons;
  }

  createStarRatings() {
    const starRatingsWrapper = createElement("div", {
      class: "star-ratings-wrapper",
    });

    this.#starRatingsButtons.forEach((starRatingsButton) => {
      starRatingsWrapper.appendChild(starRatingsButton);
    });

    starRatingsWrapper.addEventListener(
      "click",
      this.starRatingsButtonClickHandler.bind(this)
    );

    return starRatingsWrapper;
  }
}

export default StarRatings;
