import "./style.css";

import starFills from "../MoviePoster/star_filled.png";
import starEmpty from "../MoviePoster/star_empty.png";
import createElement from "../../utils/createElement";
import localStore from "../../store/localStore";
import getReviewMessageByRating from "../../utils/getMessageByRating";

const starCount = 5;
const label = "내 별점";

class EditableStarRating {
  private starContainer: HTMLElement;
  private starElements: HTMLElement[];
  private selectedStarCount: number;
  private ratingScore: HTMLElement;
  private ratingText: HTMLElement;
  private movieName: string;

  constructor(movieName: string) {
    this.movieName = movieName;
    this.selectedStarCount = localStore.getMyMovieRating(movieName) ?? 0;
    this.starContainer = createElement({
      tagName: "div",
      attrs: {
        class: "star-container",
      },
    });

    const labelElement = createElement({ tagName: "p", contents: label });

    const starWrapper = createElement({
      tagName: "div",
      attrs: { class: "star-wrapper" },
    });

    this.starElements = Array.from({ length: starCount }).map((_, index) => {
      const isFilledStar = index < this.selectedStarCount;

      return createElement({
        tagName: "img",
        attrs: {
          src: isFilledStar ? starFills : starEmpty,
          class: "editable-star",
          "data-star-rating": (index + 1).toString(),
        },
      });
    });

    starWrapper.append(...this.starElements);

    const ratingWrapper = createElement({
      tagName: "div",
      attrs: {
        class: "rating-wrapper",
      },
    });

    this.ratingScore = createElement({
      tagName: "p",
      contents: (this.selectedStarCount * 2).toString(),
      attrs: {
        class: "rating-score",
      },
    });

    this.ratingText = createElement({
      tagName: "p",
      contents: getReviewMessageByRating(this.selectedStarCount),
      attrs: {
        class: "rating-text",
      },
    });

    ratingWrapper.append(this.ratingScore, this.ratingText);

    this.starContainer.append(labelElement, starWrapper, ratingWrapper);
    starWrapper.addEventListener("click", this.clickStarButton.bind(this));
    starWrapper.addEventListener("mousemove", this.hoverStarEvent.bind(this));
    starWrapper.addEventListener(
      "mouseleave",
      this.restoreStarCount.bind(this)
    );
  }

  private updateTextByRating(rating: number) {
    const text = createElement({
      tagName: "p",
      contents: getReviewMessageByRating(rating),
      attrs: {
        class: "rating-text",
      },
    });

    const score = (rating * 2).toString();
    this.ratingScore.replaceChildren(score);
    this.ratingText.replaceChildren(text);
  }

  private restoreStarCount() {
    const totalStarCount = 5;

    Array.from({ length: this.selectedStarCount }).forEach((_, index) => {
      (this.starElements[index] as HTMLImageElement).src = starFills;
    });

    Array.from({ length: totalStarCount - this.selectedStarCount }).forEach(
      (_, index) => {
        (
          this.starElements[totalStarCount - index - 1] as HTMLImageElement
        ).src = starEmpty;
      }
    );

    this.updateTextByRating(this.selectedStarCount);
  }

  private hoverStarEvent(event: MouseEvent) {
    const starRatingStr = (event.target as HTMLElement).dataset.starRating;
    const starRating = Number(starRatingStr);
    if (!starRating) return;

    Array.from({ length: starRating }).forEach((_, index) => {
      (this.starElements[index] as HTMLImageElement).src = starFills;
    });

    Array.from({ length: 5 - starRating }).forEach((_, index) => {
      (this.starElements[4 - index] as HTMLImageElement).src = starEmpty;
    });

    this.updateTextByRating(starRating);
  }

  private clickStarButton(event: Event) {
    const { starRating } = (event.target as HTMLElement)?.dataset;
    if (!starRating) return;

    localStore.setMyMovieRating(this.movieName, Number(starRating));
    this.selectedStarCount = Number(starRating);
  }

  get element() {
    return this.starContainer;
  }
}

export default EditableStarRating;
