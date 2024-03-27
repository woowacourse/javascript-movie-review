import "./style.css";

import SearchBox from "../SearchBox/SearchBox";
import createElement from "../../utils/createElement";
import homeButton from "./homeButton.png";

class Header {
  element = createElement<HTMLHeadElement>("header");
  #homeButton;
  #searchBox;

  constructor(option?: {
    homeButtonClickAction?: (event?: Event) => void;
    searchBoxAction?: (string: string) => void;
  }) {
    const {
      homeButtonClickAction = () => {},
      searchBoxAction = (string: string) => {},
    } = option ?? {};
    this.#homeButton = this.#createHomeButton(homeButtonClickAction);

    this.#searchBox = new SearchBox({ searchFunc: searchBoxAction });

    this.element.append(this.#homeButton, this.#searchBox.element);
  }

  goHome() {
    this.#homeButton.click();
  }

  #createHomeButton(homeButtonClickAction: () => void) {
    const h1 = createElement<HTMLHeadingElement>("h1");

    const img = createElement("img", {
      attrs: { src: homeButton, alt: "MovieList 로고" },
    });
    h1.append(img);

    h1.addEventListener("click", homeButtonClickAction);
    h1.addEventListener("click", () => {
      this.#searchBox.reset();
    });

    return h1;
  }
}

export default Header;
