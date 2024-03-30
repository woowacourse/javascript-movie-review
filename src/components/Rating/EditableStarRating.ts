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
      const isFilledStar = index < this.selectedStarCount ? true : false;

      return createElement({
        tagName: "img",
        attrs: {
          src: isFilledStar ? starFills : starEmpty,
          class: "editable-star",
          "data-star-rating": index.toString(),
        },
      });
    });

    starWrapper.append(...this.starElements);

    this.ratingText = createElement({
      tagName: "p",
      contents: getReviewMessageByRating(this.selectedStarCount),
      attrs: {
        class: "rating-text",
      },
    });

    this.starContainer.append(labelElement, starWrapper, this.ratingText);
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

    this.ratingText.replaceChildren(text);
  }

  private restoreStarCount() {
    Array.from({ length: this.selectedStarCount }).forEach((_, index) => {
      (this.starElements[index] as HTMLImageElement).src = starFills;
    });

    Array.from({ length: 5 - this.selectedStarCount }).forEach((_, index) => {
      (this.starElements[4 - index] as HTMLImageElement).src = starEmpty;
    });

    this.updateTextByRating(this.selectedStarCount);
  }

  private getCurrentStarIndex(event: MouseEvent) {
    const firstStarInfo = this.starElements[0].getBoundingClientRect();
    const starWidth = firstStarInfo.width;
    const mouseX = event.clientX;
    const starRating = Math.ceil(
      Math.floor(mouseX - firstStarInfo.x) / starWidth
    );

    return starRating;
  }

  private hoverStarEvent(event: MouseEvent) {
    const starRating = this.getCurrentStarIndex(event);

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

    localStore.setMyMovieRating(this.movieName, Number(starRating) + 1);
    this.selectedStarCount = Number(starRating) + 1;
  }

  get element() {
    return this.starContainer;
  }
}

export default EditableStarRating;
