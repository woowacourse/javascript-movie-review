import MoreButton from "./components/MoreButton";
import MovieCardList from "./components/MovieCardList";
import { LIST_STATE } from "./constant/variables";
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

    await this.addPopularMoviesList();
  }

  setState(newState: Object) {
    this.#state = { ...this.#state, ...newState };
  }

  render() {
    const itemView = $(".item-view");
    if (itemView instanceof HTMLElement)
      itemView.innerHTML = `
    <card-list header='${
      this.#state.listState === LIST_STATE.POPULAR
        ? "지금 인기 있는 영화"
        : `"${this.#state.movieName}" 검색 결과`
    }'></card-list>
    <more-button></more-button>
    `;
  }

  setEvent() {
    document.addEventListener("click-more-button", () => {
      this.toggleSkeletonList(); //add skeleton list
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

  searchMovieCallback = ({ detail }: CustomEvent) => {
    const { movieName } = detail;
    this.setInitState();
    this.setState({
      listState: LIST_STATE.SEARCHED,
      movieName,
    });
    this.renderSearchedMovies();
  };

  async appendMovieList() {
    this.setState({ page: this.#state.page + 1 });
    if (this.#state.listState === LIST_STATE.POPULAR) {
      await this.addPopularMoviesList();
    }
    if (this.#state.listState === LIST_STATE.SEARCHED) {
      await this.addSearchedMoviesList();
    }
    this.toggleSkeletonList(); // remove skeleton list
    this.mountMovieList();
  }

  async addPopularMoviesList() {
    try {
      const fetchedData = await getPopularMovies(this.#state.page);
      const movieList = fetchedData.results.map((item: movieData) => {
        const { title, poster_path, vote_average, id } = item;
        return {
          title,
          poster: poster_path,
          rating: vote_average,
          movieId: id,
        };
      });
      this.setState({ movieList });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async addSearchedMoviesList() {
    const { movieName, page } = this.#state;
    const fetchedData = await getSearchedMovies(movieName, page);
    const movieList = fetchedData.results.map((item: movieData) => {
      const { title, poster_path, vote_average, id } = item;
      return {
        title,
        poster: poster_path,
        rating: vote_average,
        movieId: id,
      };
    });
    this.setState({ movieList });
  }

  async renderSearchedMovies() {
    this.render();
    this.toggleSkeletonList(); //add skeleton list
    this.hideMoreButton();
    await this.addSearchedMoviesList();
    this.toggleSkeletonList(); // remove skeleton list
    this.mountMovieList();
  }

  hideMoreButton() {
    const $moreButton = $("more-button");
    if ($moreButton instanceof MoreButton) $moreButton.classList.add("hidden");
  }

  mountMovieList() {
    const $cardList = $("card-list");
    if ($cardList instanceof MovieCardList)
      $cardList.setMovieList(this.#state.movieList);
  }

  toggleSkeletonList() {
    const $cardList = $("card-list");
    if ($cardList instanceof MovieCardList) $cardList.toggleSkeletonList();
  }
}
