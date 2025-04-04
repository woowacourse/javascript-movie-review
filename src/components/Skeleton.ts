import { $, createElement } from "../utils/dom";

const Skeleton = {
  render: (el: Element, count: number = 8) => {
    const $skeletonUl = createElement("ul", {
      class: ["skeleton-list"],
    });

    const $skeletonItems = Array.from({ length: count }, () =>
      createElement("li", {})
    );
    $skeletonUl.append(...$skeletonItems);

    el.appendChild($skeletonUl);
  },
  remove: () => {
    const $skeletonUl = $(".skeleton-list");
    if ($skeletonUl) {
      $skeletonUl.remove();
    }
  },
};
export default Skeleton;
