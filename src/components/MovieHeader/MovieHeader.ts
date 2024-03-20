import LOGO from "../../templates/logo.png";
import MovieSearchBox from "./MovieSearchBox";
import createElement from "../utils/createElement";
import generateHeader from "../common/generateHeader";

class MovieHeader {
  $element;

  constructor({
    onSearchButtonClick,
  }: {
    onSearchButtonClick: (query: string) => void;
  }) {
    this.$element = this.generateMovieHeader({ onSearchButtonClick });
  }

  private generateMovieHeader({
    onSearchButtonClick,
  }: {
    onSearchButtonClick: (query: string) => void;
  }) {
    const $logo = createElement({
      tagName: "img",
      attribute: { src: LOGO, alt: "MovieList 로고" },
    });
    const $h1 = createElement({
      tagName: "h1",
      children: [$logo],
    });
    const $searchBox = new MovieSearchBox({
      search: onSearchButtonClick,
    }).$element;

    return generateHeader({ children: [$h1, $searchBox] });
  }
}

export default MovieHeader;
