import MovieSearchBox, { SearchType } from "./MovieSearchBox";

import LOGO from "../../../templates/logo.png";
import createElement from "../utils/createElement";
import generateHeader from "../common/generateHeader";

interface MovieHeaderProps {
  searchBoxSubmitHandler: SearchType;
  logoClickHandler: () => void;
}

class MovieHeader {
  $element;

  constructor(props: MovieHeaderProps) {
    this.$element = this.generateMovieHeader(props);
  }

  private generateMovieHeader({
    logoClickHandler,
    searchBoxSubmitHandler,
  }: MovieHeaderProps) {
    const $logoImg = createElement({
      tagName: "img",
      attribute: { src: LOGO, alt: "MovieList 로고" },
    });

    const $logo = createElement({
      tagName: "h1",
      children: [$logoImg],
      eventListener: {
        click: () => {
          searchBox.clear();
          logoClickHandler();
        },
      },
    });

    const $shortSearchBox = this.generateShortSearchBox();

    const searchBox = new MovieSearchBox({
      searchBoxSubmitHandler,
    });

    return generateHeader({
      children: [$logo, searchBox.$element, $shortSearchBox],
    });
  }

  private generateShortSearchBox = () => {
    const $shortSearchButton = createElement({
      tagName: "button",
      attribute: { class: "short-search-button" },
      children: ["검색"],
    });

    const $shortSearchBox = createElement({
      tagName: "div",
      attribute: { class: "short-search-box" },
      children: [$shortSearchButton],
      eventListener: {
        click: this.switchShortSearchBox.bind(this),
      },
    });

    return $shortSearchBox;
  };

  private switchShortSearchBox(e: Event) {
    if (!(e.currentTarget instanceof HTMLElement)) {
      return;
    }
    e.currentTarget.classList.toggle("exit");

    const $logo = this.$element.firstChild?.firstChild as HTMLElement;
    const $searchBox = this.$element.firstChild?.nextSibling as HTMLElement;
    $logo.classList.toggle("hidden");
    $searchBox.classList.toggle("show");
  }
}

export default MovieHeader;
