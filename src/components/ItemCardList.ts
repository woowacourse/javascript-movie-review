import { NO_ITEM_TEXT } from "../constants/system";
import { Movie } from "../type/movie";

import ItemCard from "./ItemCard";

const NoItem = () => {
  const $noItem = document.createElement("li");
  $noItem.textContent = NO_ITEM_TEXT;

  return $noItem;
};

const ItemCardList = (movieList: Movie[] | undefined) => {
  const $ul = document.querySelector(".item-view-container .item-list");

  if (movieList && movieList.length > 0) {
    const fragment = new DocumentFragment();
    movieList.map((movie) => fragment.appendChild(ItemCard(movie)));
    $ul?.appendChild(fragment);
  } else {
    $ul?.classList.add("no-item-list");
    $ul?.appendChild(NoItem());
  }

  return $ul;
};
export default ItemCardList;
