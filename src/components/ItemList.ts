import { Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";

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
  if (!movieList || movieList.length === 0) {
    $ul.classList.add("no-item-list");
    $ul.appendChild(NoItem());
  } else {
    movieList.map((movie) => $ul.appendChild(ItemCard(movie)));
  }
  return $ul;
};
export default ItemList;
