import { createElement } from "../utils/dom";

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
    return $skeletonUl;
  },
  remove: ($skeleton: Element) => {
    $skeleton.remove();
  },
};
export default Skeleton;
