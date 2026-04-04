import { State } from "../types";
import { getElement } from "./getElementView";

export const hideSearchErrorText = () => {
  const searchError = getElement(".search-error-container");
  searchError.textContent = "";
  searchError.hidden = true;
};
export const showErrorText = (string: string) => {
  const searchError = getElement(".search-error-container");
  searchError.textContent = string;
  searchError.hidden = false;
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
export const controlSearchResultText = (state: State) => {
  const searchError = getElement(".search-error-container");

  if (state.searchBarText !== "" && state.movieList.length === 0) {
    searchError.hidden = false;
    searchError.textContent = "검색 결과가 없습니다.";
    return;
  }

  searchError.hidden = true;
};
