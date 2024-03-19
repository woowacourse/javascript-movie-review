import dataStateStore from "../model/DataStateStore";
import dummyMovieList from "../movieList";
import { Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";

import ItemList from "./ItemList";

const changeMoreButtonState = (event: Event, isShowMoreButton: boolean) => {
  const { currentTarget } = event;
  if (currentTarget instanceof HTMLButtonElement) {
    currentTarget.classList.toggle("open", isShowMoreButton);
  }
};

const addItemsToMovieList = (totalMovieList: Movie[]) => {
  const $itemList = document.querySelector(".item-list");
  if (!$itemList) return;

  const $newItemList = ItemList(totalMovieList);
  $itemList.parentElement?.replaceChild($newItemList, $itemList);
};

const handleClickMoreButton = (event: Event) => {
  event.stopPropagation();
  const { totalMovieList, isShowMoreButton } = dataStateStore.getTotalMovieData(
    { movieData: dummyMovieList, isShowMoreButton: false },
    true,
  );
  addItemsToMovieList(totalMovieList);
  changeMoreButtonState(event, isShowMoreButton);
};

const MoreButton = () => {
  const $moreButton = createElementWithAttribute("button", {
    id: "more-button",
    class: "btn primary full-width more-button open",
  });
  $moreButton.textContent = "더 보기";
  document.querySelector(".item-view")?.appendChild($moreButton);
  $moreButton.addEventListener("click", handleClickMoreButton);

  return $moreButton;
};
export default MoreButton;
