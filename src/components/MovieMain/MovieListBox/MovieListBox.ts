import { Movie } from "./MovieList/MovieItem";
import MovieList from "./MovieList/MovieList";
import MovieMoreButton from "./MovieList/MovieMoreButton";
import createElement from "../../utils/createElement";

interface MovieListBoxProps {
  title: string;
  onMovieMoreButtonClick: () => void;
  onMovieItemClick: (id: number) => void;
}

class MovieListBox {
  private $element: HTMLElement;

  private movieList: MovieList;
  private movieMoreButton: MovieMoreButton | null;

  private intersectionObserver: IntersectionObserver;
  private isIntersecting = false;

  constructor({
    title,
    onMovieMoreButtonClick,
    onMovieItemClick,
  }: MovieListBoxProps) {
    const $h2 = createElement({
      tagName: "h2",
      children: [title],
    });

    this.movieList = new MovieList({ onMovieItemClick });

    this.movieMoreButton = new MovieMoreButton({
      onClickHandler: () => {
        this.movieList.removeMessage();
        this.showMoreMovies();
        onMovieMoreButtonClick();
      },
    });

    this.$element = this.generateMovieListBox({
      children: [
        $h2,
        this.movieList.getElement(),
        this.movieMoreButton.getElement(),
      ],
    });

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.setIsIntersecting(entries[0].isIntersecting);
    });
    this.movieMoreButton.registerToIntersectionObserver(
      this.intersectionObserver
    );
  }

  getElement() {
    return this.$element;
  }

  renderMessage(message: string) {
    this.movieList.renderMessage(message);
  }

  removeMovieMoreButton() {
    if (this.movieMoreButton) {
      this.movieMoreButton.unregisterToIntersectionObserver(
        this.intersectionObserver
      );
      this.movieMoreButton.removeElement();
    }
    this.movieMoreButton = null;
  }

  reRender(movieList: Movie[]) {
    this.movieList.reRender(movieList);
    if (!this.movieMoreButton) {
      return;
    }
    this.movieMoreButton.enable();
    if (this.isIntersecting) {
      this.movieMoreButton.click();
    }
  }

  private showMoreMovies() {
    if (this.movieMoreButton) {
      this.movieMoreButton.disable();
    }
    this.movieList.appendSkeleton();
  }

  private setIsIntersecting(isIntersection: boolean) {
    this.isIntersecting = isIntersection;

    if (!this.movieMoreButton) {
      return;
    }
    if (this.isIntersecting) {
      this.movieMoreButton.click();
    }
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
