import MovieSearchBox, { SearchType } from "./MovieSearchBox";

import BackArrowButton from "./BackArrowButton";
import MovieHomeLogo from "./MovieHomeLogo";
import MovieSearchButton from "./MovieSearchButton";
import generateHeader from "../common/generateHeader";

interface MovieHeaderProps {
  searchBoxSubmitHandler: SearchType;
  logoClickHandler: () => void;
}

class MovieHeader {
  private $element;

  private props;

  private homeLogo: MovieHomeLogo;
  private searchBox: MovieSearchBox;
  private searchBoxCreator: MovieSearchButton;
  private backArrowButton: BackArrowButton;

  constructor(props: MovieHeaderProps) {
    this.props = props;

    this.homeLogo = new MovieHomeLogo({
      onClick: this.onHomeLogoClick.bind(this),
    });

    this.searchBox = new MovieSearchBox({
      searchBoxSubmitHandler: this.props.searchBoxSubmitHandler,
    });

    this.searchBoxCreator = new MovieSearchButton({
      onClick: this.onSearchBoxCreatorClick.bind(this),
    });

    this.backArrowButton = new BackArrowButton({
      onClick: this.onBackArrowButtonClick.bind(this),
    });

    this.$element = generateHeader({
      children: [
        this.homeLogo.getElement(),
        this.searchBoxCreator.getElement(),
        this.backArrowButton.getElement(),
        this.searchBox.getElement(),
      ],
    });
  }

  getElement() {
    return this.$element;
  }

  private onSearchBoxCreatorClick() {
    this.homeLogo.makeInvisible();
    this.searchBoxCreator.makeInvisible();

    this.searchBox.makeVisible();
    this.backArrowButton.makeVisible();
  }

  private onBackArrowButtonClick() {
    this.homeLogo.makeVisible();
    this.searchBoxCreator.makeVisible();

    this.searchBox.makeInvisible();
    this.backArrowButton.makeInvisible();
  }

  private onHomeLogoClick() {
    this.searchBox.clear();
    this.props.logoClickHandler();
  }
}

export default MovieHeader;
