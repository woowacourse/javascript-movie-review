import { ITEMS } from "../constants/movie.ts";

class SkeletonUl {
  create() {
    const skeletonUlElement = document.createElement("ul");
    skeletonUlElement.classList.add("skeleton-list");
    Array.from({ length: ITEMS.perPage }).forEach(() =>
      skeletonUlElement.appendChild(this.#createSkeletonLi())
    );

    return skeletonUlElement;
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
}

export default SkeletonUl;
