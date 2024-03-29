import Header from "../components/Header/Header";
import MovieList from "./MovieList";
import MoviePageReceiver from "../apis/MoviePageReceiver";

class MovieReviewMain {
  elements;
  #header;
  #movieListController = new MovieList("지금 인기있는 영화", async () => {
    return { movieInfos: [], isLastPage: false };
  });
  #moviePageReceiver = new MoviePageReceiver();

  constructor() {
    this.#header = this.#createHeader();
    this.elements = [this.#header.element, this.#movieListController.element];
    this.#header.goHome();
  }

  #createHeader() {
    const homeButtonClickAction = () => {
      const title = "지금 인기있는 영화";
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
}

export default MovieReviewMain;
