import { PAGE_SIZE } from "../utils/constants";

export function createSkeleton(count: number = PAGE_SIZE): HTMLUListElement {
  const skeletonWrapper = document.createElement("ul");
  skeletonWrapper.className = "thumbnail-list";

  const skeletons = Array.from({ length: count }, () => {
    const skeleton = document.createElement("li");
    skeleton.className = "skeleton";
    return skeleton;
  });

  skeletons.forEach((card) => skeletonWrapper.appendChild(card));

  return skeletonWrapper;
}
