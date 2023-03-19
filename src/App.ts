import MoreButton from "./components/MoreButton";
import MovieCardList from "./components/MovieCardList";
import { TOGGLE_SKELETON, LIST_STATE } from "./constant/setting";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #state: appState;

  constructor() {
    this.#state = {
      page: 1,
      listState: LIST_STATE.POPULAR,
      movieList: [],
      movieName: "",
    };
    this.init();
    this.setEvent();
  }

  async init() {
    await this.setInitState();
    this.render();
    this.mountMovieList();
  }

  async setInitState() {
    this.setState({
      page: 1,
      listState: LIST_STATE.POPULAR,
    });

    await this.setMoviesList();
  }

  setState(newState: Object) {
    this.#state = { ...this.#state, ...newState };
  }

  render() {
    const itemView = $(".item-view");
    const { movieList } = this.#state;
    if (itemView instanceof HTMLElement)
      itemView.innerHTML = `
    <card-list header='${
      this.#state.listState === LIST_STATE.POPULAR
        ? "지금 인기 있는 영화"
        : `"${this.#state.movieName}" 검색 결과`
    }'></card-list>
    <more-button length='${movieList.length}'>
    </more-button>
    `;
  }

  setEvent() {
    document.addEventListener("click-more-button", () => {
      this.toggleSkeletonList(TOGGLE_SKELETON.SHOW);
      this.appendMovieList();
    });

    document.addEventListener(
      "search-movie",
      this.searchMovieCallback as EventListener
    );

    document.addEventListener("click-home-button", () => {
      this.init();
    });
  }

  async appendMovieList() {
    const { page } = this.#state;

    this.setState({ page: page + 1 });
    await this.setMoviesList();
    this.setMoreButtonState();
    this.toggleSkeletonList(TOGGLE_SKELETON.HIDDEN);
    this.mountMovieList();
  }

  async setMoviesList() {
    try {
      const { listState, page, movieName } = this.#state;
      const fetchedData =
        listState === LIST_STATE.POPULAR
          ? await getPopularMovies(page)
          : await getSearchedMovies(movieName, page);
      const movieList = this.getMovieListFromFetchedData(fetchedData);
      this.setState({ movieList });
    } catch (error) {
      alert(error);
    }
  }

  searchMovieCallback = ({ detail }: CustomEvent) => {
    const { movieName } = detail;

    this.setInitState();
    this.setState({
      listState: LIST_STATE.SEARCHED,
      movieName,
    });
    this.renderSearchedMovies();
  };

  getMovieListFromFetchedData(fetchedData: parsedJson) {
    return fetchedData.results.map((item: movieData) => {
      const { title, poster_path, vote_average, id } = item;
      return {
        title,
        poster: poster_path,
        rating: vote_average,
        movieId: id,
      };
    });
  }

  async renderSearchedMovies() {
    this.render();
    this.toggleSkeletonList(TOGGLE_SKELETON.SHOW);
    await this.setMoviesList();
    this.toggleSkeletonList(TOGGLE_SKELETON.HIDDEN);
    this.mountMovieList();
  }

  mountMovieList() {
    const $cardList = $("card-list");
    if ($cardList instanceof MovieCardList)
      $cardList.setMovieList(this.#state.movieList);
  }

  toggleSkeletonList(method: toggleSkeleton) {
    const $cardList = $("card-list");
    if ($cardList instanceof MovieCardList)
      $cardList.toggleSkeletonList(method);
  }

  setMoreButtonState() {
    const $moreButton = $("more-button");
    if ($moreButton instanceof MoreButton) {
      $moreButton.setAttribute("length", `${this.#state.movieList.length}`);
    }
  }
}
