import { Movie } from "./MovieList/MovieItem";
import MovieList from "./MovieList/MovieList";
import MovieMoreButton from "./MovieList/MovieMoreButton";
import createElement from "../../utils/createElement";

class MovieListBox {
  $element;
  movieList;
  button;
  isIntersecting = false;

  constructor({
    title,
    onMovieMoreButtonClick,
  }: {
    title: string;
    onMovieMoreButtonClick: () => void;
  }) {
    const $h2 = createElement({
      tagName: "h2",
      children: [title],
    });

    this.movieList = new MovieList();
    this.button = new MovieMoreButton({
      onClickHandler: () => {
        console.log("clicked!");
        console.log("");
        this.movieList.removeMessage();
        this.showMoreMovies();
        onMovieMoreButtonClick();
      },
    });

    this.$element = this.generateMovieListBox({
      children: [$h2, this.movieList.$element, this.button.$element],
    });

    this.registerObserver();
  }

  private setIsIntersecting(isIntersection: boolean) {
    console.log("###setIsIntersecting####");
    this.isIntersecting = isIntersection;
    this.clickButtonAccordingToCondition();
  }

  private registerObserver() {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.setIsIntersecting(true);
      } else {
        this.setIsIntersecting(false);
      }
    });

    intersectionObserver.observe(this.button.$element);
  }

  reRender(movieList: Movie[]) {
    console.log("###reRender####");
    this.movieList.reRender(movieList);
    this.button.toggleDisabled();
    this.clickButtonAccordingToCondition();
  }

  renderMessage(message: string) {
    this.movieList.renderMessage(message);
  }

  showMoreMovies() {
    this.button.toggleDisabled();
    this.movieList.appendSkeleton();
  }

  removeMovieMoreButton() {
    this.button.removeMovieMoreButton();
  }

  private clickButtonAccordingToCondition() {
    console.log("this.isIntersecting:", this.isIntersecting);
    console.log("!this.button.disabled:", !this.button.disabled);
    if (!this.isIntersecting) {
      return;
    }
    if (this.button.disabled) {
      return;
    }
    this.button.$element.click();
  }

  private generateMovieListBox({ children }: { children: HTMLElement[] }) {
    const $section = createElement({
      tagName: "section",
      attribute: { class: "item-view" },
      children,
    });

    return $section;
  }
}

export default MovieListBox;
