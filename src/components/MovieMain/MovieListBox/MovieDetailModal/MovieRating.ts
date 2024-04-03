import { getRatingNumber, getRatingText } from "../../../../constants/rating";

import createElement from "../../../utils/createElement";
import generateStarRangeInput from "../../../common/generateStarRangeInput";

class MovieRating {
  $element;
  private rating;
  private saveRating;

  constructor(
    rating: number = 0,
    saveRating: (rating: number) => void = () => {}
  ) {
    this.rating = rating;
    this.saveRating = saveRating;
    this.$element = this.generateMovieRating();
  }

  private rateMovie(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    this.rating = Number(e.target.value);
    this.reRender();
    this.saveRating(this.rating);
  }

  private reRender() {
    const $rangeInput = document.querySelector("input.star-rating-input");

    if ($rangeInput instanceof HTMLInputElement) {
      $rangeInput.value = String(this.rating);
    }

    document
      .querySelector(".rating-result")
      ?.replaceWith(this.generateRatingResult());
  }

  private generateMovieRating() {
    const $title = createElement({
      tagName: "span",
      children: ["내 별점"],
    });
    const $starRangeInput = generateStarRangeInput(
      this.rateMovie.bind(this),
      this.rating
    );
    const $ratingResult = this.generateRatingResult();

    const movieRating = createElement({
      tagName: "div",
      children: [$title, $starRangeInput, $ratingResult],
      attribute: { class: "movie-rating" },
    });

    return movieRating;
  }

  private generateRatingResult() {
    const $ratingNumber = createElement({
      tagName: "span",
      children: [this.ratingNumber(this.rating)],
    });
    const $ratingText = createElement({
      tagName: "span",
      children: [this.ratingText(this.rating)],
      attribute: { class: "rating-result-text" },
    });
    const $ratingResult = createElement({
      tagName: "div",
      children: [$ratingNumber, $ratingText],
      attribute: { class: "rating-result" },
    });

    return $ratingResult;
  }

  private ratingNumber(rating: number) {
    return String(getRatingNumber(rating));
  }

  private ratingText(rating: number) {
    return getRatingText(rating);
  }
}

export default MovieRating;
