import LogoImg from "../../templates/logo.png";
import dummyMovieList from "../movieList";
import createElementWithAttribute from "../utils/createElementWithAttribute";

import ItemView from "./ItemView";
import SearchBox from "./SearchBox";

const handleClickToRefresh = () => {
  const $itemView = document.querySelector(".item-view");
  $itemView?.remove();
  ItemView("지금 인기 있는 영화", dummyMovieList);
};

const Logo = () => {
  const logoImgAttribute = {
    src: LogoImg,
    alt: "MovieList 로고",
  };
  const $logo = createElementWithAttribute("img", logoImgAttribute);
  $logo.addEventListener("click", handleClickToRefresh);

  return $logo;
};

const Header = () => {
  const $header = document.createElement("header");
  const $h1 = document.createElement("h1");
  const $logo = Logo();
  $h1.appendChild($logo);
  $header.appendChild($h1);
  $header.appendChild(SearchBox());

  return $header;
};
export default Header;
