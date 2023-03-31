import { $ } from "../../utils/selector";

export const getSkeletonContainer = () => {
  const skeletonContainer = document.createElement("ul");

  skeletonContainer.className = "item-list skeleton-container";
  skeletonContainer.innerHTML = /*html*/ `
        <li>
            <a href="#">
            <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
            </div>
            </a>
        </li>
    `.repeat(20);

  return skeletonContainer;
};

export const deleteSkeletonContainer = () => {
  const skeletonContainer = $(".skeleton-container");

  if (skeletonContainer instanceof HTMLElement)
    skeletonContainer.style.display = "none";
};

export const showSkeletonContainer = () => {
  const skeletonContainer = $(".skeleton-container");

  if (skeletonContainer instanceof HTMLElement)
    skeletonContainer.style.display = "grid";
};
