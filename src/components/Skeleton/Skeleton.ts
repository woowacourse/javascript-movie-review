import { toggleDisplay } from "../../utils/Render";
import { $skeletonList } from "./Element";

const Skeleton = {
  init() {
    Array.from({ length: 20 }).forEach(() =>
      $skeletonList.appendChild(this.createItem())
    );
  },

  createItem() {
    const skeletonItemElement = document.createElement("li");
    const content = /*html*/ `
        <div class="item">
            <div
            class="thumbnail"
            ></div>
        </div>
    `;

    skeletonItemElement.insertAdjacentHTML("beforeend", content);
    return skeletonItemElement;
  },

  show() {
    toggleDisplay($skeletonList, "show");
  },

  hidden() {
    toggleDisplay($skeletonList, "hidden");
  },
};

export default Skeleton;
