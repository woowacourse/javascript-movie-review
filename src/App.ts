import MovieCardList from "./components/MovieCardList";
import { TOGGLE_SKELETON, LIST_STATE, LIST_HEADING } from "./constant/setting";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #state: appState;
  #myRating: myRating;

  constructor() {
    this.#state = {
      page: 1,
      listState: LIST_STATE.POPULAR,
      movieList: [],
      movieName: "",
    };
    this.#myRating = [];
    this.init();
    this.setEvent();
  }

  async init() {
    this.setState({
      page: 1,
      listState: LIST_STATE.POPULAR,
    });
    await this.setMoviesList();
    this.render();
    this.mountMovieList();
  }

  render() {
    const itemView = $(".item-view");
    const { listState, movieList, movieName } = this.#state;

    if (itemView instanceof HTMLElement)
      itemView.innerHTML = `
    <card-list header='${LIST_HEADING(listState, movieName)}'></card-list>
    <more-button length='${movieList.length}'></more-button>
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

    document.addEventListener(
      "set-my-rating",
      this.setMyRating as EventListener
    );

    document.addEventListener(
      "send-my-rating",
      this.sendMyRating as EventListener
    );
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

    this.setState({
      page: 1,
      listState: LIST_STATE.SEARCHED,
      movieName,
    });
    this.renderSearchedMovies();
  };

  setMyRating = ({ detail }: CustomEvent) => {
    this.#myRating = this.#myRating.filter(
      ({ movieId }) => movieId !== detail.movieId
    );
    this.#myRating.push({ movieId: detail.movieId, score: detail.myRating });
  };

  sendMyRating = ({ detail }: CustomEvent) => {
    const targetObject = this.#myRating.find(
      ({ movieId }) => movieId === detail.movieId
    );
    const $modal = $("movie-modal");
    if (!targetObject) $modal?.setAttribute("my-rating", "0");
    if (targetObject) {
      console.log(targetObject);
      $modal?.setAttribute("my-rating", String(targetObject.score));
    }
  };

  async renderSearchedMovies() {
    this.render();
    this.toggleSkeletonList(TOGGLE_SKELETON.SHOW);
    await this.setMoviesList();
    this.toggleSkeletonList(TOGGLE_SKELETON.HIDDEN);
    this.mountMovieList();
  }

  getMovieListFromFetchedData(fetchedData: movieListResponse) {
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

  mountMovieList() {
    const { movieList } = this.#state;
    const $cardList = $("card-list");
    if ($cardList instanceof MovieCardList) $cardList.setMovieList(movieList);
  }

  toggleSkeletonList(method: toggleSkeleton) {
    const $cardList = $("card-list");
    if ($cardList instanceof MovieCardList)
      $cardList.toggleSkeletonList(method);
  }

  setMoreButtonState() {
    const { length } = this.#state.movieList;
    $("more-button")?.setAttribute("length", `${length}`);
  }

  setState(newState: Object) {
    this.#state = { ...this.#state, ...newState };
  }
}
