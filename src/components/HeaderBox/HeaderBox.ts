import $SearchForm from "../SearchForm/SearchForm";
import { LOGO_PATH } from "../../constants/imagePaths";

const $HeaderBox = () => {
  const $headerBox = createElement("div", {
    className: "header-box",
  });
  const $logoLink = createElement("a", { href: "/javascript-movie-review" });
  const $logoImage = createElement("img", {
    src: LOGO_PATH.LOGO,
    alt: "MovieList",
  });
  $logoLink.appendChild($logoImage);

  $headerBox.append($logoLink, $SearchForm());
  return $headerBox;
};

export default $HeaderBox;
