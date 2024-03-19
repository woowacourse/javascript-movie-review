import { Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";

import ItemCard from "./ItemCard";

const ItemList = (movieList: Movie[]) => {
  const $ul = createElementWithAttribute("ul", {
    class: "item-list",
  });

  movieList.map((movie) => $ul.appendChild(ItemCard(movie)));

  return $ul;
};
export default ItemList;
