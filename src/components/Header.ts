import LogoImg from "../../templates/logo.png";
import { dataStateStore } from "../model";
import { handleGetPopularMovieData } from "../service/handleSkeletonAndAPI";
import { createElementWithAttribute } from "../utils";

import ItemView from "./ItemView";
import SearchBox from "./SearchBox";

const handleClickToRefresh = async () => {
  const $itemView = document.querySelector(".item-view");
  $itemView?.remove();
  const $searBox = document.querySelector("#search-input");
  if ($searBox instanceof HTMLInputElement) {
    $searBox.value = "";
  }
  await handleGetPopularMovieData(true);

  ItemView("지금 인기 있는 영화", dataStateStore.movieData, "popular");
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
