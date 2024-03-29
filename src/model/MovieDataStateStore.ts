import { Movie, MovieData } from "../type/movie";

class MovieDataStateStore {
  #fetchedMovieList: Movie[] | undefined;
  #totalMovieList: Movie[] | undefined;
  #isEndPage = true;

  getTotalMovieData(
    { movieList, isEndPage }: MovieData,
    resetMovieList: boolean,
  ) {
    if (!this.#totalMovieList || resetMovieList)
      this.#totalMovieList = movieList;
    else this.#totalMovieList = this.#totalMovieList.concat(movieList);

    this.#isEndPage = isEndPage;
  }

  addMovieData({ movieList, isEndPage }: MovieData, resetMovieList: boolean) {
    this.#fetchedMovieList = movieList;

    if (!this.#totalMovieList || resetMovieList) {
      this.#totalMovieList = movieList;
      return;
    }
    this.#totalMovieList = this.#totalMovieList.concat(movieList);
    this.#isEndPage = isEndPage;
  }

  get fetchedMovieData() {
    return {
      movieList: this.#fetchedMovieList,
      isEndPage: this.#isEndPage,
    };
  }

  get totalMovieData() {
    return {
      movieList: JSON.parse(JSON.stringify(this.#totalMovieList)) as Movie[],
      isEndPage: this.#isEndPage,
    };
  }
}

const movieDataStateStore = new MovieDataStateStore();

export default movieDataStateStore;
