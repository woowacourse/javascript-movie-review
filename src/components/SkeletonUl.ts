import { ITEMS } from "../constants/movie.ts";
import { selectElement, toggleElementVisibility } from "../utils/ui.ts";

class SkeletonUl {
  #element;
  static #instance: SkeletonUl;

  constructor() {
    this.#element = document.createElement("ul");
    this.#element.classList.add("skeleton-list");

    this.#create();
  }

  static getInstance(): SkeletonUl {
    if (!SkeletonUl.#instance) {
      SkeletonUl.#instance = new SkeletonUl();
    }

    return SkeletonUl.#instance;
  }

  #create() {
    const mainSection = selectElement<HTMLElement>("main section");

    Array.from({ length: ITEMS.perPage }).forEach(() =>
      this.#element.insertAdjacentElement("beforeend", this.#createSkeletonLi())
    );

    mainSection.insertAdjacentElement("beforeend", this.#element);
  }

  #createSkeletonLi() {
    const skeletonLiElement = document.createElement("li");
    const content = /*html*/ `
    <div class="item skeleton-item">
      <div class="thumbnail"></div>
    </div>
    `;
    skeletonLiElement.insertAdjacentHTML("beforeend", content);

    return skeletonLiElement;
  }

  async getLoadingResult<T>(callback: () => Promise<T>) {
    toggleElementVisibility(this.#element, "show");
    try {
      return await callback();
    } finally {
      toggleElementVisibility(this.#element, "hidden");
    }
  }
}

export default SkeletonUl;
