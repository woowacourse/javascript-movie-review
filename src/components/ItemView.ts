import { ListType, Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";

import ItemList from "./ItemList";
import MoreButton from "./MoreButton";
import Title from "./Title";

const makeSection = (titleText: string, movieList: Movie[] | undefined) => {
  const $section = createElementWithAttribute("section", {
    class: "item-view",
  });
  $section.appendChild(Title(titleText));
  $section.appendChild(ItemList(movieList));

  return $section;
};

const ItemView = (
  titleText: string,
  movieList: Movie[] | undefined,
  listType: ListType,
) => {
  const $main = document.querySelector("main");

  const $section = makeSection(titleText, movieList);

  $main?.appendChild($section);
  MoreButton(listType);
};
export default ItemView;
