import { HTMLTemplate } from "./abstract/BaseComponent";
import { $ } from "../utils/dom";
import { generateMovieListSkeleton } from "./templates/movie/generateMovieListSkeleton";

type SkeletonVariant = "movie";
export default class SkeletonUI {
  private variant: SkeletonVariant;

  constructor(variant: SkeletonVariant) {
    this.variant = variant;
  }

  render(targetId: string): void {
    const element = $(targetId);

    if (!(element instanceof HTMLElement)) {
      return;
    }

    element.innerHTML = this.generateTemplate();
  }

  insert(targetId: string, position: InsertPosition = "beforeend"): void {
    $(targetId)?.insertAdjacentHTML(position, this.generateTemplate());
  }

  generateTemplate() {
    switch (this.variant) {
      case "movie":
        return generateMovieListSkeleton();
    }
  }
}
