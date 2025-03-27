import SearchBar from "./SearchBar";
import createElement from "./utils/createElement";
import LogoImg from "../../images/logo.png";

const Gnb = () => {
  const $div = createElement({
    tag: "div",
    classNames: ["gnb"],
  });

  const $logo = createElement({
    tag: "h1",
    classNames: ["logo"],
  });

  const $logoImg = createElement({
    tag: "img",
    src: LogoImg,
    alt: "MovieList",
  });

  $div.appendChild($logo);
  $logo.appendChild($logoImg);
  $div.appendChild(SearchBar());

  return $div;
};

export default Gnb;
