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

export const updateMoreButton = (currentPage: number, totalPages: number) => {
  if (currentPage === totalPages) {
    removeMoreButton();
    return;
  }

  renderMoreButton();
};
