import { Movie, MovieData } from "../type/movie";

class MovieDataStateStore {
  #fetchedMovieList: Movie[] | undefined;
  #totalMovieList: Movie[] | undefined;
  #isShowMorButton = true;

  getTotalMovieData(
    { movieList, isShowMoreButton }: MovieData,
    resetMovieList: boolean,
  ) {
    if (!this.#totalMovieList || resetMovieList)
      this.#totalMovieList = movieList;
    else this.#totalMovieList = this.#totalMovieList.concat(movieList);

    this.#isShowMorButton = isShowMoreButton;
  }

  addMovieData(movieList: Movie[], resetMovieList: boolean) {
    this.#fetchedMovieList = movieList;

    if (!this.#totalMovieList || resetMovieList) {
      this.#totalMovieList = movieList;
      return;
    }
    this.#totalMovieList = this.#totalMovieList.concat(movieList);
  }

  get fetchedMovieData() {
    return this.#fetchedMovieList;
  }

  get totalMovieData() {
    return {
      movieList: JSON.parse(JSON.stringify(this.#totalMovieList)) as Movie[],
      isShowMoreButton: this.#isShowMorButton,
    };
  }
}

const movieDataStateStore = new MovieDataStateStore();

export default movieDataStateStore;
