import TopRatedContainer from "./TopRatedContainer";
import createElement from "../utils/createElement";
import imageUrl from "../../utils/imageUrl";
import Gnb from "./Gnb";

const Header = ({ popularMovie }) => {
  const title = popularMovie?.title;
  const posterPath = popularMovie?.poster_path;

  const $header = createElement({
    tag: "header",
  });

  const $backgroundContainer = createElement({
    tag: "div",
    classNames: ["background-container"],
  });

  const $overlay = createElement({
    tag: "div",
    classNames: ["overlay"],
    "aria-hidden": "true",
  });

  const $img = createElement({
    tag: "img",
    src: imageUrl(posterPath),
    alt: title,
  });

  $header.appendChild(Gnb());
  $header.appendChild($backgroundContainer);
  $header.appendChild($overlay);
  $overlay.appendChild($img);
  $backgroundContainer.appendChild(TopRatedContainer({ popularMovie }));

  return $header;
};

export default Header;
