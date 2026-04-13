export const renderMoreButton = () => {
  const moreButton = document.querySelector<HTMLDivElement>("#more-button");
  if (!moreButton) return null;

  moreButton.style.display = "block";
};

export const removeMoreButton = () => {
  const moreButton = document.querySelector<HTMLDivElement>("#more-button");
  if (!moreButton) return null;

  moreButton.style.display = "none";
};
