import { Movie } from "../type/movie";
import createElementWithAttribute from "../utils/createElementWithAttribute";

import ItemList from "./ItemList";
import MoreButton from "./MoreButton";

interface Props {
  movieList: Movie[];
  isShowMoreButton: boolean;
}

const addMoreButtonToSection = (
  $section: HTMLElement,
  isShowMoreButton: boolean,
) => {
  const $moreButton = MoreButton(isShowMoreButton);
  if ($moreButton) {
    $section.appendChild($moreButton);
  }
  return $section;
};

const makeSection = (movieList: Movie[], isShowMoreButton: boolean) => {
  const $section = createElementWithAttribute("section", {
    class: "item-view",
  });
  $section.appendChild(ItemList(movieList));

  return addMoreButtonToSection($section, isShowMoreButton);
};

const ItemView = ({ movieList, isShowMoreButton }: Props) => {
  const $main = document.querySelector("main");

  const $section = makeSection(movieList, isShowMoreButton);

  $main?.appendChild($section);
};
export default ItemView;
