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
  const MIN_SKELETON_TIME = 600;

  const elapsed = Date.now() - start;
  const remaining = MIN_SKELETON_TIME - elapsed;

  if(remaining > 0){
    setTimeout(() => {
      skeleton.classList.remove("animation");
      skeleton.replaceChildren();
    }, remaining);
  } else {
    skeleton.classList.remove("animation");
    skeleton.replaceChildren();
  }
};
