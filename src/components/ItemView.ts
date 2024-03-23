import { ListType, Movie, PartialMovieDataForItemView } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import ItemList from "./ItemCardList";
import MoreButton from "./MoreButton";
import Title from "./Title";

const $main = document.querySelector("main");

const makeSection = (titleText: string, movieList: Movie[] | undefined) => {
  const $section = createElementWithAttribute("section", {
    class: "item-view",
  });
  $section.appendChild(Title(titleText));
  $section.appendChild(ItemList(movieList));

  return $section;
};

const renderItemView = (
  titleText: string,
  movieData: PartialMovieDataForItemView,
  listType: ListType,
) => {
  const $section = makeSection(titleText, movieData.movieList);

  $main?.appendChild($section);
  MoreButton(listType, movieData.isShowMoreButton);
};
export default renderItemView;