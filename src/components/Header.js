import Gnb from "./Gnb";
import TopRatedContainer from "./TopRatedContainer";
import createElement from "./utils/createElement";
import { proxiedImageUrl } from "../fetch/utils/imageProxy";

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
    attributes: {
      "aria-hidden": "true",
    }
  });

  const $img = createElement({
    tag: "img",
    attributes: {
      src: `${proxiedImageUrl(posterPath)}`,
      alt: `${title}`,
    }
  });

  $header.appendChild(Gnb());
  $header.appendChild($backgroundContainer);
  $backgroundContainer.appendChild($overlay);
  $overlay.appendChild($img);
  $backgroundContainer.appendChild(TopRatedContainer({ popularMovie }));

  return $header;
};

export default Header;
