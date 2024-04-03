import "./style.css";

import createElement from "../../utils/createElement";
import SearchBox from "../SearchBox/SearchBox";
import logo from "./logo.png";
import DOMController from "../../DOMController";

class Header {
  headerElement: HTMLElement;

  constructor() {
    this.headerElement = createElement({ tagName: "header" });

    const h1 = createElement({ tagName: "h1" });
    h1.addEventListener("click", this.goHomePage);

    const logoImg = createElement({
      tagName: "img",
      attrs: {
        src: logo,
        alt: "MovieList 로고",
      },
    });
    h1.append(logoImg);

    const searchBox = new SearchBox("검색").element;
    const input = searchBox.querySelector("input");
    if (input) input.id = "header__search-box";

    this.headerElement.append(h1, searchBox);
  }

  private goHomePage() {
    const input = document.querySelector<HTMLInputElement>(
      "#header__search-box"
    );
    if (input) input.value = "";

    DOMController.renderPopularMoviePosterBoard();
  }

  get element() {
    return this.headerElement;
  }
}

export default Header;
