import { Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";

import ItemCard from "./ItemCard";

// TODO: 검색결과 없음 컴포넌트?
const ItemList = (movieList: Movie[] | undefined) => {
  const $ul = createElementWithAttribute("ul", {
    class: "item-list",
  });
  if (!movieList) {
    $ul.textContent = "검색 결과가 없습니다.";
  } else {
    movieList.map((movie) => $ul.appendChild(ItemCard(movie)));
  }

  return $ul;
};
export default ItemList;
