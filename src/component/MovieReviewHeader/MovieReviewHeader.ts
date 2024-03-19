import { createElement } from "../../utility/dom";
import logoImg from "../../image/logo.png";

const MovieReviewHeader = {
  createHeader() {
    const h1 = createElement("h1");
    const img = createElement("img", {
      class: "",
      src: `${logoImg}`,
      alt: "MovieList 로고",
    });

    h1.appendChild(img);

    return h1;
  },
};

export default MovieReviewHeader;
