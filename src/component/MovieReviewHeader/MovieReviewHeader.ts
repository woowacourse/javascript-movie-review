import { createElement } from "../../utility/dom";
import logoImg from "../../image/logo.png";

const MovieReviewHeader = {
  createHeader() {
    const logoWrapper = createElement("h1");
    const img = createElement("img", {
      class: "",
      src: logoImg,
      alt: "MovieList 로고",
    });

    logoWrapper.appendChild(img);
    this.setLogoClickHandler(logoWrapper);

    return logoWrapper;
  },

  setLogoClickHandler(targetElement: HTMLElement) {
    targetElement.addEventListener("click", () => {
      location.reload();
    });
  },
};

export default MovieReviewHeader;
