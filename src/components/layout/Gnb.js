import SearchBar from "../search/SearchBar";
import createElement from "../utils/createElement";

const LOGO_IMG_SRC = "./images/logo.png";

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
    src: LOGO_IMG_SRC,
    alt: "MovieList",
  });

  $div.appendChild($logo);
  $logo.appendChild($logoImg);
  $div.appendChild(SearchBar());

  return $div;
};

export default Gnb;
