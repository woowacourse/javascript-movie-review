import LogoImg from "../../templates/logo.png";
import setAttributeToElement from "../utils/setAttributeToElement";

import SearchBox from "./SearchBox";

const Logo = () => {
  const logoImgAttribute = {
    src: LogoImg,
    alt: "MovieList 로고",
  };
  return setAttributeToElement(logoImgAttribute, document.createElement("img"));
};

const Header = () => {
  const $header = document.createElement("header");
  const $h1 = document.createElement("h1");
  const $logo = Logo() as HTMLImageElement;
  $h1.appendChild($logo);
  $header.appendChild($h1);
  $header.appendChild(SearchBox());

  return $header;
};
export default Header;
