const SEARCH_SEE_MORE_BUTTON_ID = "search-see-more-button";

let searchSeeMoreButton: HTMLElement | null = null;

const createSearchSeeMoreButtonTemplate = () => `
  <button class="see-more-button" id="${SEARCH_SEE_MORE_BUTTON_ID}">
    더 보기
  </button>
`;

export const renderSearchSeeMoreButton = (parent: HTMLElement, onClick: () => void) => {
  if (searchSeeMoreButton) {
    searchSeeMoreButton.remove();
  }

  parent.insertAdjacentHTML("beforeend", createSearchSeeMoreButtonTemplate());
  searchSeeMoreButton = document.getElementById(SEARCH_SEE_MORE_BUTTON_ID);
  searchSeeMoreButton?.addEventListener("click", onClick);
};

export const removeSearchSeeMoreButton = () => {
  searchSeeMoreButton?.remove();
  searchSeeMoreButton = null;
};
