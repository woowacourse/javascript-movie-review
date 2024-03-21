import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import ItemCard from "./ItemCard";

const NoItem = () => {
  const $noItem = document.createElement("li");
  $noItem.textContent = "검색 결과가 없습니다.";

  return $noItem;
};

const ItemList = (movieList: Movie[] | undefined) => {
  const $ul = createElementWithAttribute("ul", {
    class: "item-list",
  });
  if (movieList && movieList.length > 0) {
    movieList.map((movie) => $ul.appendChild(ItemCard(movie)));
  } else {
    $ul.classList.add("no-item-list");
    $ul.appendChild(NoItem());
  }
  return $ul;
};
export default ItemList;
