import createElement from "../../utils/createElement";

class SkeletonMoviePoster {
  private moviePosterLi: HTMLElement;

  constructor() {
    this.moviePosterLi = createElement({ tagName: "li" });
    const itemCardDiv = createElement({
      tagName: "div",
      attrs: { class: "item-card" },
    });
    const itemThumbnail = createElement({
      tagName: "div",
      attrs: {
        class: "item-thumbnail skeleton",
      },
    });
    const itemTitle = createElement({
      tagName: "div",
      attrs: { class: "item-title skeleton" },
    });
    const itemScore = createElement({
      tagName: "div",
      attrs: { class: "item-score skeleton" },
    });

    itemCardDiv.append(itemThumbnail, itemTitle, itemScore);

    this.moviePosterLi.append(itemCardDiv);
  }

  get element() {
    return this.moviePosterLi;
  }
}

export default SkeletonMoviePoster;
