/* eslint-disable max-lines-per-function */
import apiClient from "../model/APIClient";
import dataStateStore from "../model/DataStateStore";
import { ListType, Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";
import preventXSS from "../utils/preventXSS";

import ItemList from "./ItemList";

const changeMoreButtonState = (event: Event, isShowMoreButton: boolean) => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    target.classList.toggle("open", isShowMoreButton);
  }
};

const addItemsToMovieList = (totalMovieList: Movie[]) => {
  const $itemList = document.querySelector(".item-list");
  if (!$itemList) return;

  const $newItemList = ItemList(totalMovieList);
  $itemList.parentElement?.replaceChild($newItemList, $itemList);
};

const getSearchInputValue = () => {
  const $searcInput = document.querySelector("#search-input");
  if (!($searcInput instanceof HTMLInputElement)) {
    return undefined;
  }

  return preventXSS($searcInput.value);
};

const getSearchMovieData = async () => {
  const title = getSearchInputValue();
  if (!title) return;
  await apiClient.getSearchMovieData(false, title);
};

const handleClickMoreButton = async (event: Event, listType: ListType) => {
  event.stopPropagation();

  if (listType === "popular") await apiClient.getPopularMovieData(false);
  else await getSearchMovieData();

  const { movieList, isShowMoreButton } = dataStateStore.movieData;

  addItemsToMovieList(movieList);
  changeMoreButtonState(event, isShowMoreButton);
};

const MoreButton = (listType: ListType) => {
  const $moreButton = createElementWithAttribute("button", {
    id: "more-button",
    class: "btn primary full-width more-button open",
  });
  $moreButton.textContent = "더 보기";
  document.querySelector(".item-view")?.appendChild($moreButton);
  $moreButton.addEventListener("click", (event) =>
    handleClickMoreButton(event, listType),
  );

  return $moreButton;
};
export default MoreButton;
