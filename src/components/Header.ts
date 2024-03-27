import LogoImg from "../../templates/logo.png";
import { LOGO_IMG_ALT, TITLE_TEXT } from "../constants/system";
import movieDataStateStore from "../model/MovieDataStateStore";
import { handleGetPopularMovieData } from "../service/handleSkeletonAndAPI";
import { createElementWithAttribute } from "../utils";

import ItemView from "./ItemView";
import { SearchBox, SearchBoxMobile } from "./SearchBox";

const handleClickToRefresh = async () => {
  const $itemView = document.querySelector(".item-view");
  $itemView?.remove();
  const $searchBox = document.querySelector("#search-input");
  if ($searchBox instanceof HTMLInputElement) {
    $searchBox.value = "";
  }
  await handleGetPopularMovieData(true);

  ItemView(TITLE_TEXT.POPULAR, movieDataStateStore.movieData, "popular");
};

const Logo = () => {
  const logoImgAttribute = {
    src: LogoImg,
    alt: LOGO_IMG_ALT,
  };
  const $logo = createElementWithAttribute("img", logoImgAttribute);

  $logo.addEventListener("click", handleClickToRefresh);

  return $logo;
};

const Header = () => {
  const $header = document.createElement("header");
  const $h1 = createElementWithAttribute("h1", { class: "logo" });
  const $logo = Logo();

  $h1.appendChild($logo);
  $header.appendChild($h1);
  $header.appendChild(SearchBox());
  $header.appendChild(SearchBoxMobile());

  return $header;
};
export default Header;
