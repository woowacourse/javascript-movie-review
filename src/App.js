import { LIST_STATE } from "./constant/variables";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #state;

  constructor() {
    this.init();
    this.setEvent();
  }

  async init() {
    await this.setInitState();
    this.render();
    this.mountMovieList();
  }

  async setInitState() {
    this.#state = {
      page: 1,
      listState: LIST_STATE.POPULAR,
    };

    await this.addPopularMoviesList();
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
  }

  render() {
    const itemView = $(".item-view");
    itemView.innerHTML = `
    <card-list header='${
      this.#state.listState === LIST_STATE.POPULAR
        ? "지금 인기 있는 영화"
        : `"${this.#state.movieName}" 검색 결과`
    }'></card-list>
    <more-button></more-button>
    `;
  }

  async setEvent() {
    document.addEventListener("click-more-button", () => {
      this.toggleSkeletonList(); //add skeleton list
      this.appendMovieList();
    });

    document.addEventListener("search-movie", (event) => {
      const { movieName } = event.detail;
      this.setInitState();
      this.setState({
        listState: LIST_STATE.SEARCHED,
        movieName,
      });
      this.renderSearchedMovies();
    });

    document.addEventListener("click-home-button", () => {
      this.init();
    });
  }

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
    const fetchedData = await getPopularMovies(this.#state.page);
    const movieList = fetchedData.results.map((item) => {
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

  async addSearchedMoviesList() {
    const fetchedData = await getSearchedMovies(
      this.#state.movieName,
      this.#state.page
    );
    const movieList = fetchedData.results.map((item) => {
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
    $moreButton.classList.add("hidden");
  }

  mountMovieList() {
    document.querySelector("card-list")?.setMovieList(this.#state.movieList);
  }

  toggleSkeletonList() {
    document.querySelector("card-list").toggleSkeletonList();
  }
}
