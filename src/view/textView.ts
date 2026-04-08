import { State } from "../types";
import { getElement } from "./getElementView";

export const hideErrorText = () => {
  const errorContainer = getElement(".error-container");
  errorContainer.hidden = true;

  const errorText = getElement(".error-text");
  errorText.textContent = "";
};
export const showErrorText = (string: string) => {
  const errorContainer = getElement(".error-container");
  errorContainer.hidden = false;

  const errorText = getElement(".error-text");
  errorText.textContent = string;
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
