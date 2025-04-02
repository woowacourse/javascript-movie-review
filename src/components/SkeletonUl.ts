import { ITEMS } from "../constants/movie.ts";
import { selectElement, toggleElementVisibility } from "../utils/ui.ts";

class SkeletonUl {
  #element;
  static #instance: SkeletonUl;

  constructor() {
    this.#element = document.createElement("ul");
    this.#element.classList.add("skeleton-list");
    this.#setLoadingEvent();
    this.#setLoadingEndEvent();
  }

  static getInstance(): SkeletonUl {
    if (!SkeletonUl.#instance) {
      SkeletonUl.#instance = new SkeletonUl();
    }

    return SkeletonUl.#instance;
  }

  create() {
    Array.from({ length: ITEMS.perPage }).forEach(() =>
      this.#element.appendChild(this.#createSkeletonLi())
    );

    return this.#element;
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

  #setLoadingEvent() {
    this.#element.addEventListener("loading", () => {
      toggleElementVisibility(".skeleton-list", "show");
    });
  }

  #setLoadingEndEvent() {
    this.#element.addEventListener("loadingEnd", () => {
      toggleElementVisibility(".skeleton-list", "hidden");
    });
  }

  async getLoadingResult<T>(callback: () => Promise<T>) {
    const mainSection = selectElement<HTMLElement>("main section");
    mainSection.appendChild(this.create());

    this.#element.dispatchEvent(new Event("loading"));
    try {
      return await callback();
    } catch (error) {
      throw error;
    } finally {
      this.#element.dispatchEvent(new Event("loadingEnd"));
    }
  }
}

export default SkeletonUl;
