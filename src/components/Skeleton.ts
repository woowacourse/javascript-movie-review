import { $, createElement } from "../utils/dom";

const Skeleton = {
  render: (el: Element) => {
    const $skeletonUl = createElement("ul", {
      class: ["skeleton-list"],
      innerHTML: `
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>`,
    });

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
