import { MINIMUM_DISPLAY_DURATION } from "../constants/policy";

export const renderSkeleton = () => {
  const skeleton = document.querySelector<HTMLDivElement>("#skeleton");
  if (!skeleton) return;

  const skeletonTemplate =
    document.querySelector<HTMLTemplateElement>("#movie-template");
  if (!skeletonTemplate) return null;

  for (let i = 0; i < 20; i++) {
    const skeletonCloneNode = skeletonTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;
    if (!skeletonCloneNode) return null;

    skeleton.classList.add("animation");
    skeleton.appendChild(skeletonCloneNode);
  }
};

export const removeSkeleton = (start: number) => {
  const skeleton = document.querySelector<HTMLDivElement>("#skeleton");
  if (!skeleton) return;
  const MIN_SKELETON_TIME = MINIMUM_DISPLAY_DURATION;

  const elapsed = Date.now() - start;
  const remaining = Math.max(MIN_SKELETON_TIME - elapsed, 0);

  setTimeout(() => {
    skeleton.classList.remove("animation");
    skeleton.replaceChildren();
  }, remaining);
};
