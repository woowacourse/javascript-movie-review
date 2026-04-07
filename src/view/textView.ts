import { State } from "../types";
import { getElement } from "./getElementView";

export const hideSearchErrorText = () => {
  const errorContainer = getElement(".search-error-container");
  errorContainer.hidden = true;

  const searchError = getElement(".error-text");
  searchError.textContent = "";
};
export const showErrorText = (string: string) => {
  const searchError = getElement(".error-text");
  searchError.textContent = string;
};

export const updateTitleText = (state: State) => {
  const description = getElement(".page-title");
  const background = getElement(".background-container");

  if (state.searchBarText === "") {
    background.hidden = false;
    description.textContent = "지금 인기 있는 영화";
  } else {
    background.hidden = true;
    description.textContent = `'${state.searchBarText}' 검색 결과`;
  }
};
export const controlSearchResultText = () => {
  const errorContainer = getElement(".search-error-container");
  errorContainer.hidden = false;

  const searchError = getElement(".search-error-text");
  searchError.textContent = "검색 결과가 없습니다.";
};
