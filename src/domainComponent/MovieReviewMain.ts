import Header from "../components/Header/Header";
import MovieDetailModal from "./MovieDetailModal";
import MovieList from "./MovieList";
import MoviePageReceiver from "../apis/MoviePageReceiver";
import { NOW_POPULAR_MOVIE } from "./constants";

class MovieReviewMain {
  elements: HTMLElement[];
  #header;
  #movieListController = new MovieList(
    NOW_POPULAR_MOVIE,
    async () => {
      return { movieInfos: [], isLastPage: false };
    },
    this.#itemClickEvent.bind(this)
  );
  #moviePageReceiver = new MoviePageReceiver();
  #modal = new MovieDetailModal();

  constructor() {
    this.#header = this.#createHeader();
    this.elements = [
      this.#header.element,
      this.#movieListController.element,
      this.#modal.element,
    ];

    this.#header.goHome();
  }

  #createHeader() {
    const homeButtonClickAction = () => {
      const title = NOW_POPULAR_MOVIE;
      const fetchFunc = this.#moviePageReceiver.getFetchPopularMoviePage();

      this.#movieListController.init({ title, fetchFunc });
    };
    const searchBoxAction = (string: string) => {
      const title = `"${string}" 검색결과`;
      const fetchFunc = this.#moviePageReceiver.getFetchSearchMoviePage(string);
      this.#movieListController.init({ title, fetchFunc });
    };
    const header = new Header({
      homeButtonClickAction: homeButtonClickAction.bind(this),
      searchBoxAction: searchBoxAction.bind(this),
    });

    return header;
  }

  #itemClickEvent(id: string) {
    this.#modal.open();
    this.#modal.setMovieDetail(id);
  }
}

export default MovieReviewMain;
