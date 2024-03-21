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
    const $logo = createElement({
      tagName: "img",
      attribute: { src: LOGO, alt: "MovieList 로고" },
    });
    const $h1 = createElement({
      tagName: "h1",
      children: [$logo],
      addEventListener: { click: logoClickHandler },
    });
    const $searchBox = new MovieSearchBox({
      searchBoxSubmitHandler,
    }).$element;

    return generateHeader({ children: [$h1, $searchBox] });
  }
}

export default MovieHeader;
