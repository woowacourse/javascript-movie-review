import LogoImg from "../../templates/logo.png";
import createElementWithAttribute from "../utils/createElementWithAttribute";

import SearchBox from "./SearchBox";

const Logo = () => {
  const logoImgAttribute = {
    src: LogoImg,
    alt: "MovieList 로고",
  };
  return createElementWithAttribute("img", logoImgAttribute);
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
