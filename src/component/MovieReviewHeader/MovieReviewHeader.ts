import { createElement } from "../../utility/dom";
import logoImg from "../../image/logo.png";

const MovieReviewHeader = {
  createHeader() {
    const logoWrapper = createElement("h1");
    const img = createElement("img", {
      class: "",
      src: `${logoImg}`,
      alt: "MovieList 로고",
    });

    logoWrapper.appendChild(img);

    return logoWrapper;
  },

  
};

export default MovieReviewHeader;
