export const renderSkeleton = () => {
  const skeleton = document.querySelector<HTMLUListElement>("#skeleton");
  if (!skeleton) return;
  skeleton.hidden = false;
};

export const removeSkeleton = () => {
  const skeleton = document.querySelector<HTMLUListElement>("#skeleton");
  if (!skeleton) return;
  skeleton.hidden = true;
};
