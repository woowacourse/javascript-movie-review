export const removeSkeletonAfterImageLoad = (e: Event) => {
  if (!(e.currentTarget instanceof HTMLImageElement)) return;
  const { currentTarget } = e;
  if (!currentTarget.complete) return;

  currentTarget.classList.remove('skeleton');
};
