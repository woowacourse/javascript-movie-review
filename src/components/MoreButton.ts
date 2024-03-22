import { dataStateStore } from "../model";
import {
  handleGetPopularMovieData,
  handleGetSearchMovieData,
} from "../service/handleSkeletonAndAPI";
import { ListType, Movie } from "../type/movie";
import { createElementWithAttribute, debounceFunc } from "../utils";

import ItemList from "./ItemList";

// --- MoreButton click event
const changeMoreButtonState = (event: Event, isShowMoreButton: boolean) => {
  const { target } = event;

  if (target instanceof HTMLButtonElement) {
    target.classList.toggle("open", isShowMoreButton);
  }
};

const addItemsToMovieList = (totalMovieList: Movie[]) => {
  const $itemList = document.querySelector(".item-view .item-list");

  if (!$itemList) return;

  const $newItemList = ItemList(totalMovieList);
  $itemList.parentElement?.replaceChild($newItemList, $itemList);
};

const getSearchInputValue = () => {
  const $searchInput = document.querySelector("#search-input");

  if (!($searchInput instanceof HTMLInputElement)) {
    return undefined;
  }

  return $searchInput.value;
};

const getSearchMovieData = async () => {
  const title = getSearchInputValue();

  if (!title) return;

  await handleGetSearchMovieData(title, false);
};

const handleMovieDataState = (event: Event) => {
  const previousScrollPosition = window.scrollY;

  const { movieList, isShowMoreButton } = dataStateStore.movieData;

  addItemsToMovieList(movieList);
  changeMoreButtonState(event, isShowMoreButton);

  window.scrollTo(0, previousScrollPosition);
};

const handleMovieData = async (event: Event, listType: ListType) => {
  if (listType === "popular") {
    await handleGetPopularMovieData();
  } else {
    await getSearchMovieData();
  }

  handleMovieDataState(event);
};

const handleClickMoreButton = async (event: Event, listType: ListType) => {
  event.stopPropagation();

  debounceFunc(() => handleMovieData(event, listType));
};

// MoreButton click event ---

// make MoreButton ----
const makeMoreButton = () => {
  const $moreButton = createElementWithAttribute("button", {
    id: "more-button",
    class: "btn primary full-width more-button open",
  });
  $moreButton.textContent = "더 보기";

  return $moreButton;
};

const MoreButton = (listType: ListType, isShowMoreButton: boolean) => {
  if (!isShowMoreButton) return;
  const $moreButton = makeMoreButton();
  document.querySelector(".item-view")?.appendChild($moreButton);

  $moreButton.addEventListener("click", (event) =>
    handleClickMoreButton(event, listType),
  );
};

export default MoreButton;
