const MAIN_SEE_MORE_BUTTON_ID = "main-see-more-button";

let mainSeeMoreButton: HTMLElement | null = null;

const createMainSeeMoreButtonTemplate = () => `
  <button class="see-more-button" id="${MAIN_SEE_MORE_BUTTON_ID}">
    더 보기
  </button>
`;

export const renderMainSeeMoreButton = (parent: HTMLElement, onClick: () => void) => {
  if (mainSeeMoreButton) {
    mainSeeMoreButton.remove();
  }

  parent.insertAdjacentHTML("beforeend", createMainSeeMoreButtonTemplate());
  mainSeeMoreButton = document.getElementById(MAIN_SEE_MORE_BUTTON_ID);
  mainSeeMoreButton?.addEventListener("click", onClick);
};

export const removeMainSeeMoreButton = () => {
  mainSeeMoreButton?.remove();
  mainSeeMoreButton = null;
};
