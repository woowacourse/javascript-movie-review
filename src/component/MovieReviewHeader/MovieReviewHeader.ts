import { createElement } from "../../utility/dom";
import logoImg from "../../image/logo.png";

const MovieReviewHeader = {
  createHeader() {
    const headerElement = createElement("h1");
    const linkElement = createElement("a", {
      href: "/",
    });
    const logoElement = createElement("img", {
      src: `${logoImg}`,
      alt: "MovieList 로고",
    });

    headerElement.appendChild(linkElement);
    linkElement.appendChild(logoElement);

    return headerElement;
  },
};

export default MovieReviewHeader;
