import MovieSearchBox, { SearchType } from "./MovieSearchBox";

import LOGO from "../../../templates/logo.png";
import createElement from "../utils/createElement";
import generateHeader from "../common/generateHeader";

interface MovieHeaderProps {
  search: SearchType;
}

class MovieHeader {
  $element;

  constructor(props: MovieHeaderProps) {
    this.$element = this.generateMovieHeader(props.search);
  }

  private generateMovieHeader(search: SearchType) {
    const $logo = createElement({
      tagName: "img",
      attribute: { src: LOGO, alt: "MovieList 로고" },
    });
    const $h1 = createElement({
      tagName: "h1",
      children: [$logo],
    });
    const $searchBox = new MovieSearchBox({
      search,
    }).$element;

    return generateHeader({ children: [$h1, $searchBox] });
  }
}

export default MovieHeader;
