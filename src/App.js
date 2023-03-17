import { LIST_STATE } from "./constant/variables";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #state = {
    movieList: [],
    page: 1,
    listState: LIST_STATE.POPULAR,
    movieName: "",
  };

  constructor() {
    this.initRender();
    this.setEvent();
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
  }

  async initRender() {
    this.setState({
      movieList: [],
      page: 1,
      listState: LIST_STATE.POPULAR,
      movieName: "",
    });
    await this.addPopularMoviesList();
    this.render();
    this.mountMovieList();
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
      this.toggleSkeletonList();
      this.appendMovieList();
    });

    document.addEventListener("search-movie", (event) => {
      const movieName = event.detail;

      this.setState({
        movieList: [],
        page: 1,
        listState: LIST_STATE.SEARCHED,
        movieName: movieName,
      });
      this.renderSearchedMovies();
    });

    document.addEventListener("click-home-button", () => {
      this.initRender();
    });
  }

  async appendMovieList() {
    this.setState({ movieList: [], page: this.#state.page + 1 });
    if (this.#state.listState === LIST_STATE.POPULAR) {
      await this.addPopularMoviesList();
    }
    if (this.#state.listState === LIST_STATE.SEARCHED) {
      await this.addSearchedMoviesList();
    }
    this.toggleSkeletonList();
    this.mountMovieList();
  }

  async addPopularMoviesList() {
    const fetchedData = await getPopularMovies(this.#state.page);
    const newMovieList = fetchedData.results.map((item) => {
      return {
        title: item.title,
        poster: item.poster_path,
        rating: item.vote_average,
      };
    });
    this.setState({ movieList: newMovieList });
  }

  async addSearchedMoviesList() {
    const fetchedData = await getSearchedMovies(
      this.#state.movieName,
      this.#state.page
    );
    const newMovieList = fetchedData.results.map((item) => {
      return {
        title: item.title,
        poster: item.poster_path,
        rating: item.vote_average,
      };
    });
    this.setState({ movieList: newMovieList });
  }

  async renderSearchedMovies() {
    this.render();
    this.toggleSkeletonList();
    await this.addSearchedMoviesList();
    this.toggleSkeletonList();
    this.mountMovieList();
  }

  mountMovieList() {
    document.querySelector("card-list")?.setMovieList(this.#state.movieList);
  }

  toggleSkeletonList() {
    document.querySelector("card-list").toggleSkeletonList();
  }
}
