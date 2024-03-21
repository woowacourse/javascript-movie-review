import { ListType, Movie, PartialMovieDataForItemView } from "../type/movie";
import { createElementWithAttribute } from "../utils";

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
  movieData: PartialMovieDataForItemView,
  listType: ListType,
) => {
  const $main = document.querySelector("main");
  const $section = makeSection(titleText, movieData.movieList);

  $main?.appendChild($section);
  MoreButton(listType, movieData.isShowMoreButton);
};
export default ItemView;
